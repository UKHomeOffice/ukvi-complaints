'use strict';

const steps = require('../../');

Feature('Confirm step');

Before((
  I,
  confirmPage
) => {
  I.visitPage(confirmPage, steps);
});

Scenario('I see the summary table labels following journey for Applicant and Previous Complaint', function *(
  I,
  confirmPage
) {
  yield I.setSessionData(steps.name, confirmPage.valuePreviousComplaint);
  yield I.refreshPage();
  confirmPage.SeeTableElementsApplicantPreviousComplaint();
});

Scenario('I see the summary table labels following journey for Representative, Staff, Phone and Reference numbers', function *(
  I,
  confirmPage
) {
  yield I.setSessionData(steps.name, confirmPage.valueRepresentativeStaffPhoneReference);
  yield I.refreshPage();
  confirmPage.SeeTableElementsRepresentativeStaffPhoneReference();
});

Scenario('I am taken to the confirmation page if I submit the form', function *(
  I,
  confirmPage,
  confirmationPage
) {
  yield I.setSessionData(steps.name, confirmPage.valuePreviousComplaint);
  yield I.refreshPage();
  I.submitForm();
  I.seeInCurrentUrl(confirmationPage.url);
});
