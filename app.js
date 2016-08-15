'use strict';

const bootstrap = require('hof-bootstrap');

bootstrap({
	sessionStore: CI ? mockSessionStore : null,
	translations: './apps/complaints/translations',
	views: false,
	fields: false,
	routes: [
		require('./apps/complaints/')
	]
});
