'use strict';

Feature('I am able to navigate through the form correctly');

Before((I) => {
  I.amOnPage('/');
  I.seeInCurrentUrl('/step1');
});

Scenario('I am on first page', (I) => {
  I.amOnPage('/step1');
  I.see('pages..header');
});

Scenario('The page loads and I see the type of enquiry header', function *(I) {
  yield I.setSessionSteps(['/', '/step1', '/step2']);
  I.amOnPage('/step3');
  I.see('TEST');
});
