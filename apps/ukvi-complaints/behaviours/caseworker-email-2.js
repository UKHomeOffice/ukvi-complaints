'use strict';

const hof = require('hof');
const Notify = hof.components.notify;
const path = require('path');
const getDataEmail = require('./get-data-caseworker-email').getDataEmail;

module.exports = config => {
  return Notify(Object.assign({}, config, {
    recipient: config.caseworkerTwo,
    subject: (model, translate) => translate('pages.email.caseworker.subject'),
    template: path.resolve(__dirname, '../emails/caseworker.html'),
    parse: (model, translate) => {
      return Object.assign(model, {
        data: getDataEmail(model, translate)
      });
    }
  }));
};
