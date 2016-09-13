'use strict';

const steps = require('../../');

Feature('Complaint date step');

Before((
  I,
  complaintDatePage
) => {
  I.visitPage(complaintDatePage, steps);
});

Scenario('The correct fields elements are on the page', (
  I,
  complaintDatePage
) => {
  I.seeElements([
    complaintDatePage.id['complaint-date-day'],
    complaintDatePage.id['complaint-date-month'],
    complaintDatePage.id['complaint-date-year']
  ]);
});

Scenario('An error is shown if complaint date is not completed', (
  I,
  complaintDatePage
) => {
  I.submitForm();
  I.seeErrors(complaintDatePage.id['complaint-date']);
});

Scenario('An error is shown if complaint date is a future date', (
  I,
  complaintDatePage
) => {
  complaintDatePage.fillFutureDateFormAndSubmit();
  I.seeErrors(complaintDatePage.id['complaint-date']);
});

Scenario('An error is shown if complaint date is an invalid date', (
  I,
  complaintDatePage
) => {
  complaintDatePage.fillInvalidDateFormAndSubmit();
  I.seeErrors(complaintDatePage.id['complaint-date']);
});


Scenario('On submitting the completed step I am taken to complaint time step', (
  I,
  complaintDatePage,
  complaintTimePage
) => {
  complaintDatePage.fillFormAndSubmit();
  I.seeInCurrentUrl(complaintTimePage.url);
});

Scenario('On submitting the completed step with only month and year I am taken to complaint time step', (
  I,
  complaintDatePage,
  complaintTimePage
) => {
  complaintDatePage.fillMonthYearOnlyFormAndSubmit();
  I.seeInCurrentUrl(complaintTimePage.url);
});
