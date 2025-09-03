'use strict';

/* eslint no-process-env: 0 */

module.exports = {
  env: 'development',
  dateFormat: 'DD-MM-YYYY',
  dateTimeFormat: 'DD-MM-YYYY, hh:mma',
  redis: {
    password: process.env.REDIS_PASSWORD
  },
  email: {
    notifyApiKey: process.env.NOTIFY_KEY,
    notifyTemplate: process.env.NOTIFY_TEMPLATE,
    caseworkerEmail: process.env.CASEWORKER_EMAIL,
    caseworkerEmailSecondary: process.env.CASEWORKER_EMAIL_SECONDARY,
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
  feedbackUrl: process.env.FEEDBACK_URL,
  upload: {
    maxFileSizeInBytes: 21 * 1000 * 1000, // 21MB in bytes
    hostname: process.env.FILE_VAULT_URL,
    allowedMimeTypes: [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png'
    ],
    documentCategories: {
      'upload-complaint-doc': {
        allowMultipleUploads: true,
        limit: 3,
        limitValidationError: 'maxComplaintUpload'
      }
    }
  },
  keycloak: {
    token: process.env.KEYCLOAK_TOKEN_URL,
    username: process.env.KEYCLOAK_USERNAME,
    password: process.env.KEYCLOAK_PASSWORD,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    secret: process.env.KEYCLOAK_SECRET
  }
};
