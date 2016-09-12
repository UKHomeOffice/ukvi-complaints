'use strict';

const DateController = require('hof').controllers.date;
const moment = require('moment');
const dateFormat = 'DD-MM-YYYY';

module.exports = class ComplaintDateController extends DateController {

  constructor(options) {
    super(options);
    this.dateKey = 'complaint-date';
  }

  process(req, res, callback) {
    const format = this.options.dateFormat ? this.options.dateFormat : dateFormat;
    const dateParts = {};
    const keys = Object.keys(req.form.values);

    keys.forEach(id => {
      const idParts = id.split('-');
      const name = idParts[idParts.length - 1];
      const value = req.form.values[id];

      if (value) {
        dateParts[name] = value;
      }
    });

    if (dateParts.month && dateParts.year) {
      req.form.values[this.dateKey] = moment(
        [dateParts.day || 1, dateParts.month, dateParts.year].join(' '), 'DD MM YYYY'
      ).format(format);
    }

    callback();
  }
};
