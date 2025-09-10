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
            message: `Lamp CSV generated for ${this.type}, UUID is: ${fileUUID}`
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
            message: `Email sent to Lamp CSV users successfully for ${this.type}`
          });
          await this.#deleteFile(filePath, reject);
          return resolve();
        }).catch(error => {
          logger.log({
            level: 'info',
            message: `Error generated for Lamp for ${this.type} CSV: ${error}`
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

  #collectFieldsAndTranslations() {
    const journeys = ['lamp'];

    return _.flatten(_.map(journeys, journey => {
      const fieldsObject = require(`../../apps/${journey}/fields`);
      // To create separate columns in csv for each other given name and other family name entry
      // objects for those fields should be inserted into the main fields object
      const otherGivenAndFamilyNames = {
        'other-given-names-1': {},
        'other-family-name-1': {},
        'other-given-names-2': {},
        'other-family-name-2': {},
        'other-given-names-3': {},
        'other-family-name-3': {},
        'other-given-names-4': {},
        'other-family-name-4': {},
        'other-given-names-5': {},
        'other-family-name-5': {},
        'other-given-names-6': {},
        'other-family-name-6': {},
        'other-given-names-7': {},
        'other-family-name-7': {},
        'other-given-names-8': {},
        'other-family-name-8': {},
        'other-given-names-9': {},
        'other-family-name-9': {},
        'other-given-names-10': {},
        'other-family-name-10': {}
      };

      const insertAfterKey = 'other-family-name';
      const fieldsArray = Object.entries(fieldsObject);
      const index = fieldsArray.findIndex(([key]) => key === insertAfterKey);
      const newFieldEntries = Object.entries(otherGivenAndFamilyNames);
      fieldsArray.splice(index + 1, 0, ...newFieldEntries);

      const fields = Object.fromEntries(fieldsArray);
      const fieldsTranslations = require(`../../apps/${journey}/translations/src/en/fields`);
      const pagesTranslations = require(`../../apps/${journey}/translations/src/en/pages`);
      const fieldsAndTranslations = [];

      Object.keys(fields).forEach(key => {
        // File-upload field is empty and confirm-email and initial other names fields not needed so do not push
        const omitKeys = [
          'confirm-email',
          'other-given-names',
          'other-family-name',
          'file-upload'
        ];

        if (!omitKeys.includes(key)) {
          fieldsAndTranslations.push({
            field: key,
            translation: (_.get(pagesTranslations, `[${key}].header`) ||
              _.get(fieldsTranslations, `[${key}].label`) ||
              _.get(fieldsTranslations, `[${key}].legend`, key)).trim() || key
          });
        }
      });
      // add database timestamp fields
      fieldsAndTranslations.push({
        field: 'created_at',
        translation: 'Created at'
      }, {
        field: 'updated_at',
        translation: 'Updated at'
      }, {
        field: 'submitted_at',
        translation: 'Submitted at'
      });
      return fieldsAndTranslations;
    }));
  }

  async #deleteFile(file, callback) {
    await fs.unlink(file, err => {
      if (err && err.code !== 'ENOENT') {
        callback(err);
      }
    });
  }
};