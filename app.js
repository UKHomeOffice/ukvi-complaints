'use strict';

const bootstrap = require('hof-bootstrap');

const complaints = require('./apps/complaints/');
const mockSessionStore = require('./acceptance_tests/session');
const config = require('./config');

const CI = config.env === 'ci';

module.exports = bootstrap({
	sessionStore: CI ? mockSessionStore : null,
	views: false,
	fields: false,
	translations: './apps/complaints/translations',
	routes: [
		complaints
	]
});
