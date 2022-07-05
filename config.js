'use strict';

/* eslint no-process-env: 0 */

module.exports = {
  dateFormat: 'DD-MM-YYYY',
  dateTimeFormat: 'DD-MM-YYYY, hh:mma',
  redis: {
    password: process.env.REDIS_PASSWORD
  },
  email: {
    from: process.env.FROM_ADDRESS,
    replyTo: process.env.REPLY_TO,
    transport: process.env.EMAIL_TRANSPORT || 'smtp',
    caseworker: process.env.CASEWORKER_EMAIL || 'sas-hof-test@digital.homeoffice.gov.uk',
    recipient: process.env.CASEWORKER_EMAIL || 'sas-hof-test@digital.homeoffice.gov.uk',
    transportOptions: {
      accessKeyId: process.env.HOF_SES_USER || process.env.AWS_USER || 'stub',
      secretAccessKey: process.env.HOF_SES_PASSWORD || process.env.AWS_PASSWORD || 'stub',
      host: process.env.EMAIL_HOST || 'email-smtp.eu-west-1.amazonaws.com',
      port: process.env.EMAIL_PORT || 465,
      auth: {
        user: process.env.HOF_SES_USER || process.env.AWS_USER ,
        pass: process.env.HOF_SES_PASSWORD || process.env.AWS_PASSWORD
      },
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
