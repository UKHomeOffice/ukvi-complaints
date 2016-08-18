'use strict';

const translations = require('../../apps/complaints/translations/en/default');
const givenName = translations.fields['applicant-given-name'].label;

module.exports = {
  url: 'applicant-name',
  id: {
    'applicant-given-name': '#applicant-given-name',
    'applicant-family-name': '#applicant-family-name'
  },
  representative: givenName.default,
  complainant: givenName.applicant.true,
  content: {
    'applicant-given-name': 'Sterling',
    'applicant-family-name': 'Archer'
  }
};
