'use strict';

const controllers = require('hof').controllers;

const isRep = req => req.sessionModel.get('applicant') === 'false';

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
      },
      forks: [{
        target: '/representative-name',
        condition: isRep
      }]
    },
    '/applicant-name': {
      fields: ['applicant-name'],
      next: '/applicant-dob',
      locals: {
        section: 'personal-contact-details'
      }
    },
    '/representative-name': {
      next: '/contact-details',
      fields: ['representative-name'],
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
      },
      forks: [{
        target: '/complaint-type',
        condition: isRep
      }]
    },
    '/contact-details': {
      fields: [
        'email-address',
        'phone-number'
      ],
      next: '/complaint-type',
      locals: {
        section: 'personal-contact-details'
      },
      forks: [{
        target: '/applicant-name',
        condition: isRep
      }]
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
      next: '/complaint-details',
      fields: ['has-complaint-reference', 'complaint-reference'],
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
      next: '/complaint-date',
      fields: ['complaint-phone-number'],
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
    },
    '/complaint-details': {
      next: '/summary',
      fields: ['complaint-details'],
      locals: {
        section: 'complaint-details'
      }
    },
    '/summary': {
      locals: {
        section: 'summary'
      }
    },
    '/complaint-date': {
      locals: {
        section: 'complaint-details'
      }
    }
  }
};
