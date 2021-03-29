'use strict';
const config = require('../../../config');
const utils = require('../lib/utils');
const formatComplaintData = require('../lib/format-complaint-data');

module.exports = superclass => class SendToSQS extends superclass {

  saveValues(req, res, next) {
    try {
      if (!config.writeToCasework) {
        next();
      }

      const complaintData = formatComplaintData(req.sessionModel.attributes);
      const valid = utils.validateAgainstSchema(complaintData);

      if (valid) {
        utils.sendToQueue(complaintData)
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
    return next(err);
  }

};

