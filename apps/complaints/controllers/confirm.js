'use strict';

const hogan = require('hogan.js');
const moment = require('moment');
const BaseConfirmController = require('hof-controllers').confirm;

const FORMAT = 'YYYY/MM/DD';

module.exports = class ConfirmController extends BaseConfirmController {
  getEmailerConfig(req) {
    const config = super.getEmailerConfig(req);
    config.subject = hogan.compile(config.subject).render(Object.assign({}, req.sessionModel.toJSON(), {
      date: moment().format(FORMAT)
    }));
    return config;
  }
};
