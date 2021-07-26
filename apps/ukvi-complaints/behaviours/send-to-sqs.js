'use strict';
<<<<<<< HEAD
const Validator = require('jsonschema').Validator;
const { v4: uuidv4 } = require('uuid');
const config = require('../../../config');
const { validAgainstSchema, sendToQueue } = require('../lib/utils');
const formatComplaintData = require('../lib/format-complaint-data');

module.exports = superclass => class SendToSQS extends superclass {

  // eslint-disable-next-line consistent-return
=======

const Validator = require('jsonschema').Validator;
const { v4: uuidv4 } = require('uuid');
const config = require('../../../config');
const { validAgainstSchema, sendToQueue } = require('../../../lib/utils');
const formatComplaintData = require('../../../lib/format-complaint-data');

module.exports = superclass => class SendToSQS extends superclass {
>>>>>>> Add SQS behaviour and changes needed to enable it
  saveValues(req, res, next) {
    let complaintId;
    let complaintData;

    try {
      if (!config.sendToQueue) {
        return next();
      }

      complaintId = uuidv4();
      complaintData = formatComplaintData(req.sessionModel.attributes);

      if (validAgainstSchema(complaintData, new Validator())) {
        return sendToQueue(complaintData, complaintId)
          .then(() => {
            next();
          })
          .catch(err => {
            SendToSQS.handleError(next, err, complaintId, complaintData);
          });
      }
    } catch (err) {
      SendToSQS.handleError(next, err, complaintId, complaintData);
    }
  }


  static handleError(next, err, id, data) {
    const complaintDetails = {
      complaintId: id,
      data
    };
    err.formNotSubmitted = true;
    err.complaintDetails = complaintDetails;
<<<<<<< HEAD
    // eslint-disable-next-line no-console
    console.error('Failed to send to SQS queue: ', err);
    return next(err);
  }

};

=======
    console.error('Failed to send to SQS queue: ', err);
    return next(err);
  }
};
>>>>>>> Add SQS behaviour and changes needed to enable it
