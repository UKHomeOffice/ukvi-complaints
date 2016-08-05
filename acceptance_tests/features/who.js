'use strict';

const translation = require('./../../apps/complaints/translations/en/default');

Feature('I am on the /who step');

Scenario('The page loads and I am on the Personal and contact details page', (I) => {
  I.amOnPage('/');
  I.seeInCurrentUrl('/who');
  I.see(translation.pages['personal-contact-details'].header);
});

Scenario('Error message appears when Continue is clicked without an option selected', (I) => {
  I.amOnPage('/');
  I.seeInCurrentUrl('/who');
  I.see(translation.pages['personal-contact-details'].header);
  I.click(translation.buttons.continue);
  I.see(translation.validation.who.required);
});
