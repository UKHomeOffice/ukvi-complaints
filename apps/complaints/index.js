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
			fields: ['who-radio'],
			next: '/fullname',
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
