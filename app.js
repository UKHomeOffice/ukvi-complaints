'use strict';

const express = require('express');
const app = express();
const path = require('path');
const logger = require('./lib/logger');
const session = require('express-session');
const config = require('./config');

if (config.env === 'development' || config.env === 'ci' || config.env === 'docker') {
  app.use('/public', express.static(path.resolve(__dirname, './public')));
}

app.use((req, res, next) => {
  res.locals.assetPath = '/public';
  res.locals.gaTagId = config.ga.tagId;
  next();
});

require('hof').template.setup(app);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './apps/common/views'));
app.enable('view cache');
app.use(require('express-partial-templates')(app));
app.engine('html', require('hogan-express-strict'));

app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('body-parser').json());

app.use((req, res, next) => {
  res.locals.baseUrl = req.baseUrl;
  next();
});

// Trust proxy for secure cookies
app.set('trust proxy', 1);

/*************************************/
/******* Redis session storage *******/
/*************************************/
const redis = require('redis');
const RedisStore = require('connect-redis-crypto')(session);
const client = redis.createClient(config.redis.port, config.redis.host);

client.on('connecting', () => {
  logger.info('Connecting to redis');
});

client.on('connect', () => {
  logger.info('Connected to redis');
});

client.on('reconnecting', () => {
  logger.info('Reconnecting to redis');
});

client.on('error', e => {
  logger.error(e);
});

const redisStore = new RedisStore({
  client: client,
  ttl: config.session.ttl,
  secret: config.session.secret
});

function secureCookies(req, res, next) {
  const cookie = res.cookie.bind(res);
  res.cookie = (name, value, options) => {
    options = options || {};
    options.secure = (req.protocol === 'https');
    options.httpOnly = true;
    options.path = '/';
    cookie(name, value, options);
  };
  next();
}

app.use(require('cookie-parser')(config.session.secret));
app.use(secureCookies);
app.use(session({
  store: redisStore,
  cookie: {
    secure: (config.env === 'development' || config.env === 'ci' || config.env === 'docker-compose') ? false : true
  },
  key: config.session.key,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: true
}));

// apps
app.use(require('./apps/complaints/'));

app.get('/cookies', (req, res) => {
  res.render('cookies');
});

app.get('/terms-and-conditions', (req, res) => {
  res.render('terms');
});

// errors
app.use(require('hof').middleware.errors({
  logger: logger,
  translate: require('hof').i18n.translate,
  debug: config.env === 'development'
}));

/*eslint camelcase: 0*/
app.listen(config.port, config.listen_host);
/*eslint camelcase: 1*/
logger.info('App listening on port', config.port);
