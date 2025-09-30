'use strict';
const { Producer } = require('sqs-producer');
const config = require('../config');
const decsSchema = require('./schema/decs');

class NotifyMock {
  sendEmail() {
    return Promise.resolve();
  }

  prepareUpload() { }
}

const validAgainstSchema = (data, validator) => {
  try {
    const valid = validator.validate(data, decsSchema);

    if (valid.errors.length > 0) {
      throw new Error(valid.errors);
    }

    return true;
  } catch (err) {
    throw new Error('Validation against schema failed', err);
  }
};


const sendToQueue = (data, id) => {
  try {
    const producer = Producer.create(config.awsSqs);

    return new Promise((resolve, reject) => {
      producer.send(
        [
          {
            id,
            body: JSON.stringify(data)
          }
        ])
        .then(response => {
          const log = {
            sqsResponse: response,
            complaintDetails: {
              sqsMessageId: response[0].MessageId,
              complaintId: id,
              data
            }
          };

          // eslint-disable-next-line no-console
          console.log('Successfully sent to SQS queue: ', log);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  } catch (err) {
    throw new Error('Failed to send to sqs queue', err);
  }
};

const parseDocumentList = documents => {
  return Array.isArray(documents) && documents.length
    ? '\n' + documents.map(doc => `[${doc.name}](${doc.url})`).join('\n')
    : '';
};

/**
 * Formats a date value using the specified date format from the config.
 *
 * @param {string|Date} inputDate - The date to format (as a string or Date object).
 * @returns {string} The formatted date string in the specified format.
 */
const formatDate = inputDate => {
  const date = new Date(inputDate);
  return date.toLocaleDateString('en-GB', config.dateFormat);
};

/**
 * Formats a date and time value into a string combining the formatted date and time.
 *
 * @param {string|Date} inputDate - The date to format (as a string or Date object).
 * @returns {string} The formatted date and time string (e.g. "DD/MM/YYYY HH:mm:ss").
 */
const formatDateTime = inputDate => {
  const date = new Date(inputDate);
  const formattedDate = formatDate(date);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  return `${formattedDate} ${formattedTime}`;
};

/**
 * Formats a given date into a PostgreSQL-compatible UTC timestamp string.
 *
 * The output format is: `YYYY-MM-DD HH:mm:ss`, using UTC time.
 *
 * @param {Date} [date=new Date()] - The date to format. Defaults to the current date and time if not provided.
 * @returns {string} A string representing the date in PostgreSQL timestamp format.
 */
const postgresDateFormat = date => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * Returns a Date object representing a given time on the hour (UTC) for the given date.
 *
 * @param {string} hour - The hour to use
 * @param {Date} [date=new Date()] - The date to use (defaults to the current date if not provided).
 * @returns {Date} A Date object set to <the given hour>:00:00.000 UTC on the specified date.
 * @throws {Error} If the hour is not provided.
 */
function getUTCTime(hour, date = new Date()) {
  if (!hour) {
    throw new Error('Invalid date object - an hour is required');
  }
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), hour, 0, 0, 0));
}

/**
 * Subtracts a specified amount of time from a given date.
 *
 * @param {Date} date - The date to subtract from.
 * @param {number} amount - The amount of time to subtract.
 * @param {string} unit - The unit of time ("second", "seconds", "day", or "days").
 * @returns {Date} A new Date object with the specified time subtracted.
 */
function subtractFromDate(date, amount, unit) {
  const unitsToMilliseconds = {
    second: 1000,
    seconds: 1000,
    day: 86400000,
    days: 86400000
  };

  const ms = unitsToMilliseconds[unit];

  return new Date(date.getTime() - amount * ms);
}

module.exports = {
  validAgainstSchema,
  sendToQueue,
  parseDocumentList,
  NotifyClient: config.email.notifyApiKey === 'USE_MOCK' ?
    NotifyMock : require('notifications-node-client').NotifyClient,
  formatDateTime,
  postgresDateFormat,
  getUTCTime,
  subtractFromDate
};
