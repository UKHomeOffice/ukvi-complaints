'use strict';

const steps = require('../../');

Feature('Complaint details step');

Before((
  I,
  complaintDetailsPage
) => {
  I.visitPage(complaintDetailsPage, steps);
});

Scenario('The correct fields elements are on the page', (
  I,
  complaintDetailsPage
) => {
  I.seeElements(complaintDetailsPage['complaint-details']);
});

Scenario('An error is shown if field is not completed', (
  I,
  complaintDetailsPage
) => {
  I.submitForm();
  I.seeErrors(complaintDetailsPage['complaint-details']);
});

Scenario('On submitting the completed step I am taken to the summary step', (
  I,
  complaintDetailsPage,
  summaryPage
) => {
  I.fillField(complaintDetailsPage['complaint-details'], complaintDetailsPage.value);
  I.submitForm();
  I.seeInCurrentUrl(summaryPage.url);
});
