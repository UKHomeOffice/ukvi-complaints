'use strict';

Feature('Applicants name step');

Before((
  I,
  whoPage,
  applicantNamePage
) => {
  I.visitPage('/');
  I.setSessionSteps('complaints', [`/${whoPage.url}`]);
  I.amOnPage(`/${applicantNamePage.url}`);
});

Scenario('The correct fields elements are on the page', (
  I,
  applicantNamePage
) => {
  I.seeElements([
    applicantNamePage.id['applicant-given-name'],
    applicantNamePage.id['applicant-family-name']
  ]);
});

Scenario('I see the complainant label if I am the complainant', function *(
  I,
  applicantNamePage
) {
  yield I.setSessionData('complaints', {
    applicant: 'true'
  });
  I.refreshPage();
  I.see(applicantNamePage.complainant);
});

Scenario('I see the representative label if I am the representative', function *(
  I,
  applicantNamePage
) {
  yield I.setSessionData('complaints', {
    applicant: 'false'
  });
  I.refreshPage();
  I.see(applicantNamePage.representative);
});

Scenario('An error is shown if applicant-given-name or applicant-family-name is not completed', (
  I,
  applicantNamePage
) => {
  I.submitForm();
  I.seeErrors([
    applicantNamePage.id['applicant-given-name'],
    applicantNamePage.id['applicant-family-name']
  ]);
});

Scenario('On submitting the completed step I am taken to applicants DOB step', (
  I,
  applicantNamePage,
  applicantDOBPage
) => {
  I.fillField(applicantNamePage.id['applicant-given-name'], applicantNamePage.content['applicant-given-name']);
  I.fillField(applicantNamePage.id['applicant-family-name'], applicantNamePage.content['applicant-family-name']);
  I.submitForm();
  I.seeInCurrentUrl(applicantDOBPage.url);
});
