'use strict';

/* eslint no-process-env: 0 */

module.exports = {
  dateFormat: 'DD-MM-YYYY',
  dateTimeFormat: 'DD-MM-YYYY, hh:mma',
  redis: {
    password: process.env.REDIS_PASSWORD
  },
  email: {
    notifyApiKey: process.env.NOTIFY_KEY,
    notifyTemplate: process.env.NOTIFY_TEMPLATE,
    caseworker: process.env.CASEWORKER_EMAIL || 'sas-hof-test@digital.homeoffice.gov.uk'
  },
  hosts: {
    acceptanceTests: process.env.ACCEPTANCE_HOST_NAME || `http://localhost:${process.env.PORT || 8080}`
  },
  awsSqs: {
    region: process.env.AWS_REGION || 'eu-west-2',
    queueUrl: process.env.SQS_URL || 'http://localhost:9324/queue/first-queue',
    accessKeyId: process.env.ACCESS_KEY_ID || 'stub',
    secretAccessKey: process.env.SECRET_ACCESS_KEY || 'stub'
  },
  sendToQueue: process.env.SEND_TO_DECS_QUEUE === 'online'
};
