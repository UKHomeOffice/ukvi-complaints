'use strict';
const { Producer } = require('sqs-producer');

module.exports = config => {

  return superclass => class SQSIntegration extends superclass {

    saveValues(req, res, next) {

      super.saveValues(req, res, err => {

        if (err) {
          return next(err);
        }

        const complaintData = SQSIntegration.formatData(req.sessionModel.toJSON());

        const producer = Producer.create({
          queueUrl: config.aws.sqsUrl,
          region: config.aws.region,
          accessKeyId: 'yourAccessKey',
          secretAccessKey: 'yourSecret'
        });

        producer.send([
          complaintData
        ]);

      });
    }

    formatData(values) {
      // todo format based on schema
      return {
        check: 'test',
      };
    }
  };
};


