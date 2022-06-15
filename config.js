'use strict';

/* eslint no-process-env: 0 */

module.exports = {
  dateFormat: 'DD-MM-YYYY',
  dateTimeFormat: 'DD-MM-YYYY, hh:mma',
  redis: {
    password: process.env.REDIS_PASSWORD
  },
  email: {
    from: 'emmanuel@ukvi-complaints.sas-notprod.homeoffice.gov.uk',
    replyTo: 'emmanuel@ukvi-complaints.sas-notprod.homeoffice.gov.uk',
    transport: process.env.EMAIL_TRANSPORT || 'ses',
    caseworker: process.env.CASEWORKER_EMAIL || 'stub@stub.com',
    recipient: process.env.CASEWORKER_EMAIL || 'stub@stub.com',
    transportOptions: {
      accessKeyId: process.env.HOF_SES_USER || process.env.AWS_USER || 'stub',
      secretAccessKey: process.env.HOF_SES_PASSWORD || process.env.AWS_PASSWORD || 'stub'
    },
    emailCaseworker: true
  },
  awsSqs: {
    region: process.env.AWS_REGION || 'eu-west-2',
    queueUrl: process.env.SQS_URL || 'http://localhost:9324/queue/first-queue',
    accessKeyId: process.env.ACCESS_KEY_ID || 'stub',
    secretAccessKey: process.env.SECRET_ACCESS_KEY || 'stub'
  },
  sendToQueue: process.env.SEND_TO_DECS_QUEUE === 'online'
};
