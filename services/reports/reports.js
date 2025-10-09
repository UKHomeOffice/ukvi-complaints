'use strict';

const fs = require('fs');
const path = require('path');
const { model: Model } = require('hof');
const config = require('../../config');
const _ = require('lodash');
const utilities = require('../../lib/utils');
const NotifyClient = utilities.NotifyClient;
const notifyKey = config.email.notifyApiKey;
const csvReportTemplateId = config.email.csvReportTemplateId;
const csvReportEmail = config.email.csvReportEmail;
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;
const logger = createLogger({
  format: combine(timestamp(), json()),
  transports: [new transports.Console({ level: 'info', handleExceptions: true })]
});
const { protocol, host, port } = config.saveService;
const baseUrl = `${protocol}://${host}:${port}`;

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
      const translations = this.#collectFieldsAndTranslations();
      const questionsTranslations = translations[0].pagesAndTranslations.map(obj => {
        return `${obj.translation}`.replaceAll(',', '-');
        // return `${obj.translation}: {${obj.field}}`.replaceAll(',', '-');
      });
      const questionsFields = translations[0].pagesAndTranslations.map(obj => obj.field);
      const filePath = path.join(__dirname, `/../../data/${name}.csv`);

      await this.#deleteFile(filePath, reject);

      const writeStream = fs.createWriteStream(filePath, { flag: 'a+', encoding: 'utf8' });
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
            'called-date',
            'called-time',
            'when-applied'
          ];

          if (dobKeys.includes(key)) {
            session[key] = `'${session[key]}'`;
          }

          // Set fields that contains the values of uploaded files
          if (key === 'upload-complaint-doc') {
            documents = documents.concat(_.flatten(_.map(session[key], obj => `${obj.name} - ${obj.url}`)));
            session[key] = documents;
          }

          session.submission_reference = record.submission_reference;
          session.created_at = record.created_at;
          session.updated_at = record.updated_at;
          session.submitted_at = record.submitted_at;
        });

        const fieldStr = questionsFields.map(field => {
          const sessionValue = session[field];
          const translationEntry = translations[0].fieldsAndTranslations.find(item => item.field === sessionValue);
          const translatedValue = translationEntry ? translationEntry.translation : sessionValue;
          const finalValue = translatedValue || '';

          return (Array.isArray(finalValue) ? finalValue.join(' | ') : finalValue).replaceAll(',', '-');
        }).join(',');
        const normalizedFieldStr = fieldStr
          .replace(/[’‘]/g, "'")
          .replace(/[\n\r\t]/g, ' ');
        await writeStream.write('\r\n' + normalizedFieldStr);
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
          return notifyClient.sendEmail(csvReportTemplateId, csvReportEmail, {
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

  #collectFieldsAndTranslations() {
    const journeys = ['ukvi-complaints'];

    return _.flatten(_.map(journeys, journey => {
      const fieldsTranslations = require(`../../apps/${journey}/translations/src/en/fields`);
      const pagesTranslations = require(`../../apps/${journey}/translations/src/en/pages`);
      const pagesAndTranslations = [];

      const omitKeys = [
        'agent-name',
        'agent-representative-name',
        'agent-representative-dob',
        'agent-phone',
        'applicant-name',
        'applicant-dob',
        'agent-email',
        'applicant-email',
        'gwf-reference',
        'none'
      ];

      const csvHeaderTranslations = Object.entries(pagesTranslations.confirm.fields)
        .filter(([key]) => !omitKeys.includes(key))
        .map(([key, value]) => ({
          field: key,
          translation: value.label.trim() || key
        }));

      if (csvHeaderTranslations.length > 0) {
        pagesAndTranslations.push(
          {
            field: 'submission_reference',
            translation: 'Submission Reference'
          },
          ...csvHeaderTranslations
        );
      }

      // This has to revisit
      const fieldsAndTranslations = Object.entries(fieldsTranslations)
        .flatMap(([, content]) =>
          content.options && typeof content.options === 'object'
            ? Object.entries(content.options)
              .filter(([key]) => !omitKeys.includes(key))
              .map(([key, value]) => ({
                field: key,
                translation: value.label.trim() || key
              }))
            : []
        );

      // add database timestamp fields
      pagesAndTranslations.push({
        field: 'created_at',
        translation: 'Created at'
      }, {
        field: 'updated_at',
        translation: 'Updated at'
      }, {
        field: 'submitted_at',
        translation: 'Submitted at'
      });
      return {pagesAndTranslations, fieldsAndTranslations};
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
