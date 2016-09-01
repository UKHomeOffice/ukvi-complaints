'use strict';

const translations = require('../../translations/en/default');
const applicantName = translations.fields['applicant-name'].label;

module.exports = {
  url: 'applicant-name',
  'applicant-name': '#applicant-name',
  representative: applicantName.default,
  applicant: applicantName.applicant.true,
  value: 'Sterling Archer'
};
