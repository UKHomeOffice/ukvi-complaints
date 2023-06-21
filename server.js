/* eslint-disable no-process-env */
'use strict';

const hof = require('hof');
const settings = require('./hof.settings');

settings.routes = settings.routes.map(route => require(route));
settings.root = __dirname;
settings.csp = {
  imgSrc: [
    'www.google-analytics.com',
    'ssl.gstatic.com',
    'www.google.co.uk/ads/ga-audiences'
  ],
  connectSrc: [
    'https://www.google-analytics.com',
    'https://region1.google-analytics.com',
    'https://region1.analytics.google.com'
  ]
};

if (process.env.REDIS_URL) {
  settings.redis = process.env.REDIS_URL;
}

const app = hof(settings);
app.use((req, res, next) => {
  res.locals.htmlLang = 'en';
  res.locals.feedbackUrl = 'https://eforms.homeoffice.gov.uk/outreach/feedback.ofml';
  next();
});

module.exports = app;
