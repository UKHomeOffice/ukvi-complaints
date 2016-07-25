'use strict';

module.exports = {
	name: 'complaints',
	steps: {
		'/': {
			template: 'step',
			fields: ['name-text'],
			next: '/step1'
		},
		'/step1': {
			template: 'step',
			fields: ['name-text']
		}
	}
};
