'use strict';
/* eslint-disable no-process-env */

const hof = require('hof');

const addDynamicSettings = settings => {
  settings.routes = settings.routes.map(route => require(route));
  settings.root = __dirname;

  if (process.env.REDIS_URL) {
    settings.redis = process.env.REDIS_URL;
  }

  return settings;
};

const app = hof(addDynamicSettings(require('./hof.settings')));

app.use((req, res, next) => {
  res.locals.footerSupportLinks = [
    { path: '/cookies', property: 'base.cookies' },
    { path: '/terms-and-conditions', property: 'base.terms' }
  ];
  // set service name for cookie banner
  res.locals.appName = 'UK Visas and Immigration complaints';
  next();
});

app.use('/cookies', (req, res, next) => {
  res.locals = Object.assign({}, res.locals, req.translate('cookies'));
  next();
});

app.use('/terms-and-conditions', (req, res, next) => {
  res.locals = Object.assign({}, res.locals, req.translate('terms'));
  next();
});

module.exports = app;
