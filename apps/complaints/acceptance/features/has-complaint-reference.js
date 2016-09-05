'use strict';

const steps = require('../../');

Feature('Complaint reference');

Before((
  I,
  hasComplaintReferencePage
) => {
  I.visitPage(hasComplaintReferencePage, steps);
});

Scenario('I see the correct fields on the page', (
  I,
  hasComplaintReferencePage
) => {
  I.seeElements([
    hasComplaintReferencePage.id['has-complaint-reference']
  ]);
});

Scenario('When I select Yes option and enter a reference number I go to the has complaint details step', (
  I,
  hasComplaintReferencePage,
  complaintDetailsPage
) => {
  I.click(hasComplaintReferencePage.id.yes);
  I.fillField(hasComplaintReferencePage.id['complaint-reference'], hasComplaintReferencePage.value);
  I.submitForm();
  I.seeInCurrentUrl(complaintDetailsPage.url);
});

Scenario('When I select No option I go to complaint details step', (
  I,
  hasComplaintReferencePage,
  complaintDetailsPage
) => {
  I.click(hasComplaintReferencePage.id.no);
  I.submitForm();
  I.seeInCurrentUrl(complaintDetailsPage.url);
});

Scenario('Error message appears when Continue is clicked without an option selected', (
  I,
  hasComplaintReferencePage
) => {
  I.submitForm();
  I.seeErrors(hasComplaintReferencePage.id['has-complaint-reference']);
});

Scenario('Error message appears when I select Yes option and Continue is clicked without an reference number entered', (
  I,
  hasComplaintReferencePage
) => {
  I.click(hasComplaintReferencePage.id.yes);
  I.submitForm();
  I.seeErrors(hasComplaintReferencePage.id['complaint-reference']);
});
