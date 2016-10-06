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
    representativeNamePage: pagesPath('representative-name'),
    contactDetailsPage: pagesPath('contact-details.js'),
    complaintTypePage: pagesPath('complaint-type.js'),
    hasComplaintReferencePage: pagesPath('has-complaint-reference.js'),
    wherePage: pagesPath('where.js'),
    hasReferencePage: pagesPath('has-reference.js'),
    phonePage: pagesPath('phone.js'),
    visaApplicationCentrePage: pagesPath('visa-application-centre.js'),
    premiumServiceCentrePage: pagesPath('premium-service-centre.js'),
    complaintDetailsPage: pagesPath('complaint-details.js'),
    confirmPage: pagesPath('confirm.js'),
    complaintDatePage: pagesPath('complaint-date.js'),
    complaintTimePage: pagesPath('complaint-time.js'),
    phonedFromPage: pagesPath('phoned-from.js'),
    whichReferencePage: pagesPath('which-reference.js'),
    confirmationPage: pagesPath('confirmation.js')
  }
};
