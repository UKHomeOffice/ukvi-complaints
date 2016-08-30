'use strict';

const controllers = require('hof').controllers;

module.exports = {
  name: 'complaints',
  steps: {
    '/': {
      controller: controllers.start,
      next: '/complaint-type'
    },
    '/who': {
      fields: ['applicant'],
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
      next: '/has-reference',
      forks: [{
        target: '/has-complaint-reference',
        condition: {
          field: 'complaint-type',
          value: 'previous'
        }
      }, {
          target: '/incident-where',
          condition(req) {
            return (req.form.values['complaint-type'] === "staff" || req.form.values['complaint-type'] === "appointment");
          }
        }],
      fields: ['complaint-type'],
      locals: {
        section: 'complaint-details'
      }
    },
    '/incident-where':{
      locals: {
        section: 'complaint-details'
      }
    },
    '/has-complaint-reference':{
      locals: {
        section: 'complaint-details'
      }
    },
    '/has-reference':{
      locals: {
        section: 'complaint-details'
      }
    }
  }
};
