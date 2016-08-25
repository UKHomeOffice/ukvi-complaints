'use strict';

let I;

module.exports = {
  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'applicant-dob',
  id: {
    dob: '#dob',
    'dob-day': '#dob-day',
    'dob-month': '#dob-month',
    'dob-year': '#dob-year'
  },
  content: {
    valid: {
      day: '1',
      month: '6',
      year: '1966'
    },
    invalid: {
      day: '1',
      month: 'a',
      year: '1966'
    },
    future: {
      day: '1',
      month: '6',
      year: '2020'
    }
  },

  fillFormAndSubmit() {
    I.fillField(this.id['dob-day'], this.content.valid.day);
    I.fillField(this.id['dob-month'], this.content.valid.month);
    I.fillField(this.id['dob-year'], this.content.valid.year);
    I.submitForm();
  },

  fillFutureDateFormAndSubmit() {
    I.fillField(this.id['dob-day'], this.content.future.day);
    I.fillField(this.id['dob-month'], this.content.future.month);
    I.fillField(this.id['dob-year'], this.content.future.year);
    I.submitForm();
  },

  fillInvalidDateFormAndSubmit() {
    I.fillField(this.id['dob-day'], this.content.invalid.day);
    I.fillField(this.id['dob-month'], this.content.invalid.month);
    I.fillField(this.id['dob-year'], this.content.invalid.year);
    I.submitForm();
  }
};
