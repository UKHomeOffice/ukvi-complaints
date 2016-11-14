'use strict';

/* eslint no-process-env: 0 */
module.exports = {
  env: process.env.NODE_ENV,
  email: {
    caseworker: process.env.CASEWORKER_EMAIL || '',
    from: process.env.FROM_ADDRESS || '',
    replyTo: process.env.REPLY_TO || '',
    accessKeyId: process.env.AWS_USER || '',
    secretAccessKey: process.env.AWS_PASSWORD || '',
    transportType: 'ses',
    region: process.env.EMAIL_REGION || ''
  }
};
