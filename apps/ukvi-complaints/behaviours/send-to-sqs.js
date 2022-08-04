'use strict';
<<<<<<< HEAD

const Validator = require('jsonschema').Validator;
const { v4: uuidv4 } = require('uuid');
const config = require('../../../config');
const { validAgainstSchema, sendToQueue } = require('../../../lib/utils');
const formatComplaintData = require('../../../lib/format-complaint-data');
const StatsD = require('hot-shots');
const client = new StatsD();

module.exports = superclass => class SendToSQS extends superclass {
=======
const Validator = require('jsonschema').Validator;
const { v4: uuidv4 } = require('uuid');
const config = require('../../../config');
const { validAgainstSchema, sendToQueue } = require('../lib/utils');
const formatComplaintData = require('../lib/format-complaint-data');

module.exports = superclass => class SendToSQS extends superclass {

>>>>>>> 1bc76527f0f3a2d13da407ca959cd02d2a34f55b
  // eslint-disable-next-line consistent-return
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
<<<<<<< HEAD
            client.increment('ukvicomplaints.sendtoqueue.success');
=======
>>>>>>> 1bc76527f0f3a2d13da407ca959cd02d2a34f55b
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
    // eslint-disable-next-line no-console
    console.error('Failed to send to SQS queue: ', err);
<<<<<<< HEAD
    client.increment('ukvicomplaints.sendtoqueue.failed');
    return next(err);
  }
};
=======
    return next(err);
  }

};

>>>>>>> 1bc76527f0f3a2d13da407ca959cd02d2a34f55b
