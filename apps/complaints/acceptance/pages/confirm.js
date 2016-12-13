'use strict';

const _ = require('lodash');
let I;

module.exports = {
  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'confirm',
  id: {
    applicant: '#applicant-change',
    'applicant-name': '#applicant-name-change',
    'representative-name': '#representative-name-change',
    dob: '#dob-change',
    'email-address': '#email-address-change',
    'phone-number': '#phone-number-change',
    'complaint-type': '#complaint-type-change',
    where: '#where-change',
    'complaint-phone-number': '#complaint-phone-number-change',
    'complaint-date': '#complaint-date-change',
    'complaint-time': '#complaint-time-change',
    'phoned-from': '#phoned-from-change',
    'reference-numbers': '#reference-numbers-change',
    'gwf-reference': '#gwf-reference-change',
    'ho-reference': '#ho-reference-change',
    'ihs-reference': '#ihs-reference-change',
    'complaint-details': '#complaint-details-change'
  },
  valuePreviousComplaint: {
    applicant: 'true',
    'accept-declaration': '',
    'applicant-name': 'Jamie Oliver',
    dob: '30-10-1980',
    'dob-day': '30',
    'dob-month': '10',
    'dob-year': '1980',
    'dob-formatted': '30 October 1980',
    'email-address': 'test@test.com',
    'phone-number': '123456',
    'complaint-type': 'previous',
    'has-complaint-reference': 'no',
    'complaint-reference': '',
    'complaint-details': 'This is a complaint'
  },
  valueRepresentativeStaffPhoneReference: {
    applicant: 'false',
    'accept-declaration': 'true',
    'representative-name': 'James Bond',
    'applicant-name': 'Jamie Oliver',
    dob: '30-10-1980',
    'dob-day': '30',
    'dob-month': '10',
    'dob-year': '1980',
    'dob-formatted': '30 October 1980',
    'email-address': 'test@test.com',
    'phone-number': '1234124',
    'complaint-type': 'staff',
    where: 'phone',
    'complaint-phone-number': '12124',
    'complaint-date': '30-10-2015',
    'complaint-date-day': '30',
    'complaint-date-month': '10',
    'complaint-date-year': '2015',
    'complaint-date-formatted': '30 October 2015',
    'complaint-time': 'morning',
    'phoned-from': '12341243',
    'has-reference': 'yes',
    'reference-numbers': ['gwf', 'ho', 'ihs'],
    'gwf-reference': '1234124',
    'ho-reference': '2341243',
    'ihs-reference': '2341234',
    'complaint-details': 'this is a complaint'
  },

  SeeTableElementsApplicantPreviousComplaint() {
    I.seeElements(_.values(_.pick(
        this.id,
        [
          'applicant',
          'applicant-name',
          'dob',
          'email-address',
          'phone-number',
          'complaint-type',
          'has-complaint-reference',
          'complaint-details'
        ])));
  },

  SeeTableElementsRepresentativeStaffPhoneReference() {
    I.seeElements(_.values(_.pick(
        this.id,
        [
          'applicant',
          'accept-declaration',
          'applicant-name',
          'representative-name',
          'dob',
          'email-address',
          'phone-number',
          'complaint-type',
          'where',
          'complaint-phone-number',
          'complaint-date',
          'complaint-time',
          'phoned-from',
          'has-reference',
          'reference-numbers',
          'gwf-reference',
          'ho-reference',
          'ihs-reference',
          'complaint-details'
        ])));
  }
};
