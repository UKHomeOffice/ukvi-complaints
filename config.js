'use strict';

/* eslint no-process-env: 0 */
module.exports = {
  env: process.env.NODE_ENV,
  email: {
    caseworker: process.env.CASEWORKER_EMAIL || '',
    from: process.env.FROM_ADDRESS || '',
    port: process.env.EMAIL_PORT || '',
    host: process.env.EMAIL_HOST || '',
    ignoreTLS: process.env.EMAIL_IGNORE_TLS || false,
    secure: process.env.EMAIL_SECURE || false,
    replyTo: process.env.REPLY_TO || '',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASSWORD || ''
    }
  }
};
