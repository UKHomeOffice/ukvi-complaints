'use strict';

const path = require('path');
const bootstrap = require('hof-bootstrap');

bootstrap({
	translations: './apps/complaints/translations',
  views: path.resolve(__dirname, './apps/common/views'),
	fields: false,
	routes: [
		require('./apps/complaints/')
	]
});
