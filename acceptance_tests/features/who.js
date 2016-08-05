'use strict';

const translation = require('./../../apps/complaints/translations/en/default');

Feature('I am on the /who step');

Scenario('The page loads and I am on the Personal and contact details section', (I) => {
  I.amOnPage('/');
  I.seeInCurrentUrl('/who');
  I.see(translation.pages['personal-contact-details'].header);
});

Scenario('When I choose the \'I am the Applicant\' option and click Continue I go to the Applicant name step',
  (I) => {
  I.amOnPage('/');
  I.seeInCurrentUrl('/who');
  I.checkOption(translation.fields.who.options.applicant.label);
  I.click(translation.buttons.continue);
  I.seeInCurrentUrl('/applicant-name');
  I.see(translation.pages['personal-contact-details'].header);
});

Scenario('When I choose the \'I represent the applicant\' option and click Continue I go to the Declaration step',
  (I) => {
  I.amOnPage('/');
  I.seeInCurrentUrl('/who');
  I.checkOption(translation.fields.who.options.representative.label);
  I.click(translation.buttons.continue);
  I.seeInCurrentUrl('/declaration');
  I.see(translation.pages['personal-contact-details'].header);
});

Scenario('Error message appears when Continue is clicked without an option selected', (I) => {
  I.amOnPage('/');
  I.seeInCurrentUrl('/who');
  I.see(translation.pages['personal-contact-details'].header);
  I.click(translation.buttons.continue);
  I.see(translation.validation.who.required);
});
