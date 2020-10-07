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
    transport: process.env.EMAIL_TRANSPORT || 'ses',
    caseworker: process.env.CASEWORKER_EMAIL || '',
    transportOptions: {
      accessKeyId: process.env.HOF_SES_USER || process.env.AWS_USER || '',
      secretAccessKey: process.env.HOF_SES_PASSWORD || process.env.AWS_PASSWORD || ''
    }
  }
};
