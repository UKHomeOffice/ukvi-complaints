'use strict';

const hof = require('hof');
const Notify = hof.components.notify;
const path = require('path');
const getEmailData = require('../emails/get-email-data').getEmailData;

module.exports = config => {
  return Notify(Object.assign({}, config, {
    recipient: config.caseworker,
    subject: (model, translate) => translate('pages.email.caseworker.subject'),
    template: path.resolve(__dirname, '../emails/caseworker.html'),
    parse: (model, translate) => {
      return Object.assign(model, {
        data: getEmailData(model, translate)
      });
    }
  }));
};
