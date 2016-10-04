'use strict';

const steps = require('../../');

Feature('Confirm step');

Before((
  I,
  confirmPage
) => {
  I.visitPage(confirmPage, steps);
});

Scenario('I see the summary table labels following journey for Applicant and Previous Complaint', (
  I,
  confirmPage
) => {
  I.setSessionData(steps.name, confirmPage.valuePreviousComplaint);
  I.refreshPage();
  confirmPage.SeeTableElementsApplicantPreviousComplaint();
});

Scenario('I see the summary table labels following journey for Representative, Staff, Phone and Reference numbers', (
  I,
  confirmPage
) => {
  I.setSessionData(steps.name, confirmPage.valueRepresentativeStaffPhoneReference);
  I.refreshPage();
  confirmPage.SeeTableElementsRepresentativeStaffPhoneReference();
});

Scenario('I am taken to the confirmation page if I submit the form', (
  I,
  confirmPage,
  confirmationPage
) => {
  I.setSessionData(steps.name, confirmPage.valuePreviousComplaint);
  I.refreshPage();
  I.submitForm();
  I.seeInCurrentUrl(confirmationPage.url);
});
