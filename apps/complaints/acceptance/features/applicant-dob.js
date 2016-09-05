'use strict';

const steps = require('../../');

Feature('Applicants dob step');

Before((
  I,
  applicantDOBPage
) => {
  I.visitPage(applicantDOBPage, steps);
});

Scenario('The correct fields elements are on the page', (
  I,
  applicantDOBPage
) => {
  I.seeElements([
    applicantDOBPage.id['dob-day'],
    applicantDOBPage.id['dob-month'],
    applicantDOBPage.id['dob-year']
  ]);
});

Scenario('An error is shown if applicant dob is not completed', (
  I,
  applicantDOBPage
) => {
  I.submitForm();
  I.seeErrors(applicantDOBPage.id.dob);
});

Scenario('An error is shown if applicant dob day is not completed', (
  I,
  applicantDOBPage
) => {
  I.fillField(applicantDOBPage.id['dob-month'], applicantDOBPage.content.valid.month);
  I.fillField(applicantDOBPage.id['dob-year'], applicantDOBPage.content.valid.year);
  I.submitForm();
  I.seeErrors(applicantDOBPage.id.dob);
});

Scenario('An error is shown if applicant dob date is a future date', (
  I,
  applicantDOBPage
) => {
  applicantDOBPage.fillFutureDateFormAndSubmit();
  I.seeErrors(applicantDOBPage.id.dob);
});

Scenario('An error is shown if applicant dob date is an invalid date', (
  I,
  applicantDOBPage
) => {
  applicantDOBPage.fillInvalidDateFormAndSubmit();
  I.seeErrors(applicantDOBPage.id.dob);
});


Scenario('On submitting the completed step I am taken to applicants contact step if I am the applicant', (
  I,
  applicantDOBPage,
  contactDetailsPage
) => {
  applicantDOBPage.fillFormAndSubmit();
  I.seeInCurrentUrl(contactDetailsPage.url);
});

Scenario('On submitting the completed step I am taken to complaint type step if I am the representative', function *(
  I,
  applicantDOBPage,
  complaintTypePage
) {
  yield I.setSessionData(steps.name, {
    applicant: 'false'
  });
  applicantDOBPage.fillFormAndSubmit();
  I.seeInCurrentUrl(complaintTypePage.url);
});
