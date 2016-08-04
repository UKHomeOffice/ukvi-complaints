'use strict';

const translation = require('./../../apps/complaints/translations/en/default');

Feature('Navigating the applicant path');

Scenario('The page loads and I am on the Personal and contact details page', (I) => {
  I.amOnPage('/');
  I.seeInCurrentUrl('/who');
  I.see(translation.pages['personal-contact-details'].header);
});
