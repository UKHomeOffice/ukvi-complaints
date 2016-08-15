'use strict';

const bootstrap = require('hof-bootstrap');

const mockSessionStore = require('hof-acceptance/mock-session');
const config = require('./config');

const CI = config.env === 'ci';

bootstrap({
	sessionStore: CI ? mockSessionStore : null,
	views: false,
	fields: false,
	routes: [
		require('./apps/complaints/')
	]
});
