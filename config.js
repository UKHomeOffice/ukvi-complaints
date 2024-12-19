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
    caseworker: process.env.CASEWORKER_EMAIL,
    // noEmail sets default inbox where an email is expected by govNotify but not requested in the form
    noEmail: process.env.NO_EMAIL_GIVEN_INBOX
  },
  hosts: {
    acceptanceTests: process.env.ACCEPTANCE_HOST_NAME
  },
  awsSqs: {
    region: process.env.AWS_REGION,
    queueUrl: process.env.SQS_URL,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  },
  sendToQueue: process.env.SEND_TO_DECS_QUEUE === 'online',
  feedbackUrl: process.env.FEEDBACK_URL
};
