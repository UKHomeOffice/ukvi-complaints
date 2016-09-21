'use strict';

const steps = require('../../');

Feature('Phoned from Step');

Before((
  I,
  phonedFromPage
) => {
  I.visitPage(phonedFromPage, steps);
});

Scenario('I see the correct fields on the page', (
  I,
  phonedFromPage
) => {
  I.seeElements([
    phonedFromPage['phoned-from']
  ]);
});

Scenario('I see an error relating to the phone field if I click submit without completing', (
  I,
  phonedFromPage
) => {
  I.submitForm();
  I.seeErrors(phonedFromPage['phoned-from']);
});

Scenario('I see an error relating to the phone from field if I enter an invalid phone number', (
  I,
  phonedFromPage
) => {
  I.fillField(
    phonedFromPage['phoned-from'],
    phonedFromPage.invalidPhoneNumber
  );
  I.submitForm();
  I.seeErrors(phonedFromPage['phoned-from']);
});

Scenario('I am taken to the reference page if I submit the form', (
  I,
  phonedFromPage,
  hasReferencePage
) => {
  I.fillField(
    phonedFromPage['phoned-from'],
    phonedFromPage.validPhoneNumber
  );
  I.submitForm();
  I.seeInCurrentUrl(hasReferencePage.url);
});
