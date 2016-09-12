'use strict';

let I;

module.exports = {
  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'complaint-date',
  id: {
    'complaint-date': '#complaint-date',
    'complaint-date-day': '#complaint-date-day',
    'complaint-date-month': '#complaint-date-month',
    'complaint-date-year': '#complaint-date-year'
  },
  content: {
    valid: {
      day: '1',
      month: '6',
      year: '2015'
    },
    invalid: {
      day: '1',
      month: 'a',
      year: '2015'
    },
    future: {
      day: '1',
      month: '6',
      year: '2020'
    }
  },

  fillFormAndSubmit() {
    I.fillField(this.id['complaint-date-day'], this.content.valid.day);
    I.fillField(this.id['complaint-date-month'], this.content.valid.month);
    I.fillField(this.id['complaint-date-year'], this.content.valid.year);
    I.submitForm();
  },

  fillMonthYearOnlyFormAndSubmit() {
    I.fillField(this.id['complaint-date-month'], this.content.valid.month);
    I.fillField(this.id['complaint-date-year'], this.content.valid.year);
    I.submitForm();
  },

  fillFutureDateFormAndSubmit() {
    I.fillField(this.id['complaint-date-day'], this.content.future.day);
    I.fillField(this.id['complaint-date-month'], this.content.future.month);
    I.fillField(this.id['complaint-date-year'], this.content.future.year);
    I.submitForm();
  },

  fillInvalidDateFormAndSubmit() {
    I.fillField(this.id['complaint-date-day'], this.content.invalid.day);
    I.fillField(this.id['complaint-date-month'], this.content.invalid.month);
    I.fillField(this.id['complaint-date-year'], this.content.invalid.year);
    I.submitForm();
  }
};
