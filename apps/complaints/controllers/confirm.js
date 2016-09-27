'use strict';

const BaseConfirmController = require('hof').controllers.confirm;

module.exports = class ConfirmController extends BaseConfirmController {

  renderTemplate(template, recipient, data, res) {
    return new Promise((resolve, reject) => {
      res.render(template, {
        recipient,
        data
      }, (err, html) => {
        if (err) {
          reject(err);
        }
        resolve(html);
      });
    });
  }
};
