'use strict';

/* eslint no-process-env: 0 */
const env = process.env.NODE_ENV || 'production';
const localhost = () => `${process.env.LISTEN_HOST || '0.0.0.0'}:${process.env.PORT || 8080}`;

module.exports = {
  dateFormat: 'DD-MM-YYYY',
  dateTimeFormat: 'DD-MM-YYYY, hh:mma',
  redis: {
    password: process.env.REDIS_PASSWORD
  },
  email: {
    from: process.env.FROM_ADDRESS || '',
    replyTo: process.env.REPLY_TO || '',
    transport: process.env.EMAIL_TRANSPORT || 'stub',
    caseworker: process.env.CASEWORKER_EMAIL || '',
    recipient: process.env.CASEWORKER_EMAIL || '',
    transportOptions: {
      accessKeyId: process.env.HOF_SES_USER || process.env.AWS_USER || '',
      secretAccessKey: process.env.HOF_SES_PASSWORD || process.env.AWS_PASSWORD || ''
    },
    emailCaseworker: true,
  },
  aws: {
    region: process.env.AWS_REGION || 'eu-west-2',
    sqsUrl: process.env.AWS_SQS_URL || 'http://localhost:4566/000000000000/local-queue',
  },
  writeToCasework: true,
};
