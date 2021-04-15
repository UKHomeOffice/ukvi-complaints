'use strict';
const Validator = require('jsonschema').Validator;
const config = require('../../../config');
const { validAgainstSchema, sendToQueue } = require('../lib/utils');
const formatComplaintData = require('../lib/format-complaint-data');

const createValidator = () => {
  return new Validator();
};
module.exports = superclass => class SendToSQS extends superclass {

  saveValues(req, res, next) {
    try {
      if (!config.writeToCasework) {
        next();
      }

      const complaintData = formatComplaintData(req.sessionModel.attributes);

      if (validAgainstSchema(complaintData, createValidator())) {
        sendToQueue(complaintData)
          .then(() => {
            next();
          })
          .catch(err => {
            SendToSQS.handleError(next, err);
          });
      }
    } catch (err) {
      SendToSQS.handleError(next, err);
    }
  }

  static handleError(next, err) {
    err.formNotSubmitted = true;
    // eslint-disable-next-line no-console
    console.error(err);
    return next(err);
  }

};

