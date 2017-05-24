'use strict';

const controllers = require('hof-controllers');

const pagesTranslations = require('./translations/src/en/pages.json');

module.exports = {
  name: 'complaints',
  params: '/:action?',
  steps: {
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
        condition: {
          field: 'applicant',
          value: 'false'
        }
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
      next: '/applicant-name',
      fields: ['representative-name'],
      locals: {
        section: 'personal-contact-details'
      }
    },
    '/applicant-dob': {
      controller: controllers.date,
      dateKey: 'dob',
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
      fields: [
        'email-address',
        'phone-number'
      ],
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
      next: '/complaint-details',
      fields: ['has-complaint-reference', 'complaint-reference'],
      locals: {
        section: 'complaint-details'
      }
    },
    '/has-reference': {
      next: '/which-reference',
      fields: ['has-reference'],
      forks: [{
        target: '/complaint-details',
        condition: {
          field: 'has-reference',
          value: 'no'
        }
      }],
      locals: {
        section: 'complaint-details',
        'details-summary-id': 'reference-numbers',
        'details-summary': pagesTranslations['reference-numbers']
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
      next: '/has-reference',
      fields: ['country', 'city'],
      locals: {
        section: 'complaint-details',
        subsection: 'visa-application-centre'
      }
    },
    '/premium-service-centre': {
      next: '/has-reference',
      fields: ['service-centre-city'],
      locals: {
        section: 'complaint-details'
      }
    },
    '/complaint-details': {
      next: '/confirm',
      fields: ['complaint-details'],
      locals: {
        section: 'complaint-details'
      }
    },
    '/complaint-date': {
      controller: require('./controllers/complaint-date'),
      dateKey: 'complaint-date',
      fields: [
        'complaint-date',
        'complaint-date-day',
        'complaint-date-month',
        'complaint-date-year'
      ],
      next: '/complaint-time',
      locals: {
        section: 'complaint-details'
      }
    },
    '/complaint-time': {
      next: '/phoned-from',
      fields: ['complaint-time'],
      locals: {
        section: 'complaint-details'
      }
    },
    '/phoned-from': {
      next: '/has-reference',
      fields: ['phoned-from'],
      locals: {
        section: 'complaint-details'
      }
    },
    '/which-reference': {
      next: '/complaint-details',
      fields: [
        'reference-numbers',
        'gwf-reference',
        'ho-reference',
        'ihs-reference'
      ],
      locals: {
        section: 'complaint-details'
      }
    },
    '/confirm': {
      next: '/confirmation',
      controller: controllers.confirm,
      fieldsConfig: require('./fields'),
      emailConfig: require('../../config').email,
      customerEmailField: 'email-address',
      locals: {
        section: 'confirm'
      }
    },
    '/confirmation': {
      backLink: false,
      clearSession: true,
      locals: {
        section: 'confirmation'
      }
    }
  }
};
