'use strict';

const steps = require('../../');

Feature('Complaint Type Step');

Before((
  I,
  complaintTypePage
) => {
  I.visitPage(complaintTypePage, steps);
});

Scenario('I see the correct fields on the page', (
  I,
  complaintTypePage
) => {
  I.seeElements([
    complaintTypePage.id['complaint-type'],
    complaintTypePage.id.previous,
    complaintTypePage.id.staff,
    complaintTypePage.id.appointment,
    complaintTypePage.id.refund,
    complaintTypePage.id.quality,
    complaintTypePage.id.something
  ]);
});

Scenario('When I select previous complaint option I go to the has complaint reference step', (
  I,
  complaintTypePage,
  hasComplaintReferencePage
) => {
  I.click(complaintTypePage.id.previous);
  I.submitForm();
  I.seeInCurrentUrl(hasComplaintReferencePage.url);
});

Scenario('When I select staff behaviour option I go to the incident where step', (
  I,
  complaintTypePage,
  wherePage
) => {
  I.click(complaintTypePage.id.staff);
  I.submitForm();
  I.seeInCurrentUrl(wherePage.url);
});

Scenario('When I select appointment option I go to the incident where step', (
  I,
  complaintTypePage,
  wherePage
) => {
  I.click(complaintTypePage.id.appointment);
  I.submitForm();
  I.seeInCurrentUrl(wherePage.url);
});

Scenario('When I select refund option I go to the has reference step', (
  I,
  complaintTypePage,
  hasReferencePage
) => {
  I.click(complaintTypePage.id.refund);
  I.submitForm();
  I.seeInCurrentUrl(hasReferencePage.url);
});

Scenario('When I select quality option I go to the has reference step', (
  I,
  complaintTypePage,
  hasReferencePage
) => {
  I.click(complaintTypePage.id.quality);
  I.submitForm();
  I.seeInCurrentUrl(hasReferencePage.url);
});

Scenario('When I select something else option I go to the has reference step', (
  I,
  complaintTypePage,
  hasReferencePage
) => {
  I.click(complaintTypePage.id.something);
  I.submitForm();
  I.seeInCurrentUrl(hasReferencePage.url);
});

Scenario('Error message appears when Continue is clicked without an option selected', (
  I,
  complaintTypePage
) => {
  I.submitForm();
  I.seeErrors(complaintTypePage.id['complaint-type']);
});
