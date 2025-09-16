'use strict';

const fs = require('fs');
const path = require('path');
const { model: Model } = require('hof');
const config = require('../../config');
const _ = require('lodash');
const utilities = require('../../lib/utilities');
const NotifyClient = utilities.NotifyClient;
const notifyKey = config.govukNotify.notifyApiKey;
const csvReportTemplateId = config.govukNotify.csvReportTemplateId;
const caseworkerEmail = config.govukNotify.caseworkerEmail;
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;
const logger = createLogger({
  format: combine(timestamp(), json()),
  transports: [new transports.Console({ level: 'info', handleExceptions: true })]
});

const baseUrl = `${config.saveService.host}:${config.saveService.port}`;

const notifyClient = new NotifyClient(notifyKey);

module.exports = class Reports {
  constructor(opts) {
    if (!opts.tableName || !opts.from || !opts.type) {
      throw new Error('Please include a "tableName", "type" and "from" property');
    }
    this.type = opts.type;
    this.tableName = opts.tableName;
    this.tableUrl = `${baseUrl}/${opts.tableName}`;
    this.from = opts.from;
    this.to = opts.to || utilities.postgresDateFormat();
  }

  async auth() {
    const requiredProperties = ['token', 'username', 'password', 'clientId', 'secret'];
    for (const property of requiredProperties) {
      if (!config.keycloak[property]) {
        const errorMsg = `Keycloak ${property} is not defined`;
        logger.error(errorMsg);
        throw new Error(errorMsg);
      }
    }
    const tokenReq = {
      url: config.keycloak.token,
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        username: config.keycloak.username,
        password: config.keycloak.password,
        grant_type: 'password',
        client_id: config.keycloak.clientId,
        client_secret: config.keycloak.secret
      }
    };
    const model = new Model();
    const response = await model._request(tokenReq);
    return { bearer: response.data.access_token };
  }

  async getRecordsWithProps(opts) {
    const props = opts || {};
    let url = `${this.tableUrl}/history`;

    props.from = this.from;
    props.to = this.to;

    url = this.#addQueries(url, props);

    const model = new Model();
    const params = {
      url: url,
      method: 'GET'
    };

    return await model._request(params);
  }

  transformToCsv(name, headings, rows) {
    return new Promise(async (resolve, reject) => {
      const filePath = path.join(__dirname, `/../../data/${name}.csv`);
      await this.#deleteFile(filePath, reject);

      const writeStream = fs.createWriteStream(filePath, { flag: 'a+' });
      // there are commas in questions so using ; as an alternative CSV file delimiter
      await writeStream.write(headings.join(','));

      rows.forEach(async record => {
        await writeStream.write('\r\n' + record.join(','));
      });

      writeStream.on('error', reject);
      writeStream.end(resolve);
    });
  }

  transformToAllQuestionsCsv(name, data) {
    return new Promise(async (resolve, reject) => {
      const fieldsAndTranslations = this.#collectFieldsAndTranslations();
      const questionsTranslations = fieldsAndTranslations.map(obj => {
        return `${obj.translation}: {${obj.field}}`.replaceAll(',', '-');
      });
      const questionsFields = fieldsAndTranslations.map(obj => obj.field);
      const filePath = path.join(__dirname, `/../../data/${name}.csv`);

      await this.#deleteFile(filePath, reject);

      const writeStream = fs.createWriteStream(filePath, { flag: 'a+' });
      // there are commas in questions so using ; as an alternative CSV file delimiter
      await writeStream.write(questionsTranslations.join(','));

      data.forEach(async record => {
        let session;

        try {
          session = JSON.parse(record.session);
        } catch (e) {
          session = record.session;
        }
        let agg = [];
        let photo = [];
        let documents = [];

        Object.keys(session).forEach(function (key) {
          if (_.get(session[key], 'aggregatedValues')) {
            agg = agg.concat(_.flatten(_.map(session[key].aggregatedValues, obj => obj.fields)));
            // Initialise counter to track the number of each field
            const fieldCounter = {};

            // Iterate through each field and store with incremented key in session
            agg.forEach(fieldObj => {
              const baseField = fieldObj.field;

              // Initialise or increment the counter
              if (!fieldCounter[baseField]) {
                fieldCounter[baseField] = 1;
              } else {
                fieldCounter[baseField]++;
              }

              // Set a new field name with a numeric suffix
              const aggregatedFieldName = `${baseField}-${fieldCounter[baseField]}`;

              // Set the value in the session
              session[aggregatedFieldName] = fieldObj.value;
            });
          }

          // prevent csv readers from converting the date format by wrapping it in ''
          const dobKeys = [
            'date-of-birth',
            'passport-travel-document-issue-date',
            'passport-travel-document-expiry-date',
            'ni-issue-date', 'ni-expiry-date'
          ];
          if (dobKeys.includes(key)) {
            session[key] = `'${session[key]}'`;
          }

          // Set fields that contains the values of uploaded files
          if (key === 'photo-id') {
            photo = photo.concat(_.flatten(_.map(session[key], obj => `${obj.name} - ${obj.url}`)));
            session[key] = photo;
          }

          if (key === 'id-documents') {
            documents = documents.concat(_.flatten(_.map(session[key], obj => `${obj.name} - ${obj.url}`)));
            session[key] = documents;
          }

          if (record.id) {
            session['unique-ref'] = record.id.toString();
          }
          session.created_at = record.created_at;
          session.updated_at = record.updated_at;
          session.submitted_at = record.submitted_at;
        });

        const fieldStr = questionsFields.map(field => {
          const sessionField = session[field] || '';
          return (Array.isArray(sessionField) ? sessionField.join(' | ') : sessionField).replaceAll(',', '-');
        }).join(',');
        await writeStream.write('\r\n' + fieldStr);
      });

      writeStream.on('error', reject);
      writeStream.end(resolve);
    });
  }

  sendReport(fileName) {
    const filePath = path.join(__dirname, `/../../data/${fileName}.csv`);

    return new Promise((resolve, reject) => {
      return fs.readFile(filePath, (err, csvFile) => {
        if (err) {
          return reject(err);
        }
        const startDate = new Date(this.from);
        const endDate = new Date(this.to);

        const form = new FormData();
        form.append('document', new Blob([csvFile], { type: 'text/csv' }), `${fileName}.csv`);

        return this.auth().then(async auth => {
          const model = new Model();
          const params = {
            url: config.upload.hostname,
            method: 'POST',
            data: form,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${auth.bearer}`
            }
          };
          return await model.request(params);
        }).then(response => {
          const fileUUID = response.url.split('/file/')[1].split('?')[0];
          logger.log({
            level: 'info',
            message: `UKVIC CSV generated for ${this.type}, UUID is: ${fileUUID}`
          });
          return notifyClient.sendEmail(csvReportTemplateId, caseworkerEmail, {
            personalisation: {
              report_type: this.type,
              start_day: utilities.formatDate(startDate),
              end_day: utilities.formatDate(endDate),
              start_date: utilities.formatDateTime(startDate),
              end_date: utilities.formatDateTime(endDate),
              link_to_file: response.url.replace('/file/', '/file/generate-link/').split('?')[0]
            }
          });
        }).then(async () => {
          logger.log({
            level: 'info',
            message: `Email sent to UKVIC CSV users successfully for ${this.type}`
          });
          await this.#deleteFile(filePath, reject);
          return resolve();
        }).catch(error => {
          logger.log({
            level: 'info',
            message: `Error generated for UKVIC for ${this.type} CSV: ${error}`
          });
        });
      });
    });
  }

  #addQueries(domain, opts) {
    let url = `${domain}?`;

    Object.keys(opts).forEach(function (key) {
      url += `${key}=${opts[key]}&`;
    });

    return url;
  }

  #collectFieldsAndTranslations(complaintCategory) {
    const referenceFields = [
      { field: 'unique-ref', translation: 'Unique Reference' },
      { field: 'created_at', translation: 'Created at' },
      { field: 'updated_at', translation: 'Updated at' },
      { field: 'submitted_at', translation: 'Submitted at' }
    ];

    const categoryFields = {
      'Submitting an application': [
        { field: 'application-problem', translation: 'What was the problem with the application process?' },
        { field: 'application-location', translation: 'Where did you make your application?' },
        { field: 'reference-numbers', translation: 'Which reference numbers do you have?' },
        { field: 'on-behalf', translation: 'Are you making this complaint on behalf of someone else?' },
        { field: 'relation-to-applicant', translation: 'What is your relation to the applicant?' },
        { field: 'applicant-nationality', translation: "What is the applicant's country nationality?" },
        { field: 'complainant-details', translation: 'What are the details of the complainant?' }
      ],
      'Making an appointment': [
        { field: 'appointment-problem', translation: 'What problem did you have making an appointment?' }
      ],
      'Waiting for a decision or documents': [
        { field: 'waiting-for', translation: 'What are you waiting for?' },
        { field: 'asked-documents-back', translation: 'Have you asked for the documents back?' }
      ],
      'A negative or positive decision': [
        { field: 'decision-type', translation: 'Was the decision negative or positive?' }
      ],
      'Biometric residence permits (BRPs)': [
        { field: 'brp-problem', translation: 'What is the problem with the BRP?' }
      ],
      'Refunds': [
        { field: 'refund-requested', translation: 'Have you requested a refund?' },
        { field: 'refund-request-date', translation: 'When did you request a refund?' },
        { field: 'refund-type', translation: 'What type of refund do you want to request?' }
      ],
      'Staff behaviour (e.g. rudeness, discrimination)': [
        { field: 'staff-behaviour-location', translation: 'Where did you experience poor behaviour?' },
        { field: 'incident-location', translation: 'Where did this incident take place?' },
        { field: 'visa-centre-location', translation: 'Where is this visa application centre?' },
        { field: 'uk-support-centre-location', translation: 'Where in UK is this service support centre?' },
        { field: 'uk-service-point-location', translation: 'Where in UK service point?' },
        { field: 'telephone-number-called', translation: 'What telephone number was called?' },
        { field: 'call-date', translation: 'When was the call made?' },
        { field: 'call-origin-number', translation: 'What number was the call made from?' }
      ],
      'An existing complaint': [
        { field: 'existing-complaint', translation: 'Do you have reference number for your complaint?' },
        { field: 'complaint-reference-number', translation: 'What is reference number for your complaint?' },
        { field: 'original-complaint-topic', translation: 'What was original complaint about?' }
      ],
      'Something else': []
    };

    return (categoryFields[complaintCategory] || []).concat(referenceFields);
  }

  async #deleteFile(file, callback) {
    await fs.unlink(file, err => {
      if (err && err.code !== 'ENOENT') {
        callback(err);
      }
    });
  }
};
