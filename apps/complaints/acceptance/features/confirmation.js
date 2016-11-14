'use strict';

const steps = require('../../');

Feature('Confirmation step');

Before((
  I,
  confirmationPage
) => {
  I.visitPage(confirmationPage, steps);
});

Scenario('The first page is served when the page is refreshed', function *(
  I
) {
  yield I.refreshPage();
  I.seeInCurrentUrl('/');
});
