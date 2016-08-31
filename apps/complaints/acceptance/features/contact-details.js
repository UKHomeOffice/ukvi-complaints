'use strict';

const steps = require('../../');

Feature('Contact Details');

Before((
  I,
  contactDetailsPage
) => {
  I.visitPage(contactDetailsPage, steps);
});

Scenario('I see the correct fields on the page', (
  I,
  contactDetailsPage
) => {
  I.seeElements([
    contactDetailsPage['email-address'],
    contactDetailsPage['phone-number']
  ]);
});

Scenario('I see an error relating to the email field if I click submit without completing', (
  I,
  contactDetailsPage
) => {
  I.submitForm();
  I.seeErrors(contactDetailsPage['email-address']);
});

Scenario('I see an error relating to the phone field if I enter an invalid phone number', (
  I,
  contactDetailsPage
) => {
  I.fillField(
    contactDetailsPage['email-address'],
    contactDetailsPage.validEmailAddress
  );
  I.fillField(
    contactDetailsPage['phone-number'],
    contactDetailsPage.invalidPhoneNumber
  );
  I.submitForm();
  I.seeErrors(contactDetailsPage['phone-number']);
});

Scenario('I see an error relating to the email field if I enter an invalid email address', (
  I,
  contactDetailsPage
) => {
  I.fillField(
    contactDetailsPage['email-address'],
    contactDetailsPage.invalidEmailAddress
  );
  I.submitForm();
  I.seeErrors(contactDetailsPage['email-address']);
});

Scenario('I am taken to the XXXX page if I submit the form', (
  I,
  contactDetailsPage,
  complaintTypePage
) => {
  I.fillField(
    contactDetailsPage['email-address'],
    contactDetailsPage.validEmailAddress
  );
  I.submitForm();
  I.seeInCurrentUrl(complaintTypePage.url);
});
