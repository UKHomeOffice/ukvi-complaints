'use strict';

const steps = require('../../');

Feature('Applicants name step');

Before((
  I,
  applicantNamePage
) => {
  I.visitPage(applicantNamePage, steps);
});

Scenario('The correct fields elements are on the page', (
  I,
  applicantNamePage
) => {
  I.seeElements(applicantNamePage['applicant-name']);
});

Scenario('I see the applicant label if I am the applicant', function *(
  I,
  applicantNamePage
) {
  yield I.setSessionData(steps.name, {
    applicant: 'true'
  });
  yield I.refreshPage();
  I.see(applicantNamePage.applicant);
});

Scenario('I see the representative label if I am the representative', function *(
  I,
  applicantNamePage
) {
  yield I.setSessionData(steps.name, {
    applicant: 'false'
  });
  yield I.refreshPage();
  I.see(applicantNamePage.representative);
});

Scenario('An error is shown if field is not completed', (
  I,
  applicantNamePage
) => {
  I.submitForm();
  I.seeErrors(applicantNamePage['applicant-name']);
});

Scenario('On submitting the completed step I am taken to applicants DOB step', (
  I,
  applicantNamePage,
  applicantDOBPage
) => {
  I.fillField(applicantNamePage['applicant-name'], applicantNamePage.value);
  I.submitForm();
  I.seeInCurrentUrl(applicantDOBPage.url);
});
