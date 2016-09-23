'use strict';

const steps = require('../../');

Feature('Which reference numbers step');

Before((
  I,
  whichReferencePage
) => {
  I.visitPage(whichReferencePage, steps);
});

Scenario('I see the correct fields on the page', (
  I,
  whichReferencePage
) => {
  I.click(whichReferencePage.id.gwf);
  I.click(whichReferencePage.id.ho);
  I.click(whichReferencePage.id.ihs);
  I.seeElements([
    whichReferencePage.id['reference-numbers'],
    whichReferencePage.id.gwf,
    whichReferencePage.id.ho,
    whichReferencePage.id.ihs,
    whichReferencePage.id['gwf-reference'],
    whichReferencePage.id['ho-reference'],
    whichReferencePage.id['ihs-reference']
  ]);
});

Scenario('When I select gwf option and enter the gwf reference I go to the has complaint details step', (
  I,
  whichReferencePage,
  complaintDetailsPage
) => {
  I.click(whichReferencePage.id.gwf);
  I.fillField(
    whichReferencePage.id['gwf-reference'],
    whichReferencePage.value['gwf-reference']
  );
  I.submitForm();
  I.seeInCurrentUrl(complaintDetailsPage.url);
});

Scenario('When I select ho option and enter the ho reference I go to the complaint details step', (
  I,
  whichReferencePage,
  complaintDetailsPage
) => {
  I.click(whichReferencePage.id.ho);
  I.fillField(
    whichReferencePage.id['ho-reference'],
    whichReferencePage.value['ho-reference']
  );
  I.submitForm();
  I.seeInCurrentUrl(complaintDetailsPage.url);
});

Scenario('When I select ihs option and enter the ihs reference I go to the complaint details step', (
  I,
  whichReferencePage,
  complaintDetailsPage
) => {
  I.click(whichReferencePage.id.ihs);
  I.fillField(
    whichReferencePage.id['ihs-reference'],
    whichReferencePage.value['ihs-reference']
  );
  I.submitForm();
  I.seeInCurrentUrl(complaintDetailsPage.url);
});

Scenario('Error message appears when I select gwf option and Continue is clicked without gwf reference entered', (
  I,
  whichReferencePage
) => {
  I.click(whichReferencePage.id.gwf);
  I.submitForm();
  I.seeErrors(whichReferencePage.id['gwf-reference']);
});

Scenario('Error message appears when I select ho option and Continue is clicked without ho reference entered', (
  I,
  whichReferencePage
) => {
  I.click(whichReferencePage.id.ho);
  I.submitForm();
  I.seeErrors(whichReferencePage.id['ho-reference']);
});

Scenario('Error message appears when I select ihs option and Continue is clicked without ihs reference entered', (
  I,
  whichReferencePage
) => {
  I.click(whichReferencePage.id.ihs);
  I.submitForm();
  I.seeErrors(whichReferencePage.id['ihs-reference']);
});

Scenario('Error message appears when I select gwf, ho, ihs options and Continue is clicked without references entered', (
  I,
  whichReferencePage
) => {
  I.click(whichReferencePage.id.gwf);
  I.click(whichReferencePage.id.ho);
  I.click(whichReferencePage.id.ihs);
  I.submitForm();
  I.seeErrors(whichReferencePage.id['gwf-reference']);
  I.seeErrors(whichReferencePage.id['ho-reference']);
  I.seeErrors(whichReferencePage.id['ihs-reference']);
});

Scenario('Error message appears when Continue is clicked without an option selected', (
  I,
  whichReferencePage
) => {
  I.submitForm();
  I.seeErrors(whichReferencePage.id['reference-numbers']);
});
