'use strict';
const { Producer } = require('sqs-producer');
const config = require('../config');
const decsSchema = require('./schema/decs');

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

module.exports = {
  validAgainstSchema,
  sendToQueue,
  parseDocumentList,
  generateErrorMsg
};
