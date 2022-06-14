'use strict';

const config = require('../../config');
const conditionalContent = require('./behaviours/conditional-content');
const customerEmailer = require('./behaviours/customer-email')(config.email);
const caseworkerEmailer = require('./behaviours/caseworker-email')(config.email);
const sendToSQS = require('./behaviours/send-to-sqs');
const ResetOnChange = require('./behaviours/reset-on-change');

module.exports = {
  name: 'ukvi-complaints',
  baseUrl: '/',
  pages: {
    '/terms-and-conditions': 'terms',
    '/cookies': 'cookies'
  },
  steps: {
    '/reason': {
      fields: ['reason'],
      behaviours: ResetOnChange({
        field: 'reason'
      }),
      next: '/immigration-application',
      forks: [{
        target: '/immigration-application',
        condition: {
          field: 'reason',
          value: 'immigration-application'
        }
      }, {
        target: '/immigration-appointment',
        condition: {
          field: 'reason',
          value: 'immigration-appointment'
        }
      }, {
        target: '/delays',
        condition: {
          field: 'reason',
          value: 'delays'
        }
      }, {
        target: '/decision-outcome',
        condition: {
          field: 'reason',
          value: 'immigration-decision'
        }
      }, {
        target: '/biometric-residence-permit',
        condition: {
          field: 'reason',
          value: 'biometric-residence-permit'
        }
      }, {
        target: '/refund',
        condition: {
          field: 'reason',
          value: 'refund'
        }
      }, {
        target: '/poor-info-or-behaviour',
        condition: {
          field: 'reason',
          value: 'staff-behaviour'
        }
      }, {
        target: '/existing-complaint',
        condition: {
          field: 'reason',
          value: 'existing-complaint'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'reason',
          value: 'other-complaint'
        }
      }]
    },
    '/immigration-application': {
      next: '/application-technical',
      fields: ['immigration-application'],
      forks: [{
        target: '/application-technical',
        condition: {
          field: 'immigration-application',
          value: 'technical-issues'
        }
      }, {
        target: '/application-guidance-where',
        condition: {
          field: 'immigration-application',
          value: 'guidance'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'immigration-application',
          value: 'complain'
        }
      }]
    },
    '/application-technical': {
      next: '/application-technical-inside-uk',
      fields: ['where-applied-from'],
      forks: [{
        target: '/application-technical-inside-uk',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/application-technical-outside-uk',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }]
    },
    '/application-technical-inside-uk': {
      next: '/application-ref-numbers'
    },

    '/application-technical-outside-uk': {
      next: '/application-ref-numbers'
    },
    '/application-guidance-where': {
      next: '/application-guidance-inside-uk',
      fields: ['where-applied-from'],
      forks: [{
        target: '/application-guidance-inside-uk',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/application-guidance-outside-uk',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }]
    },

    '/application-guidance-inside-uk': {
      next: '/application-ref-numbers'
    },

    '/application-guidance-outside-uk': {
      next: '/application-ref-numbers'
    },

    '/immigration-appointment': {
      next: '/lack-availability',
      fields: ['immigration-appointment'],
      forks: [{
        target: '/lack-availability',
        condition: {
          field: 'immigration-appointment',
          value: 'lack-availability'
        }
      }, {
        target: '/change-appointment',
        condition: {
          field: 'immigration-appointment',
          value: 'change-appointment'
        }
      }, {
        target: '/questions-appointments',
        condition: {
          field: 'immigration-appointment',
          value: 'questions-appointments'
        }
      }, {
        target: '/appointment-technical',
        condition: {
          field: 'immigration-appointment',
          value: 'technical-appointments'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'immigration-appointment',
          value: 'complain-appointments'
        }
      }]
    },
    '/lack-availability': {
      next: 'lack-availability-inside',
      fields: ['where-applied-from'],
      forks: [{
        target: '/lack-availability-inside',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/lack-availability-outside',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }]
    },
    '/lack-availability-inside': {
      next: '/application-ref-numbers'
    },
    '/lack-availability-outside': {
      next: '/application-ref-numbers'
    },
    '/change-appointment': {
      next: '/change-appointment-inside',
      fields: ['where-applied-from'],
      forks: [{
        target: '/change-appointment-inside',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/change-appointment-outside',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }]
    },

    '/change-appointment-inside': {
      next: '/application-ref-numbers'
    },
    '/change-appointment-outside': {
      next: '/application-ref-numbers'
    },
    '/appointment-technical': {
      next: '/appointment-technical-inside',
      fields: ['where-applied-from'],
      forks: [{
        target: '/appointment-technical-inside',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/appointment-technical-outside',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }]
    },
    '/appointment-technical-inside': {
      next: '/application-ref-numbers'
    },
    '/appointment-technical-outside': {
      next: '/application-ref-numbers'
    },
    '/questions-appointments': {
      next: '/questions-appointments-inside',
      fields: ['where-applied-from'],
      forks: [{
        target: '/questions-appointments-inside',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/questions-appointments-outside',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }]
    },
    '/questions-appointments-outside': {
      next: '/application-ref-numbers'
    },
    '/questions-appointments-inside': {
      next: '/application-ref-numbers'
    },
    '/delays': {
      next: '/request-upgrade',
      fields: ['delay-type'],
      forks: [{
        target: '/request-upgrade',
        condition: {
          field: 'delay-type',
          value: 'application-delay'
        }
      }, {
        target: '/return-of-documents',
        condition: {
          field: 'delay-type',
          value: 'return-of-documents'
        }
      }]
    },
    '/application-delay': {
      next: '/request-upgrade',
      fields: ['application-delay'],
      forks: [{
        target: '/request-upgrade',
        condition: {
          field: 'application-delay',
          value: 'request-upgrade'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'application-delay',
          value: 'application-ref-numbers'
        }
      }]
    },

    '/request-upgrade': {
      next: '/upgrade-inside-uk',
      fields: ['where-applied-from'],
      forks: [{
        target: '/upgrade-inside-uk',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/upgrade-outside-uk',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }]
    },

    '/upgrade-inside-uk': {
      next: '/when-applied'
    },
    '/upgrade-outside-uk': {
      next: '/when-applied'
    },
    '/application-ref-numbers': {
      fields: [
        'reference-numbers',
        'gwf-reference',
        'ho-reference',
        'ihs-reference',
        'uan-reference'
      ],
      next: '/acting-as-agent'
    },
    '/return-of-documents': {
      next: '/report-lost-docs-service',
      fields: ['return-of-documents'],
      forks: [{
        target: '/report-lost-docs-service',
        condition: {
          field: 'return-of-documents',
          value: 'yes-docs-service'
        }
      }, {
        target: '/request-docs-service',
        condition: {
          field: 'return-of-documents',
          value: 'yes-other'
        }
      }, {
        target: '/request-docs-service',
        condition: {
          field: 'return-of-documents',
          value: 'no'
        }
      }]
    },
    '/requested-documents': {
      next: '/have-requested',
      fields: ['requested-documents'],
      forks: [{
        target: '/have-requested',
        condition: {
          field: 'requested-documents',
          value: 'yes'
        }
      }, {
        target: '/request-docs-service',
        condition: {
          field: 'requested-documents',
          value: 'no'
        }
      }]
    },
    '/have-requested': {
      next: '/report-lost-docs-service',
      fields: ['have-requested'],
      forks: [{
        target: '/report-lost-docs-service',
        condition: {
          field: 'have-requested',
          value: 'used-service'
        }
      }, {
        target: '/request-docs-service',
        condition: {
          field: 'have-requested',
          value: 'something-else'
        }
      }]
    },
    '/request-docs-service': {
      next: '/complaint-details'
    },
    '/report-lost-docs-service': {
      next: '/complaint-details'
    },
    '/immigration-decision': {
      next: '/decision-outcome',
      fields: ['immigration-decision'],
      forks: [{
        target: '/decision-outcome',
        condition: {
          field: 'immigration-decision',
          value: 'yes'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'immigration-decision',
          value: 'no'
        }
      }]
    },
    '/decision-outcome': {
      next: '/positive-outcome-where',
      fields: ['decision-outcome'],
      forks: [{
        target: '/positive-outcome-where',
        condition: {
          field: 'decision-outcome',
          value: 'positive'
        }
      }, {
        target: '/negative-outcome',
        condition: {
          field: 'decision-outcome',
          value: 'negative'
        }
      }]
    },

    '/positive-outcome-where': {
      next: '/positive-outcome-inside',
      fields: ['where-applied-from'],
      forks: [{
        target: '/positive-outcome-inside',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/positive-outcome-outside',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }]
    },
    '/positive-outcome-inside': {
      next: '/complaint-details'
    },
    '/positive-outcome-outside': {
      next: '/complaint-details'
    },
    '/negative-outcome': {
      next: '/complaint-details'
    },
    '/immigration-status-change': {
      next: '/questions-status-change',
      fields: ['immigration-status-change'],
      forks: [{
        target: '/questions-status-change',
        condition: {
          field: 'immigration-status-change',
          value: 'questions-status-change'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'immigration-status-change',
          value: 'complain-status-change'
        }
      }]
    },
    '/questions-status-change': {
      next: '/complaint-details'
    },
    '/biometric-residence-permit': {
      next: '/card-not-arrived',
      fields: ['biometric-residence-permit'],
      forks: [{
        target: '/card-not-arrived',
        condition: {
          field: 'biometric-residence-permit',
          value: 'card-not-arrived'
        }
      }, {
        target: '/letter-not-arrived',
        condition: {
          field: 'biometric-residence-permit',
          value: 'letter-not-arrived'
        }
      }, {
        target: '/card-incorrect',
        condition: {
          field: 'biometric-residence-permit',
          value: 'card-incorrect'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'biometric-residence-permit',
          value: 'complain-brp'
        }
      }]
    },
    '/card-not-arrived': {
      next: '/complaint-details'
    },
    '/letter-not-arrived': {
      next: '/complaint-details'
    },
    '/card-incorrect': {
      next: '/complaint-details'
    },
    '/complain-brp': {
      next: '/complaint-details'
    },
    '/refund-type': {
      next: '/refund-ihs-where-from',
      fields: ['refund-type'],
      forks: [{
        target: '/refund-ihs-where-from',
        condition: {
          field: 'refund-type',
          value: 'ihs'
        }
      }, {
        target: '/refund-standard',
        condition: {
          field: 'refund-type',
          value: 'standard'
        }
      }, {
        target: '/refund-priority-where-from',
        condition: {
          field: 'refund-type',
          value: 'priority'
        }
      }, {
        target: '/refund-super-priority-where-from',
        condition: {
          field: 'refund-type',
          value: 'super-priority'
        }
      }, {
        target: '/refund-premium',
        condition: {
          field: 'refund-type',
          value: 'premium'
        }
      }, {
        target: '/refund-eu-settlement',
        condition: {
          field: 'refund-type',
          value: 'eu-settlement'
        }
      }]
    },
    '/refund-ihs-where-from': {
      next: '/refund-ihs',
      fields: ['where-applied-from'],
      forks: [{
        target: '/refund-ihs',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/refund-ihs-outside',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }]
    },
    '/refund-ihs': {
      next: '/application-ref-numbers'
    },
    '/refund-ihs-outside': {
      next: '/application-ref-numbers'
    },
    '/refund-standard': {
      next: '/application-ref-numbers'
    },
    '/refund-priority-where-from': {
      next: '/refund-priority',
      fields: ['where-applied-from'],
      forks: [{
        target: '/refund-priority',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/refund-priority-outside',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }]
    },
    '/refund-priority': {
      next: '/application-ref-numbers'
    },
    '/refund-priority-outside': {
      next: '/application-ref-numbers'
    },
    '/refund-super-priority-where-from': {
      next: '/refund-super-priority',
      fields: ['where-applied-from'],
      forks: [{
        target: '/refund-super-priority',
        condition: {
          field: 'where-applied-from',
          value: 'inside-uk'
        }
      }, {
        target: '/refund-super-priority-outside',
        condition: {
          field: 'where-applied-from',
          value: 'outside-uk'
        }
      }]
    },
    '/refund-super-priority': {
      next: '/application-ref-numbers'
    },
    '/refund-super-priority-outside': {
      next: '/application-ref-numbers'
    },
    '/refund-premium': {
      next: '/application-ref-numbers'
    },
    '/refund-eu-settlement': {
      next: '/application-ref-numbers'
    },
    '/refund': {
      next: '/refund-when',
      fields: ['refund'],
      forks: [{
        target: '/refund-when',
        condition: {
          field: 'refund',
          value: 'yes'
        }
      }, {
        target: '/refund-type',
        condition: {
          field: 'refund',
          value: 'no'
        }
      }, {
        target: '/refund-type-automatic',
        condition: {
          field: 'refund',
          value: 'not-yet'
        }
      }]
    },
    '/refund-when': {
      next: '/refund-less-than',
      fields: ['refund-when'],
      forks: [{
        target: '/refund-less-than',
        condition: {
          field: 'refund-when',
          value: 'less-than'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'refund-when',
          value: 'more-than'
        }
      }]
    },
    '/refund-type-automatic': {
      next: '/refund-ihs-where-from',
      fields: ['refund-type-automatic'],
      forks: [{
        target: '/refund-ihs-where-from',
        condition: {
          field: 'refund-type-automatic',
          value: 'ihs'
        }
      }, {
        target: '/refund-eu-settlement',
        condition: {
          field: 'refund-type-automatic',
          value: 'eu-settlement'
        }
      }]
    },
    '/refund-less-than': {},
    '/refund-more-than': {
      next: '/application-ref-numbers'
    },
    '/refund-request': {},
    '/poor-info-or-behaviour': {
      next: '/application-ref-numbers',
      fields: ['poor-info-or-behaviour'],
      forks: [{
        target: '/application-ref-numbers',
        condition: {
          field: 'poor-info-or-behaviour',
          value: 'poor-information'
        }
      }, {
        target: '/staff-behaviour',
        condition: {
          field: 'poor-info-or-behaviour',
          value: 'staff-behaviour'
        }
      }]
    },
    '/staff-behaviour': {
      next: '/face-to-face',
      fields: ['staff-behaviour'],
      forks: [{
        target: '/face-to-face',
        condition: {
          field: 'staff-behaviour',
          value: 'face-to-face'
        }
      }, {
        target: '/on-phone',
        condition: {
          field: 'staff-behaviour',
          value: 'on-phone'
        }
      }, {
        target: '/application-ref-numbers',
        condition: {
          field: 'staff-behaviour',
          value: 'in-letter'
        }
      }]
    },
    '/face-to-face': {
      next: '/vac',
      fields: ['which-centre'],
      forks: [{
        target: '/vac',
        condition: {
          field: 'which-centre',
          value: 'vac'
        }
      }, {
        target: '/ssc',
        condition: {
          field: 'which-centre',
          value: 'ssc'
        }
      }, {
        target: '/ukvcas',
        condition: {
          field: 'which-centre',
          value: 'ukvcas'
        }
      }]
    },
    '/vac': {
      fields: ['vac-country', 'vac-city'],
      next: '/application-ref-numbers'
    },
    '/ssc': {
      fields: ['ssc-city'],
      next: '/application-ref-numbers'
    },
    '/ukvcas': {
      fields: ['ukvcas-city'],
      next: '/application-ref-numbers'
    },
    '/on-phone': {
      fields: ['called-number'],
      next: '/called-date'
    },
    '/called-date': {
      fields: ['called-date', 'called-time'],
      next: '/called-from'
    },
    '/called-from': {
      fields: ['called-from'],
      next: '/application-ref-numbers'
    },
    '/existing-complaint': {
      next: '/complaint-reference-number',
      fields: ['existing-complaint'],
      forks: [{
        target: '/complaint-reference-number',
        condition: {
          field: 'existing-complaint',
          value: 'yes'
        }
      }, {
        target: '/complaint-reason-previous',
        condition: {
          field: 'existing-complaint',
          value: 'no'
        }
      }]
    },
    '/complaint-reference-number': {
      fields: ['complaint-reference-number'],
      next: '/complaint-details'
    },
    '/complaint-reason-previous': {
      fields: ['complaint-reason-previous'],
      next: '/acting-as-agent'
    },
    '/other-complaint': {
      fields: ['other-complaint'],
      next: '/complaint-details'
    },
    '/when-applied': {
      fields: ['when-applied'],
      next: '/application-ref-numbers'
    },
    '/acting-as-agent': {
      next: '/who-representing',
      fields: ['acting-as-agent'],
      forks: [{
        target: '/who-representing',
        condition: {
          field: 'acting-as-agent',
          value: 'yes'
        }
      }, {
        target: '/applicant-name',
        condition: {
          field: 'acting-as-agent',
          value: 'no'
        }
      }]
    },

    '/who-representing': {
      fields: ['who-representing'],
      next: '/agent-name'
    },
    '/agent-name': {
      fields: ['agent-name'],
      next: '/agent-contact-details'
    },
    '/agent-contact-details': {
      fields: ['agent-email', 'agent-phone'],
      next: '/agent-representative-name'
    },
    '/agent-representative-name': {
      fields: ['agent-representative-name'],
      next: '/agent-representative-dob'
    },
    '/agent-representative-dob': {
      fields: ['agent-representative-dob'],
      next: '/agent-representative-nationality'
    },
    '/agent-representative-nationality': {
      fields: ['agent-representative-nationality'],
      next: '/complaint-details'
    },
    '/applicant-name': {
      fields: ['applicant-name'],
      next: '/applicant-dob'
    },
    '/applicant-dob': {
      fields: ['applicant-dob'],
      next: '/applicant-nationality'
    },
    '/applicant-nationality': {
      fields: ['applicant-nationality'],
      next: '/applicant-contact-details'
    },
    '/applicant-contact-details': {
      fields: ['applicant-email', 'applicant-phone'],
      next: '/complaint-details'
    },
    '/complaint-details': {
      behaviours: [conditionalContent],
      fields: ['complaint-details'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: [sendToSQS, caseworkerEmailer, customerEmailer, 'complete', require('hof').components.summary],
      next: '/complete',
      sections: {
        'complaint-details': [
          'reason',
          'immigration-application',
          'called-number',
          'called-date',
          'called-time',
          'called-from',
          'ssc-city',
          'vac-country',
          'vac-city',
          'ukvcas-city',
          'when-applied',
          'complaint-reference-number',
          'gwf-reference',
          'ho-reference',
          'ihs-reference',
          'uan-reference',
          'complaint-details'
        ],
        'agent-details': [
          'agent-name',
          'who-representing'
        ],
        'applicant-details': [
          'agent-representative-name',
          'agent-representative-nationality',
          'agent-representative-dob'
        ],
        'your-details': [
          'applicant-name',
          'applicant-nationality',
          'applicant-dob'
        ],
        'contact-details': [
          'applicant-email',
          'applicant-phone',
          'agent-email',
          'agent-phone'
        ]
      }
    },
    '/complete': {
      template: 'confirmation'
    }
  }
};
