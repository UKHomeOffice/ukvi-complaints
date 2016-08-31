'use strict';

const steps = require('../../');

Feature('Where did the incident take place Step');

Before((
  I,
  wherePage
) => {
  I.visitPage(wherePage, steps);
});

Scenario('I see the correct fields on the page', (
  I,
  wherePage
) => {
  I.seeElements([
    wherePage.id.where,
    wherePage.id.phone,
    wherePage.id.vac,
    wherePage.id.psc,
    wherePage.id.letter
  ]);
});

Scenario('When I select the phone option I go to the has phone step', (
  I,
  wherePage,
  phonePage
) => {
  I.click(wherePage.id.phone);
  I.submitForm();
  I.seeInCurrentUrl(phonePage.url);
});

Scenario('When I select the visa application centre (vac) option I go to the incident vac step', (
  I,
  wherePage,
  vacPage
) => {
  I.click(wherePage.id.vac);
  I.submitForm();
  I.seeInCurrentUrl(vacPage.url);
});

Scenario('When I select the premium service centre (psc) option I go to the psc step', (
  I,
  wherePage,
  pscPage
) => {
  I.click(wherePage.id.psc);
  I.submitForm();
  I.seeInCurrentUrl(pscPage.url);
});

Scenario('When I select the letter or email option I go to the has reference step', (
  I,
  wherePage,
  hasReferencePage
) => {
  I.click(wherePage.id.letter);
  I.submitForm();
  I.seeInCurrentUrl(hasReferencePage.url);
});

Scenario('Error message appears when Continue is clicked without an option selected', (
  I,
  wherePage
) => {
  I.submitForm();
  I.seeErrors(wherePage.id.where);
});
