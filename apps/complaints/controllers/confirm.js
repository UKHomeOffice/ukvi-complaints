'use strict';

const _ = require('lodash');
const BaseConfirmController = require('hof').controllers.confirm;

module.exports = class ConfirmController extends BaseConfirmController {

  locals(req, res, next) {

    const locals = super.locals(req, res, next);
    const applicant = _.find(locals.tableSections[0].fields, ['name', 'applicant']);
    const complaintType = _.find(locals.tableSections[1].fields, ['name', 'complaint-type']);
    const where = _.find(locals.tableSections[1].fields, ['name', 'where']);
    applicant.value = req.translate(`fields.applicant.options.${applicant.value}.value`);
    complaintType.value = req.translate(`fields['complaint-type'].options.${complaintType.value}.label`);
    if (where) {
      where.value = req.translate(`fields.where.options.${where.value}.label`);
    }
    return locals;
  }

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
