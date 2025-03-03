/* eslint-disable no-process-env */
'use strict';

const hof = require('hof');
const settings = require('./hof.settings');
const config = require('./config');
const mockAPIs = require('./mock-apis');
// const lodash_get = require('lodash.get');
const _ = require('lodash');
const { ApplicationAutoScaling } = require('aws-sdk');
const busboy = require('busboy');
const bytes = require('bytes');
const bl = require('bl');

settings.routes = settings.routes.map(route => require(route));
settings.root = __dirname;
settings.csp = {
  imgSrc: [
    'www.google-analytics.com',
    'ssl.gstatic.com',
    'www.google.co.uk/ads/ga-audiences',
    'data:'
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

if (config.useMocks) {
  app.use(mockAPIs);
}
if (config.env === 'development' || config.env === 'test') {
  app.use('/test/bootstrap-session', (req, res) => {
    const appName = req.body.appName;
    if (!_.get(req, 'session[`hof-wizard-${appName}`]')) {
      if (!req.session) {
        throw new Error('Redis is not running');
      }
      req.session[`hof-wizard-${appName}`] = {};
    }
    Object.keys(req.body.sessionProperties || {}).forEach(key => {
      req.session[`hof-wizard-${appName}`][key] = req.body.sessionProperties[key];
    });
    res.send('SEssion populate complete');
  })
}


app.use((req, res, next) => {
  if (req.is('multipart/form-data')) {
    let bb;
    try {
      bb = busboy({
        headers: req.headers,
        limits: {
          fileSize: bytes('50mb')
        }
      });
    } catch (err) {
      return next(err);
    }

    bb.on('field', function (key, value) {
      req.body[key] = value;
    });

    bb.on('file', function (key, file, fileInfo) {
      file.pipe(bl(function (err, d) {
        if (err || !(d.length || fileInfo.filename)) {
          return;
        }
        const fileData = {
          data: file.truncated ? null : d,
          name: fileInfo.filename || null,
          encoding: fileInfo.encoding,
          mimetype: fileInfo.mimeType || null,
          truncated: file.truncated,
          size: file.truncated ? null : Buffer.byteLength(d, 'binary')
        };

        if (settings.multi) {
          req.files[key] = req.files[key] || [];
          req.files[key].push(fileData);
        } else {
          req.files[key] = fileData;
        }
      }));
    });

    let error;

    bb.on('error', function (err) {
      error = err;
      next(err);
    });

    bb.on('finish', function () {
      if (error) {
        return;
      }
      next();
    });
    req.files = req.files || {};
    req.body = req.body || {};
    req.pipe(bb);
  } else {
    next();
  }
});


app.use((req, res, next) => {
  res.locals.htmlLang = 'en';
  res.locals.feedbackUrl = config.feedbackUrl;
  next();
});

module.exports = app;
