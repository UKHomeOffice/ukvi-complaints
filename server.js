/* eslint-disable no-process-env */
'use strict';

const hof = require('hof');
const settings = require('./hof.settings');

settings.routes = settings.routes.map(route => require(route));
settings.root = __dirname;

if (process.env.REDIS_URL) {
  settings.redis = process.env.REDIS_URL;
}

const app = hof(settings);

module.exports = app;
