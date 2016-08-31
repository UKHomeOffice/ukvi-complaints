'use strict';

const path = require('path');

const pagesPath = filename => path.resolve(__dirname,
  `./apps/complaints/acceptance/pages/${filename}`);

module.exports = {
  name: 'ukvi-complaints',
  features: './apps/*/acceptance/features/**/*.js',
  include: {
    whoPage: pagesPath('who.js'),
    applicantNamePage: pagesPath('applicant-name.js'),
    applicantDOBPage: pagesPath('applicant-dob.js'),
    contactDetailsPage: pagesPath('contact-details.js'),
    complaintTypePage: pagesPath('complaint-type.js'),
    hasComplaintReferencePage: pagesPath('has-complaint-reference.js'),
    wherePage: pagesPath('where.js'),
    hasReferencePage: pagesPath('has-reference.js'),
    phonePage: pagesPath('phone.js'),
    vacPage: pagesPath('vac.js'),
    pscPage: pagesPath('psc.js')
  }
};
