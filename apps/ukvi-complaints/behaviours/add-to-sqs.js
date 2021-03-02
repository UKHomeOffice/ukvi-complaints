'use strict';
const { Producer } = require('sqs-producer');

module.exports = config => {

  return superclass => class SQSIntegration extends superclass {

    formatData(values) {
      // todo format based on schema
      return {
        id: '123565',
        body: 'test',
      };
    }

    saveValues(req, res, next) {

      super.saveValues(req, res, err => {

        if (err) {
          return next(err);
        }

        const complaintData = {
          id: '123565',
          body: 'test',
        };
        // const complaintData = SQSIntegration.formatData(req.sessionModel.toJSON());

        const producer = Producer.create({
          queueUrl: config.aws.sqsUrl,
          region: config.aws.region,
          accessKeyId: 'yourAccessKey',
          secretAccessKey: 'yourSecret'
        });

        producer.send([
          complaintData
        ]);

        return next();
      });
    }


  };
};


