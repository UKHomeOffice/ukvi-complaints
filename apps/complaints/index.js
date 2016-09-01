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
      fields: ['applicant-name'],
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
          target: '/where',
          condition(req) {
            const type = req.form.values['complaint-type'];
            return type === 'staff' || type === 'appointment';
          }
        }],
      fields: ['complaint-type'],
      locals: {
        section: 'complaint-details'
      }
    },
    '/where': {
      next: '/phone',
      forks: [{
        target: '/visa-application-centre',
        condition: {
          field: 'where',
          value: 'visa-application-centre'
        }
      }, {
        target: '/premium-service-centre',
        condition: {
          field: 'where',
          value: 'premium-service-centre'
        }
      }, {
        target: '/has-reference',
        condition: {
          field: 'where',
          value: 'letter'
        }
      }],
      fields: ['where'],
      locals: {
        section: 'complaint-details'
      }
    },
    '/has-complaint-reference': {
      locals: {
        section: 'complaint-details'
      }
    },
    '/has-reference': {
      locals: {
        section: 'complaint-details'
      }
    },
    '/phone': {
      locals: {
        section: 'complaint-details'
      }
    },
    '/visa-application-centre': {
      locals: {
        section: 'complaint-details'
      }
    },
    '/premium-service-centre': {
      locals: {
        section: 'complaint-details'
      }
    }
  }
};
