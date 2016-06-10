'use strict';

const hof = require('hof');
const wizard = hof.wizard;
const mixins = hof.mixins;
const i18nFuture = hof.i18n;
const router = require('express').Router();
const path = require('path');
const BaseController = require('hof').controllers.base;

const fields = require('./fields/');
const i18n = i18nFuture({
  path: path.resolve(__dirname, './translations/__lng__/__ns__.json')
});

router.use(mixins(fields, {
  translate: i18n.translate.bind(i18n)
}));

router.use('/', wizard(require('./steps'), fields, {
  controller: BaseController,
  templatePath: path.resolve(__dirname, 'views'),
  translate: i18n.translate.bind(i18n),
  params: '/:action?'
}));

module.exports = router;
