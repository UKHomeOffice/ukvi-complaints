'use strict';

const steps = require('../../');

Feature('Visa application centre step');

Before((
  I,
  visaApplicationCentrePage
) => {
  I.visitPage(visaApplicationCentrePage, steps);
});

Scenario('I see the correct fields on the page', (
  I,
  visaApplicationCentrePage
) => {
  I.seeElements([
    visaApplicationCentrePage.id.country,
    visaApplicationCentrePage.id.city
  ]);
});

Scenario('I see an error relating to the country and city fields if I click submit without completing', (
  I,
  visaApplicationCentrePage
) => {
  I.submitForm();
  I.seeErrors(visaApplicationCentrePage.id.country);
  I.seeErrors(visaApplicationCentrePage.id.city);
});

Scenario('I am taken to the complaint type page if I submit the form', (
  I,
  visaApplicationCentrePage,
  hasReferencePage
) => {
  I.fillField(
    visaApplicationCentrePage.id.country,
    visaApplicationCentrePage.value.country
  );
  I.fillField(
    visaApplicationCentrePage.id.city,
    visaApplicationCentrePage.value.city
  );
  I.submitForm();
  I.seeInCurrentUrl(hasReferencePage.url);
});
