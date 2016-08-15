'use strict';

const path = require('path');

const relative = relativePath => path.resolve(__dirname, relativePath);

module.exports = {
  name: 'ukvi-complaints',
  include: {
    whoPage: relative('./pages/who.js'),
    applicantNamePage: relative('./pages/applicant-name.js'),
    declarationPage: relative('./pages/declaration.js'),
  }
};
