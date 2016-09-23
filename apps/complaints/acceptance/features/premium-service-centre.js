'use strict';

const steps = require('../../');

Feature('Premium service centre step');

Before((
  I,
  premiumServiceCentrePage
) => {
  I.visitPage(premiumServiceCentrePage, steps);
});

Scenario('The correct fields elements are on the page', (
  I,
  premiumServiceCentrePage
) => {
  I.seeElements(premiumServiceCentrePage['service-centre-city']);
});

Scenario('An error is shown if field is not completed', (
  I,
  premiumServiceCentrePage
) => {
  I.submitForm();
  I.seeErrors(premiumServiceCentrePage['service-centre-city']);
});

Scenario('On submitting the completed step I am taken to phoned from step', (
  I,
  premiumServiceCentrePage,
  complaintDetailsPage
) => {
  I.fillField(premiumServiceCentrePage['service-centre-city'], premiumServiceCentrePage.value);
  I.submitForm();
  I.seeInCurrentUrl(complaintDetailsPage.url);
});
