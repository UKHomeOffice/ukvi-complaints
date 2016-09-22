'use strict';

const steps = require('../../');

Feature('Do you have reference number(s) Step');

Before((
  I,
  hasReferencePage
) => {
  I.visitPage(hasReferencePage, steps);
});

Scenario('I see the correct fields on the page', (
  I,
  hasReferencePage
) => {
  I.seeElements([
    hasReferencePage.id['has-reference'],
    hasReferencePage.id.yes,
    hasReferencePage.id.no
  ]);
});

Scenario('When I select Yes I go to the has which reference numbers step', (
  I,
  hasReferencePage,
  whichReferencePage
) => {
  I.click(hasReferencePage.id.yes);
  I.submitForm();
  I.seeInCurrentUrl(whichReferencePage.url);
});

Scenario('When I select No I go to the complaint details step', (
  I,
  hasReferencePage,
  complaintDetailsPage
) => {
  I.click(hasReferencePage.id.no);
  I.submitForm();
  I.seeInCurrentUrl(complaintDetailsPage.url);
});

Scenario('Error message appears when Continue is clicked without an option selected', (
  I,
  hasReferencePage
) => {
  I.submitForm();
  I.seeErrors(hasReferencePage.id['has-reference']);
});
