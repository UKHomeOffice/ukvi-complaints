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
			fields: ['who'],
			next: '/applicant-name',
      forks: [{
        target: '/declaration',
        condition: {
          field: 'who-radio',
          value: 'representative'
        }
      }],
      locals: {
        section: 'personal-contact-details'
      }
		}
	}
};
