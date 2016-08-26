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
      fields: [
        'applicant',
        'accept-declaration'
      ],
      next: '/applicant-name',
      locals: {
        section: 'personal-contact-details'
      }
    },
    '/applicant-name': {
      fields: ['applicant-given-name', 'applicant-family-name'],
      next: '/applicant-dob',
      locals: {
        section: 'personal-contact-details'
      }
    },
    '/applicant-dob': {
      controller: require('./controllers/applicant-dob'),
      fields: [
        'dob',
        'dob-day',
        'dob-month',
        'dob-year'
      ],
      next: '/contact-details',
      locals: {
        section: 'personal-contact-details'
      }
    },
    '/contact-details': {
      next: '/complaint-type',
      locals: {
        section: 'personal-contact-details'
      }
    },
    '/representative-name': {
      next: '/representative-contact',
      locals: {
        section: 'personal-contact-details'
      }
    },
    '/representative-contact': {
      next: '/complaint-type',
      locals: {
        section: 'personal-contact-details'
      }
    },
    '/complaint-type': {
    }
  }
};
