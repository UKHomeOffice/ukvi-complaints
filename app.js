'use strict';

const bootstrap = require('hof-bootstrap');

bootstrap({
	translations: './apps/complaints/translations',
	routes: [
		require('./apps/complaints/')
	]
});
