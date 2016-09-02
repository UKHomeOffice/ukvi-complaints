'use strict';

const steps = require('../../');

Feature('Who Step');

Before((
  I,
  whoPage
) => {
  I.visitPage(whoPage, steps);
});

Scenario('I see the correct fields on the page', (
  I,
  whoPage
) => {
  I.seeElements([
    whoPage.applicant,
    whoPage.true,
    whoPage.false
  ]);
});

Scenario('I dont see the accept-declaration field on landing on the page', (
  I,
  whoPage
) => {
  I.dontSeeElement(whoPage['accept-declaration']);
});

Scenario('I see the accept-declaration field if I am not the applicant', (
  I,
  whoPage
) => {
  I.checkOption(whoPage.false);
  I.seeElement(whoPage['accept-declaration']);
});

Scenario('Error message appears when Continue is clicked without an option selected', (
  I,
  whoPage
) => {
  I.submitForm();
  I.seeErrors(whoPage.applicant);
});

Scenario('When I select applicant option I go to the Applicant Name step', (
  I,
  whoPage,
  applicantNamePage
) => {
  I.checkOption(whoPage.true);
  I.submitForm();
  I.seeInCurrentUrl(applicantNamePage.url);
});

Scenario('When I select representative option and continue without accepting declaration I see an error message', (
  I,
  whoPage
) => {
  I.checkOption(whoPage.false);
  I.submitForm();
  I.seeErrors(whoPage['accept-declaration']);
});

Scenario('When I select representative option, accept declaration and continue, I am taken to the representative name page', (
  I,
  whoPage,
  representativeNamePage
) => {
  I.checkOption(whoPage.false);
  I.checkOption(whoPage['accept-declaration']);
  I.submitForm();
  I.seeInCurrentUrl(representativeNamePage.url);
});
