'use strict';

const steps = require('../../');

Feature('Complaint phone number Step');

Before((
  I,
  phonePage
) => {
  I.visitPage(phonePage, steps);
});

Scenario('I see the correct fields on the page', (
  I,
  phonePage
) => {
  I.seeElements([
    phonePage['complaint-phone-number']
  ]);
});

Scenario('I see an error relating to the phone field if I click submit without completing', (
  I,
  phonePage
) => {
  I.submitForm();
  I.seeErrors(phonePage['complaint-phone-number']);
});

Scenario('I see an error relating to the phone field if I enter an invalid phone number', (
  I,
  phonePage
) => {
  I.fillField(
    phonePage['complaint-phone-number'],
    phonePage.invalidPhoneNumber
  );
  I.submitForm();
  I.seeErrors(phonePage['complaint-phone-number']);
});

Scenario('I am taken to the complaint date page if I submit the form', (
  I,
  phonePage,
  complaintDatePage
) => {
  I.fillField(
    phonePage['complaint-phone-number'],
    phonePage.validPhoneNumber
  );
  I.submitForm();
  I.seeInCurrentUrl(complaintDatePage.url);
});
