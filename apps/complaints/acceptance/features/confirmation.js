'use strict';

const steps = require('../../');

Feature('Confirmation step');

Before((
  I,
  confirmationPage
) => {
  I.visitPage(confirmationPage, steps);
});

Scenario('The correct fields elements are on the page', function *(
  I,
  confirmationPage
) {
  yield I.setSessionData(steps.name, {
    'email-address': 'test@test.com'
  });
  yield I.refreshPage();
  I.seeElement(confirmationPage.sentHeader);
  I.see(confirmationPage.content.email);
});
