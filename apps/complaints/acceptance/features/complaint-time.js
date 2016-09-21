'use strict';

const steps = require('../../');

Feature('Complaint time step');

Before((
  I,
  complaintTimePage
) => {
  I.visitPage(complaintTimePage, steps);
});

Scenario('The correct fields elements are on the page', (
  I,
  complaintTimePage
) => {
  I.seeElements(complaintTimePage['complaint-time']);
});

Scenario('An error is shown if field is not completed', (
  I,
  complaintTimePage
) => {
  I.submitForm();
  I.seeErrors(complaintTimePage['complaint-time']);
});

Scenario('On submitting the completed step I am taken to phoned from step', (
  I,
  complaintTimePage,
  phonedFromPage
) => {
  I.fillField(complaintTimePage['complaint-time'], complaintTimePage.value);
  I.submitForm();
  I.seeInCurrentUrl(phonedFromPage.url);
});
