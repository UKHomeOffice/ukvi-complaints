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

Scenario('When I select applicant option I go to the Applicant Name step', (
  I,
  whoPage,
  applicantNamePage
) => {
  I.click(whoPage.true);
  I.submitForm();
  I.seeInCurrentUrl(applicantNamePage.url);
});

Scenario('When I select applicant option I go to the Applicant Name step', (
  I,
  whoPage,
  applicantNamePage
) => {
  I.click(whoPage.false);
  I.submitForm();
  I.seeInCurrentUrl(applicantNamePage.url);
});

Scenario('Error message appears when Continue is clicked without an option selected', (
  I,
  whoPage
) => {
  I.submitForm();
  I.seeErrors(whoPage.applicant);
});
