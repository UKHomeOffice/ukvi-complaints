'use strict';
const { Producer } = require('sqs-producer');
const config = require('../config');
const decsSchema = require('./schema/decs');

class NotifyMock {
  sendEmail() {
    return Promise.resolve();
  }
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
 * Formats the date portion of a given input using the 'en-GB' locale
 * and the formatting options defined in `config.reportDateFormat`.
 *
 * This function returns a date string in the format "DD/MM/YYYY" or
 * as specified in the configuration, without any time or additional punctuation.
 *
 * @param {string | Date} inputDate - The input date to format. Can be a date string or a Date object.
 * @returns {string} - A formatted date string (e.g., "27/10/2025").
 */
const formatDate = inputDate => {
  const date = new Date(inputDate);
  return date.toLocaleDateString('en-GB', config.reportDateFormat);
};

/**
 * Formats the time portion of a given input date using the 'en-GB' locale
 * and the formatting options defined in `config.reportTimeFormat`.
 *
 * This function returns a time string in 24-hour format with hours, minutes,
 * and seconds, without any date.
 *
 * @param {string | Date} inputDate - The input date to extract and format the time from.
 * @returns {string} - A formatted time string (e.g., "06:59:59").
 */
const formatTime = inputDate => {
  const date = new Date(inputDate);
  return date.toLocaleTimeString('en-GB', config.reportTimeFormat);
};


/**
 * Formats a given input date into a string combining both date and time,
 * using the 'en-GB' locale and formatting options defined in the config object.
 *
 * The date is formatted using `config.reportDateFormat`, and the time is formatted
 * using `config.reportTimeFormat`. The final output is a string in the format:
 * "DD/MM/YYYY HH:mm:ss" (without any comma).
 *
 * @param {string | Date} inputDate - The input date to format. Can be a date string or a Date object.
 * @returns {string} - A formatted string combining date and time.
 */
const formatDateTime = inputDate => {
  const date = new Date(inputDate);
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(date);
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
/**
 * Generates a useful error message from a typical Axios error reponse object
 * It will return at a minimum error.message from the Error object passed in.
 *
 * @param {object} error - An Error object.
 * @returns {string} - An error message for failed Axios requests containing key causal information.
 */
const generateErrorMsg = error => {
  const errorDetails = error.response?.data ? `Cause: ${JSON.stringify(error.response.data)}` : '';
  const errorCode = error.response?.status ? `${error.response.status} -` : '';
  return `${errorCode}${error.message}${errorDetails ? '; ' + errorDetails : ''}`;
};

/**
 * Sanitises a string value for safe inclusion in a CSV file.
 *
 * This function performs the following transformations:
 * - Replaces all commas (`,`) with hyphens (`-`) to prevent breaking CSV columns.
 * - Replaces curly single quotes (`‘` and `’`) with straight single quotes (`'`) for consistency.
 * - Replaces newline (`\n`), carriage return (`\r`), and tab (`\t`) characters with a space (` `)
 *   to ensure the value remains on a single line and doesn't break CSV formatting.
 *
 * @param {string} value - The input string to sanitise.
 * @returns {string} - The sanitised string safe for CSV output.
 */
function sanitiseCsvValue(value) {
  if (typeof value !== 'string') {
    return value;
  }
  return value
    .replaceAll(',', '-')
    .replace(/[’‘]/g, "'")
    .replace(/[\n\r\t]/g, ' ');
}

module.exports = {
  validAgainstSchema,
  sendToQueue,
  parseDocumentList,
  generateErrorMsg,
  NotifyClient: config.email.notifyApiKey === 'USE_MOCK' ?
    NotifyMock : require('notifications-node-client').NotifyClient,
  formatDateTime,
  postgresDateFormat,
  formatDate,
  getUTCTime,
  subtractFromDate,
  sanitiseCsvValue
};
