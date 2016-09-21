'use strict';

const bootstrap = require('hof-bootstrap');

bootstrap({
	translations: './apps/complaints/translations',
  views: false,
	fields: false,
	routes: [
		require('./apps/complaints/')
	]
});
