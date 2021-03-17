'use strict';
const config = require('../../../config');
const utils = require('../lib/utils');
const formatComplaintData = require('../lib/format-complaint-data');

module.exports = superclass => class AddToCasework extends superclass {

  saveValues(req, res, next) {
    try {
      if (!config.writeToCasework) {
        next();
      }

      console.log(req.sessionModel.attributes);

      const complaintData = formatComplaintData(req.sessionModel.attributes);
      const valid = utils.validateAgainstSchema(complaintData);

      if (valid) {
        utils.sendToQueue(complaintData)
          .then(() => {
            next();
          })
          .catch(err => {
            AddToCasework.handleError(next, err);
          });
      }
    } catch (err) {
      AddToCasework.handleError(next, err);
    }
  }

  static handleError(next, err) {
    err.formNotSubmitted = true;
    return next(err);
  }


};

