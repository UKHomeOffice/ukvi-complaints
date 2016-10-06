'use strict';

const steps = require('../../');

Feature('Representatives Name Page');

Before((
  I,
  representativeNamePage
) => {
  I.visitPage(representativeNamePage, steps);
});

Scenario('The correct fields are present on the page', (
  I,
  representativeNamePage
) => {
  I.seeElements(representativeNamePage['representative-name']);
});

Scenario('I see an error if I continue without entering a name', (
  I,
  representativeNamePage
) => {
  I.submitForm();
  I.seeErrors(representativeNamePage['representative-name']);
});

Scenario('I enter a name and submit form and I am taken to the contact-details page', (
  I,
  representativeNamePage,
  applicantNamePage
) => {
  I.fillField(representativeNamePage['representative-name'], representativeNamePage.value);
  I.submitForm();
  I.seeInCurrentUrl(applicantNamePage.url);
});
