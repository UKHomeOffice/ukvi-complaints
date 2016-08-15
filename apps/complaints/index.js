'use strict';

const controllers = require('hof').controllers;

module.exports = {
  name: 'complaints',
  steps: {
    '/': {
      controller: controllers.start,
      next: '/who'
    },
    '/who': {
      fields: ['applicant'],
      next: '/applicant-name',
      forks: [{
        target: '/declaration',
        condition: {
          field: 'applicant',
          value: 'false'
        }
      }],
      locals: {
        section: 'personal-contact-details'
      }
    },
    '/declaration': {
      locals: {
        section: 'personal-contact-details'
      }
    },
    '/applicant-name': {
      locals: {
        section: 'personal-contact-details'
      }
    }
  }
};
