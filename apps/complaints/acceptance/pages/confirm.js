'use strict';

let I;

module.exports = {
  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'confirm',
  id: {
    applicant: '#applicant-change',
    'accept-declaration': '#accept-declaration-change',
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
    'has-complaint-reference': '#has-complaint-reference-change',
    'has-reference': '#has-reference-change',
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
    I.seeElements(this.id.applicant);
    I.seeElements(this.id['applicant-name']);
    I.seeElements(this.id.dob);
    I.seeElements(this.id['email-address']);
    I.seeElements(this.id['phone-number']);
    I.seeElements(this.id['complaint-type']);
    I.seeElements(this.id['has-complaint-reference']);
    I.seeElements(this.id['complaint-details']);
  },

  SeeTableElementsRepresentativeStaffPhoneReference() {
    I.seeElements(this.id.applicant);
    I.seeElements(this.id['accept-declaration']);
    I.seeElements(this.id['applicant-name']);
    I.seeElements(this.id['representative-name']);
    I.seeElements(this.id.dob);
    I.seeElements(this.id['email-address']);
    I.seeElements(this.id['phone-number']);
    I.seeElements(this.id['complaint-type']);
    I.seeElements(this.id.where);
    I.seeElements(this.id['complaint-phone-number']);
    I.seeElements(this.id['complaint-date']);
    I.seeElements(this.id['complaint-time']);
    I.seeElements(this.id['phoned-from']);
    I.seeElements(this.id['has-reference']);
    I.seeElements(this.id['reference-numbers']);
    I.seeElements(this.id['gwf-reference']);
    I.seeElements(this.id['ho-reference']);
    I.seeElements(this.id['ihs-reference']);
    I.seeElements(this.id['complaint-details']);
  }
};
