'use strict';

const translation = require('./../../apps/complaints/translations/en/default');

Feature('Error messages appear when going through the form when step invalid');

Scenario('Error message appears on the /who step when Save and continue is clicked without an option selected', (I) => {
  I.amOnPage('/');
  I.seeInCurrentUrl('/who');
  I.see(translation.pages['personal-contact-details'].header);
  I.click(translation.buttons.continue);
  I.see(translation.validation['who-radio'].required);
});
