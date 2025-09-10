'use strict';

const Validator = require('jsonschema').Validator;
const config = require('../../../config');
const { validAgainstSchema, sendToQueue } = require('../../../lib/utils');
const formatComplaintData = require('../../../lib/format-complaint-data');
const StatsD = require('hot-shots');
const client = new StatsD();
const applicationsUrl = `${config.saveService.host}:${config.saveService.port}/submitted_applications`;
const { model: Model } = require('hof');

module.exports = superclass => class SendToSQS extends superclass {
  // eslint-disable-next-line consistent-return
  saveValues(req, res, next) {
    let complaintId;
    let complaintData;

    try {
      if (!config.sendToQueue) {
        return next();
      }

      complaintId = req.sessionModel.get('submission-reference');
      complaintData = formatComplaintData(req.sessionModel.attributes);

      if (validAgainstSchema(complaintData, new Validator())) {
        const id = req.sessionModel.get('id');
        const model = new Model();
        const params = {
          url: `${applicationsUrl}/${id}`,
          method: 'PATCH',
          data: { submitted_at: new Date() }
        }; // to move into sendToQueue
        return sendToQueue(complaintData, complaintId)
          .then(() => {
            client.increment('ukvicomplaints.sendtoqueue.success');
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
    client.increment('ukvicomplaints.sendtoqueue.failed');
    return next(err);
  }
};
