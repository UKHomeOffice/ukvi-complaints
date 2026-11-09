import { createBdd } from 'playwright-bdd';
import { test } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
import { resolve } from 'node:path';

//*********************************************************************************************************************************************//
//                                                     BDD Step Definitions for Ukvic Form
//*********************************************************************************************************************************************//

export const { Given, When, Then } = createBdd(test);

Given("I visit the Ukvic page", async ({ pages }) => {
    await pages.ukvicHomePageWhatIsTheComplaintAbtPage.openUkviComplaintHomePage();
});

When('I fill out my answers for the Ukvic form pertaining to {string}', async ({ pages, page }, scenarioDescription: string) => {
     if (!scenarioDescription.trim()) {
        throw new Error("UKVIC description must not be blank");
    }
    switch (scenarioDescription) {
        case "S1-Submitting an application - Tech Issues - In Uk - GWF number -Complaint on Behalf - Yes - Legal rep":
            // Original applicant ID: 1
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S2-Submitting an application - Tech Issues - Outside Uk - GWF number -Complaint on Behalf - No":
            // Original applicant ID: 2
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S3-Submitting an application - Tech Issues - In Uk - GWF number -Complaint on Behalf - No":
            // Original applicant ID: 3
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S4-Submitting an application - Tech Issues - Outside Uk - GWF number -Complaint on Behalf - Yes - friend":
            // Original applicant ID: 4
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S5-Submitting an application - Tech Issues - In Uk - HO number -Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 5
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S6-Submitting an application - Tech Issues - Outside Uk -HO number -Complaint on Behalf - No":
            // Original applicant ID: 6
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S7-Submitting an application - Tech Issues - In Uk HO number -Complaint on Behalf - No":
            // Original applicant ID: 7
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S8-Submitting an application - Tech Issues - Outside Uk - HO number -Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 8
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S9-Submitting an application - Tech Issues - In Uk - IHS number -Complaint on Behalf - Yes- expert support":
            // Original applicant ID: 9
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S10-Submitting an application - Tech Issues - Outside Uk -IHS number -Complaint on Behalf - No":
            // Original applicant ID: 10
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S11-Submitting an application - Tech Issues - In Uk - IHS number - Complaint on Behalf - No":
            // Original applicant ID: 11
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S12-Submitting an application - Tech Issues - Outside Uk- IHS number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 12
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S13-Submitting an application - Tech Issues - In Uk - Unique number -Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 13
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S14-Submitting an application - Tech Issues - Outside Uk - Unique number -Complaint on Behalf - No":
            // Original applicant ID: 14
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S15-Submitting an application - Tech Issues - In Uk - Unique number -Complaint on Behalf - No":
            // Original applicant ID: 15
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S16-Submitting an application - Tech Issues - Outside Uk - Unique number -Complaint on Behalf - Yes - friend":
            // Original applicant ID: 16
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S17-Submitting an application - Tech Issues - In Uk - Don't have -Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 17
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S18-Submitting an application - Tech Issues - Outside Uk - Don't have -Complaint on Behalf - No":
            // Original applicant ID: 18
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S19-Submitting an application - Tech Issues - In Uk - Don't have -Complaint on Behalf - No":
            // Original applicant ID: 19
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S20-Submitting an application - Tech Issues - Outside Uk - Don't have -Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 20
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(page, await pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S21-Submitting an application - Something else - HO number - Complaint on Behalf - Yes":
            // Original applicant ID: 21
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Something_Else);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S23-Submitting an application - Something else - IHS number -Complaint on Behalf - Yes":
            // Original applicant ID: 23
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Something_Else);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S24-Submitting an application - Something else - GWF number -Complaint on Behalf - No":
            // Original applicant ID: 24
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Something_Else);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S25-Submitting an application - Something else - Unique number -Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 25
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Something_Else);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S26-Submitting an application - Something else - Unique number -Complaint on Behalf - No":
            // Original applicant ID: 26
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Something_Else);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S27-Submitting an application - Something else - Don't have -Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 27
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Something_Else);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S28-Submitting an application - Something else - Don't have -Complaint on Behalf - No":
            // Original applicant ID: 28
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Something_Else);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S29-Submitting an application - Something else - GWF -Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 29
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(page, await pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
            await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Something_Else);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S30-Making an appointment - Difficult Getting Appointment - In Uk -GWF number -Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 30
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("Difficulty getting an appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfHardToGetAppointmentPage.assertPageTitle(page, await pages.ukvicIfHardToGetAppointmentPage.expectedPageTitle());
            await pages.ukvicIfHardToGetAppointmentPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfHardToGetAppointmentPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S31-Making an appointment - Difficult Getting Appointment - Outside Uk -GWF number -Complaint on Behalf - No":
            // Original applicant ID: 31
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("Difficulty getting an appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfCannotGetAppointmentOutsideUkPage.assertPageTitle(page, await pages.ukvicIfCannotGetAppointmentOutsideUkPage.expectedPageTitle());
            await pages.ukvicIfCannotGetAppointmentOutsideUkPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S32-Making an appointment - Difficult Getting Appointment - In Uk -GWF number - Complaint on Behalf - No":
            // Original applicant ID: 32
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("Difficulty getting an appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfHardToGetAppointmentPage.assertPageTitle(page, await pages.ukvicIfHardToGetAppointmentPage.expectedPageTitle());
            await pages.ukvicIfHardToGetAppointmentPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfHardToGetAppointmentPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S33-Making an appointment - Difficult Getting Appointment - Outside Uk -GWF number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 33
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("Difficulty getting an appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfCannotGetAppointmentOutsideUkPage.assertPageTitle(page, await pages.ukvicIfCannotGetAppointmentOutsideUkPage.expectedPageTitle());
            await pages.ukvicIfCannotGetAppointmentOutsideUkPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S34-Making an appointment - Difficult changing Appointment - In Uk - Unique number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 34
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("Difficulty changing an appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfWantToChangeYourAppointmentPage.assertPageTitle(page, await pages.ukvicIfWantToChangeYourAppointmentPage.expectedPageTitle());
            await pages.ukvicIfWantToChangeYourAppointmentPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfWantToChangeYourAppointmentPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S35-Making an appointment - Difficult changing Appointment - Outside -Unique number - Complaint on Behalf - No":
            // Original applicant ID: 35
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("Difficulty changing an appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfWantToChangeYourAppointmentPage.assertPageTitle(page, await pages.ukvicIfWantToChangeYourAppointmentPage.expectedPageTitle());
            await pages.ukvicIfWantToChangeYourAppointmentPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S36-Making an appointment - Difficult changing Appointment - In Uk -Unique number - Complaint on Behalf - No":
            // Original applicant ID: 36
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("Difficulty changing an appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfWantToChangeYourAppointmentPage.assertPageTitle(page, await pages.ukvicIfWantToChangeYourAppointmentPage.expectedPageTitle());
            await pages.ukvicIfWantToChangeYourAppointmentPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfWantToChangeYourAppointmentPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S37-Making an appointment - Difficult changing Appointment - Outside Uk -Unique number -Complaint on Behalf - Yes - friend":
            // Original applicant ID: 37
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("Difficulty changing an appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfWantToChangeYourAppointmentPage.assertPageTitle(page, await pages.ukvicIfWantToChangeYourAppointmentPage.expectedPageTitle());
            await pages.ukvicIfWantToChangeYourAppointmentPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S38-Making an appointment - Difficult Getting Appointment - In Uk -HO number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 38
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("Technical issues with booking an appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfThereWereTechIssuesBookingApmtPage.assertPageTitle(page, await pages.ukvicIfThereWereTechIssuesBookingApmtPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechIssuesBookingApmtPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechIssuesBookingApmtPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S39-Making an appointment - Difficult Getting Appointment - Outside Uk -HO number - Complaint on Behalf - No":
            // Original applicant ID: 39
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("Technical issues with booking an appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfThereWereTechIssuesBookingApmtPage.assertPageTitle(page, await pages.ukvicIfThereWereTechIssuesBookingApmtPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechIssuesBookingApmtPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechIssuesBookingApmtPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S40-Making an appointment - Difficult Getting Appointment - In Uk -HO number - Complaint on Behalf - No":
            // Original applicant ID: 40
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("Technical issues with booking an appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfThereWereTechIssuesBookingApmtPage.assertPageTitle(page, await pages.ukvicIfThereWereTechIssuesBookingApmtPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechIssuesBookingApmtPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechIssuesBookingApmtPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S41-Making an appointment - Difficult Getting Appointment - Outside Uk -HO number - Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 41
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("Technical issues with booking an appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfThereWereTechIssuesBookingApmtPage.assertPageTitle(page, await pages.ukvicIfThereWereTechIssuesBookingApmtPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechIssuesBookingApmtPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechIssuesBookingApmtPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S42-Making an appointment - Difficult Getting Appointment - In Uk -IHS number - Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 42
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("I have a question about my appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.assertPageTitle(page, await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.expectedPageTitle());
            await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S43-Making an appointment - Difficult Getting Appointment - Outside Uk -IHS number - Complaint on Behalf - No":
            // Original applicant ID: 43
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("I have a question about my appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.assertPageTitle(page, await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.expectedPageTitle());
            await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S44-Making an appointment - Difficult Getting Appointment - In Uk -IHS number - Complaint on Behalf - No":
            // Original applicant ID: 44
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("I have a question about my appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.assertPageTitle(page, await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.expectedPageTitle());
            await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S45-Making an appointment - Difficult Getting Appointment - Outside Uk -IHS number - Complaint on Behalf - Yes - friend":
            // Original applicant ID: 45
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("I have a question about my appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.assertPageTitle(page, await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.expectedPageTitle());
            await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S46-Making an appointment - Difficult Getting Appointment - In Uk -Don't have number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 46
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("Difficulty getting an appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfHardToGetAppointmentPage.assertPageTitle(page, await pages.ukvicIfHardToGetAppointmentPage.expectedPageTitle());
            await pages.ukvicIfHardToGetAppointmentPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfHardToGetAppointmentPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S47-Making an appointment - Difficult changing Appointment - Outside Uk -Don't have number - Complaint on Behalf - No":
            // Original applicant ID: 47
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("Difficulty changing an appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfWantToChangeYourAppointmentPage.assertPageTitle(page, await pages.ukvicIfWantToChangeYourAppointmentPage.expectedPageTitle());
            await pages.ukvicIfWantToChangeYourAppointmentPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S48-Making an appointment - Difficult Getting Appointment - In Uk -Don't have number - Complaint on Behalf - No":
            // Original applicant ID: 48
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("Technical issues with booking an appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfThereWereTechIssuesBookingApmtPage.assertPageTitle(page, await pages.ukvicIfThereWereTechIssuesBookingApmtPage.expectedPageTitle());
            await pages.ukvicIfThereWereTechIssuesBookingApmtPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfThereWereTechIssuesBookingApmtPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S49-Making an appointment - Difficult Getting Appointment - Outside Uk -Don't have number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 49
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(page, await pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
            await pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem("I have a question about my appointment");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.assertPageTitle(page, await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.expectedPageTitle());
            await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S50-Waiting for a decision - Decision on application - In Uk -GWF number -Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 50
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_InUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S51-Waiting for a decision - Decision on application - Outside Uk -GWF number -Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 51
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_OutsideUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S52-Waiting for a decision - Decision on application - In Uk -GWF number - Complaint on Behalf - No":
            // Original applicant ID: 52
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_InUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S53-Waiting for a decision - Decision on application - Outside Uk -GWF number - Complaint on Behalf - No":
            // Original applicant ID: 53
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_OutsideUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S54-Waiting for a decision - Decision on application - In Uk -GWF number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 54
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_InUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S55-Waiting for a decision - Decision on application - Outside Uk -Unique number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 55
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_OutsideUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S56-Waiting for a decision - Decision on application - In Uk -Unique number - Complaint on Behalf - No":
            // Original applicant ID: 56
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_InUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S57-Waiting for a decision - Decision on application - Outside Uk -Unique number - Complaint on Behalf -No":
            // Original applicant ID: 57
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_OutsideUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S58-Waiting for a decision - Decision on application - In Uk -Unique number - Complaint on Behalf - Yes - friend":
            // Original applicant ID: 58
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_InUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S59-Waiting for a decision - Decision on application - Outside Uk -HO number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 59
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_OutsideUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S60-Waiting for a decision - Decision on application - In Uk -HO number - Complaint on Behalf - No":
            // Original applicant ID: 60
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_InUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S61-Waiting for a decision - Decision on application - Outside Uk -HO number - Complaint on Behalf - No":
            // Original applicant ID: 61
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_OutsideUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S62-Waiting for a decision - Decision on application - In Uk -HO number - Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 62
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_InUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S63-Waiting for a decision - Decision on application - Outside Uk -IHS number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 63
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_OutsideUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S64-Waiting for a decision - Decision on application - In Uk -IHS number - Complaint on Behalf -No":
            // Original applicant ID: 64
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_InUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S65-Waiting for a decision - Decision on application - Outside Uk -IHS number - Complaint on Behalf -No":
            // Original applicant ID: 65
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_OutsideUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S66-Waiting for a decision - Decision on application - In Uk -IHS number - Complaint on Behalf - Yes - friend":
            // Original applicant ID: 66
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_InUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S67-Waiting for a decision - Decision on application - Outside Uk -Don't have number - Complaint on Behalf - Yes - Sponsor":
            // Original applicant ID: 67
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_OutsideUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S68-Waiting for a decision - Decision on application - In Uk -Don't have number - Complaint on Behalf - No":
            // Original applicant ID: 68
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_InUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S69-Waiting for a decision - Decision on application - Outside Uk -Don't have number - Complaint on Behalf - No":
            // Original applicant ID: 69
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_OutsideUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S70-Waiting for a decision - Decision on application - In Uk -Don't have number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 70
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(page, await pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
            await pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_InUk();
            await pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(page, await pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
            await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S71-Waiting for a decision - Return some docs - Online form -GWF number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 71
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("Yes, using the online form");
            await pages.ukvicIfYouAreWaitingForDocToBeReturnedPage.answerIfYouWaitingForDocsToBeReturned();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S72-Waiting for a decision - Return some docs - Online form -GWF number - Complaint on Behalf - No":
            // Original applicant ID: 72
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("Yes, using the online form");
            await pages.ukvicIfYouAreWaitingForDocToBeReturnedPage.answerIfYouWaitingForDocsToBeReturned();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S73-Waiting for a decision - Return some docs - Online form -Unique number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 73
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("Yes, using the online form");
            await pages.ukvicIfYouAreWaitingForDocToBeReturnedPage.answerIfYouWaitingForDocsToBeReturned();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S74-Waiting for a decision - Return some docs - Online form -Unique number - Complaint on Behalf - No":
            // Original applicant ID: 74
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("Yes, using the online form");
            await pages.ukvicIfYouAreWaitingForDocToBeReturnedPage.answerIfYouWaitingForDocsToBeReturned();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S75-Waiting for a decision - Return some docs - Online form -Unique number - Complaint on Behalf - Yes - friend":
            // Original applicant ID: 75
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("Yes, using the online form");
            await pages.ukvicIfYouAreWaitingForDocToBeReturnedPage.answerIfYouWaitingForDocsToBeReturned();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S76-Waiting for a decision - Return some docs - Online form -HO number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 76
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("Yes, using the online form");
            await pages.ukvicIfYouAreWaitingForDocToBeReturnedPage.answerIfYouWaitingForDocsToBeReturned();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S77-Waiting for a decision - Return some docs - Online form -HO number - Complaint on Behalf - No":
            // Original applicant ID: 77
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("Yes, using the online form");
            await pages.ukvicIfYouAreWaitingForDocToBeReturnedPage.answerIfYouWaitingForDocsToBeReturned();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S78-Waiting for a decision - Return some docs - Online form -HO number - Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 78
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("Yes, using the online form");
            await pages.ukvicIfYouAreWaitingForDocToBeReturnedPage.answerIfYouWaitingForDocsToBeReturned();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S79-Waiting for a decision - Return some docs - Online form -IHS number - Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 79
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("Yes, using the online form");
            await pages.ukvicIfYouAreWaitingForDocToBeReturnedPage.answerIfYouWaitingForDocsToBeReturned();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S80-Waiting for a decision - Return some docs - Online form -IHS number -Complaint on Behalf - No":
            // Original applicant ID: 80
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("Yes, using the online form");
            await pages.ukvicIfYouAreWaitingForDocToBeReturnedPage.answerIfYouWaitingForDocsToBeReturned();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S81-Waiting for a decision - Return some docs - Online form -IHS number - Complaint on Behalf - Yes -friend":
            // Original applicant ID: 81
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("Yes, using the online form");
            await pages.ukvicIfYouAreWaitingForDocToBeReturnedPage.answerIfYouWaitingForDocsToBeReturned();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S82-Waiting for a decision - Return some docs - Online form -Don't have number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 82
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("Yes, using the online form");
            await pages.ukvicIfYouAreWaitingForDocToBeReturnedPage.answerIfYouWaitingForDocsToBeReturned();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S83-Waiting for a decision - Return some docs - Online form -Don't have number - Complaint on Behalf - No":
            // Original applicant ID: 83
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("Yes, using the online form");
            await pages.ukvicIfYouAreWaitingForDocToBeReturnedPage.answerIfYouWaitingForDocsToBeReturned();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S84-Waiting for a decision - Return some docs - Online form -Don't have number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 84
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("Yes, using the online form");
            await pages.ukvicIfYouAreWaitingForDocToBeReturnedPage.answerIfYouWaitingForDocsToBeReturned();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S85-Waiting for a decision - Return some docs - another way -GWF number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 85
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("Yes, by phone, email or another way");
            await pages.ukvicIfYouHaveNotUsedOnlineServiceRequestPage.answerIfYouHaveNotUsedOnlineServiceRequest();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S86-Waiting for a decision - Return some docs - another way -GWF number - Complaint on Behalf - No":
            // Original applicant ID: 86
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("Yes, by phone, email or another way");
            await pages.ukvicIfYouHaveNotUsedOnlineServiceRequestPage.answerIfYouHaveNotUsedOnlineServiceRequest();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S87-Waiting for a decision - Return some docs - another way -HO number - Complaint on Behalf - No":
            // Original applicant ID: 87
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("Yes, by phone, email or another way");
            await pages.ukvicIfYouHaveNotUsedOnlineServiceRequestPage.answerIfYouHaveNotUsedOnlineServiceRequest();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S88-Waiting for a decision - Return some docs - another way -HO number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 88
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("Yes, by phone, email or another way");
            await pages.ukvicIfYouHaveNotUsedOnlineServiceRequestPage.answerIfYouHaveNotUsedOnlineServiceRequest();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S89-Waiting for a decision - Return some docs - No -IHS number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 89
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("No");
            await pages.ukvicIfYouHaveNotUsedOnlineServiceRequestPage.answerIfYouHaveNotUsedOnlineServiceRequest();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S90-Waiting for a decision - Return some docs - No -IHS number - Complaint on Behalf - No":
            // Original applicant ID: 90
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("No");
            await pages.ukvicIfYouHaveNotUsedOnlineServiceRequestPage.answerIfYouHaveNotUsedOnlineServiceRequest();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S91-Waiting for a decision - Return some docs - No -GWF number - Complaint on Behalf -No":
            // Original applicant ID: 91
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("No");
            await pages.ukvicIfYouHaveNotUsedOnlineServiceRequestPage.answerIfYouHaveNotUsedOnlineServiceRequest();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S92-Waiting for a decision - Return some docs - No -GWF number - Complaint on Behalf - Yes - friend":
            // Original applicant ID: 92
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
            await pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(page, await pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
            await pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse("No");
            await pages.ukvicIfYouHaveNotUsedOnlineServiceRequestPage.answerIfYouHaveNotUsedOnlineServiceRequest();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S93-A negative or positive decision - Negative - GWF number - Complaint on Behalf - No":
            // Original applicant ID: 93
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.NEGATIVE);
            await pages.ukvicIfYouHaveQuestionsAbtNegDecisionPage.answerIfYouHaveQuestionsAbtNegDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S94-A negative or positive decision - Negative -GWF number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 94
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.NEGATIVE);
            await pages.ukvicIfYouHaveQuestionsAbtNegDecisionPage.answerIfYouHaveQuestionsAbtNegDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S95-A negative or positive decision - Negative -Unique number -Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 95
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.NEGATIVE);
            await pages.ukvicIfYouHaveQuestionsAbtNegDecisionPage.answerIfYouHaveQuestionsAbtNegDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S96-A negative or positive decision - Negative -Unique number -Complaint on Behalf - No":
            // Original applicant ID: 96
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.NEGATIVE);
            await pages.ukvicIfYouHaveQuestionsAbtNegDecisionPage.answerIfYouHaveQuestionsAbtNegDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S97-A negative or positive decision - Negative - HO number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 97
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.NEGATIVE);
            await pages.ukvicIfYouHaveQuestionsAbtNegDecisionPage.answerIfYouHaveQuestionsAbtNegDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S98-A negative or positive decision - Negative -HO number - Complaint on Behalf - No":
            // Original applicant ID: 98
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.NEGATIVE);
            await pages.ukvicIfYouHaveQuestionsAbtNegDecisionPage.answerIfYouHaveQuestionsAbtNegDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S99-A negative or positive decision - Negative - IHS number - Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 99
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.NEGATIVE);
            await pages.ukvicIfYouHaveQuestionsAbtNegDecisionPage.answerIfYouHaveQuestionsAbtNegDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S100-A negative or positive decision - Negative -IHS number - Complaint on Behalf - No":
            // Original applicant ID: 100
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.NEGATIVE);
            await pages.ukvicIfYouHaveQuestionsAbtNegDecisionPage.answerIfYouHaveQuestionsAbtNegDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S101-A negative or positive decision - Negative - Don't have number - Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 101
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.NEGATIVE);
            await pages.ukvicIfYouHaveQuestionsAbtNegDecisionPage.answerIfYouHaveQuestionsAbtNegDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S102-A negative or positive decision - Negative - Don't have number - Complaint on Behalf - No":
            // Original applicant ID: 102
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.NEGATIVE);
            await pages.ukvicIfYouHaveQuestionsAbtNegDecisionPage.answerIfYouHaveQuestionsAbtNegDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S103-A negative or positive decision - Positive - In Uk - GWF number -Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 103
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S104-A negative or positive decision - Positive - Outside Uk - GWF number -Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 104
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S105-A negative or positive decision - Positive - In Uk - GWF number - Complaint on Behalf - No":
            // Original applicant ID: 105
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S106-A negative or positive decision - Positive - Outside Uk - GWF number - Complaint on Behalf - No":
            // Original applicant ID: 106
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S107-A negative or positive decision - Positive - In Uk - GWF number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 107
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S108-A negative or positive decision - Positive - Outside Uk - Unique number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 108
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S109-A negative or positive decision - Positive - In Uk - Unique number - Complaint on Behalf - No":
            // Original applicant ID: 109
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S110-A negative or positive decision - Positive - Outside Uk - Unique number - Complaint on Behalf - No":
            // Original applicant ID: 110
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S111-A negative or positive decision - Positive - In Uk - Unique number - Complaint on Behalf - Yes - friend":
            // Original applicant ID: 111
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S112-A negative or positive decision - Positive - Outside Uk - HO number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 112
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S113-A negative or positive decision - Positive - In Uk - HO number - Complaint on Behalf - No":
            // Original applicant ID: 113
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S114-A negative or positive decision - Positive - Outside Uk - HO number - Complaint on Behalf - No":
            // Original applicant ID: 114
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S115-A negative or positive decision - Positive - In Uk - HO number - Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 115
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S116-A negative or positive decision - Positive - Outside Uk - IHS number - Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 116
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S117-A negative or positive decision - Positive - In Uk - IHS number - Complaint on Behalf - No":
            // Original applicant ID: 117
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S118-A negative or positive decision - Positive - Outside Uk - IHS number - Complaint on Behalf - No":
            // Original applicant ID: 118
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S119-A negative or positive decision - Positive - In Uk - IHS number - Complaint on Behalf - Yes - friend":
            // Original applicant ID: 119
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S120-A negative or positive decision - Positive - Outside Uk - Don't have number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 120
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S121-A negative or positive decision - Positive - In Uk - Don't have number - Complaint on Behalf - No":
            // Original applicant ID: 121
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S122-A negative or positive decision - Positive - Outside Uk - GWF number - Complaint on Behalf - No":
            // Original applicant ID: 122
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S123-A negative or positive decision - Positive - In Uk - Don't have number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 123
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
            await pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(page, await pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
            await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(page, await pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
            await pages.ukvicWhereDidYouMakeTheApplicationPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.answerIfYouHaveQuestionsAbtPositiveDecision();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S124-BRP - Not arrived - GWF number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 124
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("It has not arrived");
            await pages.ukvicIfBRPCardHasNotArrivedPage.answerIfBRPHasNotArrived();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S125-BRP - Not arrived - GWF number - Complaint on Behalf - No":
            // Original applicant ID: 125
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("It has not arrived");
            await pages.ukvicIfBRPCardHasNotArrivedPage.answerIfBRPHasNotArrived();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S126-BRP - Not arrived - Unique number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 126
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("It has not arrived");
            await pages.ukvicIfBRPCardHasNotArrivedPage.answerIfBRPHasNotArrived();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S127-BRP - Not arrived - Unique number - Complaint on Behalf - No":
            // Original applicant ID: 127
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("It has not arrived");
            await pages.ukvicIfBRPCardHasNotArrivedPage.answerIfBRPHasNotArrived();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S128-BRP - Not arrived - HO number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 128
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("It has not arrived");
            await pages.ukvicIfBRPCardHasNotArrivedPage.answerIfBRPHasNotArrived();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S129-BRP - Not arrived - HO number - Complaint on Behalf - No":
            // Original applicant ID: 129
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("It has not arrived");
            await pages.ukvicIfBRPCardHasNotArrivedPage.answerIfBRPHasNotArrived();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S130-BRP - Not arrived - IHS number - Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 130
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("It has not arrived");
            await pages.ukvicIfBRPCardHasNotArrivedPage.answerIfBRPHasNotArrived();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S131-BRP - Not arrived - IHS number - Complaint on Behalf - No":
            // Original applicant ID: 131
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("It has not arrived");
            await pages.ukvicIfBRPCardHasNotArrivedPage.answerIfBRPHasNotArrived();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S132-BRP - Not arrived - IHS number -Complaint on Behalf - Yes -friend":
        case "S132-BRP - Not arrived - IHS number - Complaint on Behalf - Yes -friend":
            // Original applicant ID: 132
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("It has not arrived");
            await pages.ukvicIfBRPCardHasNotArrivedPage.answerIfBRPHasNotArrived();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S133-BRP - Incorrect - GWF number -Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 133
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("It is incorrect");
            await pages.ukvicIfBRPCardIsIncorrectPage.answerIfBRPIsIncorrect();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S135-BRP - Incorrect - Unique number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 135
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("It is incorrect");
            await pages.ukvicIfBRPCardIsIncorrectPage.answerIfBRPIsIncorrect();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S136-BRP - Incorrect - Unique number - Complaint on Behalf - No":
            // Original applicant ID: 136
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("It is incorrect");
            await pages.ukvicIfBRPCardIsIncorrectPage.answerIfBRPIsIncorrect();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S137-BRP - Incorrect - HO number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 137
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("It is incorrect");
            await pages.ukvicIfBRPCardIsIncorrectPage.answerIfBRPIsIncorrect();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S138-BRP - Incorrect - HO number - Complaint on Behalf - No":
            // Original applicant ID: 138
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("It is incorrect");
            await pages.ukvicIfBRPCardIsIncorrectPage.answerIfBRPIsIncorrect();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S139-BRP - Incorrect - IHS number - Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 139
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("It is incorrect");
            await pages.ukvicIfBRPCardIsIncorrectPage.answerIfBRPIsIncorrect();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S140-BRP - Incorrect - IHS number - Complaint on Behalf - No":
            // Original applicant ID: 140
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("It is incorrect");
            await pages.ukvicIfBRPCardIsIncorrectPage.answerIfBRPIsIncorrect();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S141-BRP - Incorrect - IHS number - Complaint on Behalf - Yes - friend":
            // Original applicant ID: 141
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("It is incorrect");
            await pages.ukvicIfBRPCardIsIncorrectPage.answerIfBRPIsIncorrect();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S142-BRP - Something else - GWF number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 142
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("Something else");
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S143-BRP - Something else - GWF number - Complaint on Behalf - No":
            // Original applicant ID: 143
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("Something else");
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S144-BRP - Something else - Unique number -Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 144
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("Something else");
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S145-BRP - Something else - Unique number - Complaint on Behalf - No":
            // Original applicant ID: 145
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("Something else");
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S146-BRP - Something else - HO number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 146
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("Something else");
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S147-BRP - Something else - HO number - Complaint on Behalf - No":
            // Original applicant ID: 147
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("Something else");
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S148-BRP - Something else - IHS number - Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 148
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("Something else");
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S149-BRP - Something else - IHS number - Complaint on Behalf - No":
            // Original applicant ID: 149
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("Something else");
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S150-BRP - Something else - IHS number - Complaint on Behalf - Yes - friend":
            // Original applicant ID: 150
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(page, await pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
            await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem("Something else");
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "Refunds - Yes- Less than 6wks":
            // Original applicant ID: 151
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Yes");
            await pages.ukvicWhenDidYouRequestRefundPage.assertPageTitle(page, await pages.ukvicWhenDidYouRequestRefundPage.expectedPageTitle());
            await pages.ukvicWhenDidYouRequestRefundPage.answerSelectResponse(c.Less_Than_6Wks);
            break;
        case "S152-Refunds - Yes- More than 6wks - HO number -Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 152
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Yes");
            await pages.ukvicWhenDidYouRequestRefundPage.assertPageTitle(page, await pages.ukvicWhenDidYouRequestRefundPage.expectedPageTitle());
            await pages.ukvicWhenDidYouRequestRefundPage.answerSelectResponse(c.More_Than_6Wks);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S153-Requested Refunds - Yes- More than 6wks - HO number - Complaint on Behalf - No":
            // Original applicant ID: 153
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Yes");
            await pages.ukvicWhenDidYouRequestRefundPage.assertPageTitle(page, await pages.ukvicWhenDidYouRequestRefundPage.expectedPageTitle());
            await pages.ukvicWhenDidYouRequestRefundPage.answerSelectResponse(c.More_Than_6Wks);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S154-Requested Refunds - Yes- More than 6wks - IHS number - Complaint on Behalf - Yes - friend":
            // Original applicant ID: 154
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Yes");
            await pages.ukvicWhenDidYouRequestRefundPage.assertPageTitle(page, await pages.ukvicWhenDidYouRequestRefundPage.expectedPageTitle());
            await pages.ukvicWhenDidYouRequestRefundPage.answerSelectResponse(c.More_Than_6Wks);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S155-Requested Refunds - Yes- More than 6wks - IHS number - Complaint on Behalf - No":
            // Original applicant ID: 155
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Yes");
            await pages.ukvicWhenDidYouRequestRefundPage.assertPageTitle(page, await pages.ukvicWhenDidYouRequestRefundPage.expectedPageTitle());
            await pages.ukvicWhenDidYouRequestRefundPage.answerSelectResponse(c.More_Than_6Wks);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S156-Requested Refunds - Yes- More than 6wks - GWF number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 156
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Yes");
            await pages.ukvicWhenDidYouRequestRefundPage.assertPageTitle(page, await pages.ukvicWhenDidYouRequestRefundPage.expectedPageTitle());
            await pages.ukvicWhenDidYouRequestRefundPage.answerSelectResponse(c.More_Than_6Wks);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S157-Requested Refunds - Yes- More than 6wks - Unique number - Complaint on Behalf - No":
            // Original applicant ID: 157
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Yes");
            await pages.ukvicWhenDidYouRequestRefundPage.assertPageTitle(page, await pages.ukvicWhenDidYouRequestRefundPage.expectedPageTitle());
            await pages.ukvicWhenDidYouRequestRefundPage.answerSelectResponse(c.More_Than_6Wks);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S158-Requested Refunds - Yes- More than 6wks - Don't have number - Complaint on Behalf - Yes -expert support":
            // Original applicant ID: 158
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Yes");
            await pages.ukvicWhenDidYouRequestRefundPage.assertPageTitle(page, await pages.ukvicWhenDidYouRequestRefundPage.expectedPageTitle());
            await pages.ukvicWhenDidYouRequestRefundPage.answerSelectResponse(c.More_Than_6Wks);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S159-Requested Refunds - Yes- More than 6wks - Don't have number - Complaint on Behalf - No":
            // Original applicant ID: 159
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Yes");
            await pages.ukvicWhenDidYouRequestRefundPage.assertPageTitle(page, await pages.ukvicWhenDidYouRequestRefundPage.expectedPageTitle());
            await pages.ukvicWhenDidYouRequestRefundPage.answerSelectResponse(c.More_Than_6Wks);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S160-Refunds - No- Standard fee":
            // Original applicant ID: 160
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Standard service fee");
            await pages.ukvicIfYouRequestStdServRefundPage.assertPageTitle(page, await pages.ukvicIfYouRequestStdServRefundPage.expectedPageTitle());
            await pages.ukvicIfYouRequestStdServRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S161-Refunds - No- Priority service - In the Uk - GWF number -Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 161
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Priority service fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouWantReqPriorityServRefundPage.assertPageTitle(page, await pages.ukvicIfYouWantReqPriorityServRefundPage.expectedPageTitle());
            await pages.ukvicIfYouWantReqPriorityServRefundPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouWantReqPriorityServRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S162-Refunds - No- Priority service - Outside the Uk - GWF number -Complaint on Behalf - No":
            // Original applicant ID: 162
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Priority service fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouWantReqPriorityServRefundPage.assertPageTitle(page, await pages.ukvicIfYouWantReqPriorityServRefundPage.expectedPageTitle());
            await pages.ukvicIfYouWantReqPriorityServRefundPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouWantReqPriorityServRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S163-Requested Refunds - No- Priority service - In the Uk - Unique number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 163
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Priority service fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouWantReqPriorityServRefundPage.assertPageTitle(page, await pages.ukvicIfYouWantReqPriorityServRefundPage.expectedPageTitle());
            await pages.ukvicIfYouWantReqPriorityServRefundPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouWantReqPriorityServRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S164-Requested Refunds - No- Priority service - Outside the Uk - Unique number - Complaint on Behalf - No":
            // Original applicant ID: 164
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Priority service fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouWantReqPriorityServRefundPage.assertPageTitle(page, await pages.ukvicIfYouWantReqPriorityServRefundPage.expectedPageTitle());
            await pages.ukvicIfYouWantReqPriorityServRefundPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouWantReqPriorityServRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S165-Requested Refunds - No- Priority service - In the Uk - HO number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 165
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Priority service fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouWantReqPriorityServRefundPage.assertPageTitle(page, await pages.ukvicIfYouWantReqPriorityServRefundPage.expectedPageTitle());
            await pages.ukvicIfYouWantReqPriorityServRefundPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouWantReqPriorityServRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S166-Requested Refunds - No- Priority service - Outside the Uk - HO number - Complaint on Behalf - No":
            // Original applicant ID: 166
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Priority service fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouWantReqPriorityServRefundPage.assertPageTitle(page, await pages.ukvicIfYouWantReqPriorityServRefundPage.expectedPageTitle());
            await pages.ukvicIfYouWantReqPriorityServRefundPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouWantReqPriorityServRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S167-Requested Refunds - No- Priority service - In the Uk - Don't have number - Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 167
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Priority service fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouWantReqPriorityServRefundPage.assertPageTitle(page, await pages.ukvicIfYouWantReqPriorityServRefundPage.expectedPageTitle());
            await pages.ukvicIfYouWantReqPriorityServRefundPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouWantReqPriorityServRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S168-Requested Refunds - No- Priority service - Outside the Uk - IHS number - Complaint on Behalf - No":
            // Original applicant ID: 168
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Priority service fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouWantReqPriorityServRefundPage.assertPageTitle(page, await pages.ukvicIfYouWantReqPriorityServRefundPage.expectedPageTitle());
            await pages.ukvicIfYouWantReqPriorityServRefundPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouWantReqPriorityServRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S169-Requested Refunds - No- Super Priority service - In the Uk - Don't have number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 169
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Super priority service fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.assertPageTitle(page, await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.expectedPageTitle());
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S170-Requested Refunds - No- Super Priority service - Outside the Uk - Don't have number - Complaint on Behalf - No":
            // Original applicant ID: 170
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Super priority service fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.assertPageTitle(page, await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.expectedPageTitle());
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S171-Requested Refunds - No- Super Priority service - In the Uk - Unique number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 171
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Super priority service fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.assertPageTitle(page, await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.expectedPageTitle());
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S172-Requested Refunds - No- Super Priority service - Outside the Uk - Unique number - Complaint on Behalf - No":
            // Original applicant ID: 172
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Super priority service fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.assertPageTitle(page, await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.expectedPageTitle());
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S173-Requested Refunds - No- Super Priority service - In the Uk - HO number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 173
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Super priority service fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.assertPageTitle(page, await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.expectedPageTitle());
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S174-Requested Refunds - No- Super Priority service - Outside the Uk - HO number - Complaint on Behalf - No":
            // Original applicant ID: 174
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Super priority service fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.assertPageTitle(page, await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.expectedPageTitle());
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S175-Requested Refunds - No- Super Priority service - In the Uk - IHS number - Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 175
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Super priority service fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.assertPageTitle(page, await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.expectedPageTitle());
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S176-Requested Refunds - No- Super Priority service - Outside the Uk - IHS number - Complaint on Behalf - No":
            // Original applicant ID: 176
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Super priority service fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.assertPageTitle(page, await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.expectedPageTitle());
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S177-Requested Refunds - No- Super Priority service - In the Uk - GWF number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 177
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Super priority service fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.assertPageTitle(page, await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.expectedPageTitle());
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S178-Requested Refunds - No- Super Priority service - Outside the Uk - GWF number - Complaint on Behalf - No":
            // Original applicant ID: 178
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Super priority service fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.assertPageTitle(page, await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.expectedPageTitle());
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.checkExternalLinkWorksOnPage();
            await pages.ukvicIfYouWantReqSuperPriorityServRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S179-Requested Refunds - No- Added value service - GWF number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 179
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Added value service fee");
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.assertPageTitle(page, await pages.ukvicIfYouRequestAddedValueServiceRefundPage.expectedPageTitle());
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S180-Requested Refunds - No- Added value service - Don't have number - Complaint on Behalf - No":
            // Original applicant ID: 180
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Added value service fee");
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.assertPageTitle(page, await pages.ukvicIfYouRequestAddedValueServiceRefundPage.expectedPageTitle());
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S181-Requested Refunds - No- Added value service - Unique number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 181
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Added value service fee");
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.assertPageTitle(page, await pages.ukvicIfYouRequestAddedValueServiceRefundPage.expectedPageTitle());
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S182-Requested Refunds - No- Added value service - Unique number - Complaint on Behalf - No":
            // Original applicant ID: 182
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Added value service fee");
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.assertPageTitle(page, await pages.ukvicIfYouRequestAddedValueServiceRefundPage.expectedPageTitle());
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S183-Requested Refunds - No- Added value service - HO number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 183
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Added value service fee");
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.assertPageTitle(page, await pages.ukvicIfYouRequestAddedValueServiceRefundPage.expectedPageTitle());
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S184-Requested Refunds - No- Added value service - HO number - Complaint on Behalf - No":
            // Original applicant ID: 184
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Added value service fee");
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.assertPageTitle(page, await pages.ukvicIfYouRequestAddedValueServiceRefundPage.expectedPageTitle());
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S185-Requested Refunds - No- Added value service - IHS number - Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 185
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Added value service fee");
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.assertPageTitle(page, await pages.ukvicIfYouRequestAddedValueServiceRefundPage.expectedPageTitle());
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S186-Requested Refunds - No- Added value service - IHS number - Complaint on Behalf - No":
            // Original applicant ID: 186
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Added value service fee");
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.assertPageTitle(page, await pages.ukvicIfYouRequestAddedValueServiceRefundPage.expectedPageTitle());
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S187-Requested Refunds - No- Added value service - GWF number - Complaint on Behalf - Yes - friend":
            // Original applicant ID: 187
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Added value service fee");
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.assertPageTitle(page, await pages.ukvicIfYouRequestAddedValueServiceRefundPage.expectedPageTitle());
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S188-Requested Refunds - No- Added value service - GWF number - Complaint on Behalf - No":
            // Original applicant ID: 188
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Added value service fee");
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.assertPageTitle(page, await pages.ukvicIfYouRequestAddedValueServiceRefundPage.expectedPageTitle());
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfYouRequestAddedValueServiceRefundPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S189-Requested Refunds - No -IHS service - In the Uk - GWF number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 189
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Immigration Health Surcharge (IHS) fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S190-Requested Refunds - No - IHS service - Outside the Uk - Don't have number - Complaint on Behalf - No":
            // Original applicant ID: 190
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Immigration Health Surcharge (IHS) fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S191-Refunds - No - IHS service - In the Uk - Unique number -Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 191
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Immigration Health Surcharge (IHS) fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S192-Refunds - No-  IHS service - Outside the Uk - Unique number -Complaint on Behalf - No":
            // Original applicant ID: 192
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Immigration Health Surcharge (IHS) fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S193-Requested Refunds - No - IHS service - In the Uk - HO number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 193
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Immigration Health Surcharge (IHS) fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S194-Requested Refunds - No - IHS service - Outside the Uk - HO number - Complaint on Behalf - No":
            // Original applicant ID: 194
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Immigration Health Surcharge (IHS) fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S195-Requested Refunds - No - IHS service - In the Uk - IHS number - Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 195
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Immigration Health Surcharge (IHS) fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S196-Requested Refunds - No - IHS service - Outside the Uk - IHS number - Complaint on Behalf - No":
            // Original applicant ID: 196
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Immigration Health Surcharge (IHS) fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S197-Requested Refunds - No - IHS service - In the Uk - GWF number - Complaint on Behalf - Yes - friend":
            // Original applicant ID: 197
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Immigration Health Surcharge (IHS) fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S198-Requested Refunds - No - IHS service - Outside the Uk - GWF number - Complaint on Behalf - No":
            // Original applicant ID: 198
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("Immigration Health Surcharge (IHS) fee");
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S199-Requested Refunds - No - EU Scheme service - GWF number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 199
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("EU Settlement Scheme fee");
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.assertPageTitle(page, await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.expectedPageTitle());
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.SelectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S200-Requested Refunds - No -  EU Scheme service - Don't have number - Complaint on Behalf - No":
            // Original applicant ID: 200
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("EU Settlement Scheme fee");
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.assertPageTitle(page, await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.expectedPageTitle());
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.SelectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S201-Requested Refunds - No - EU Scheme service - Unique number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 201
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("EU Settlement Scheme fee");
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.assertPageTitle(page, await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.expectedPageTitle());
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.SelectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S202-Requested Refunds - No - EU Scheme service - Unique number - Complaint on Behalf - No":
            // Original applicant ID: 202
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("EU Settlement Scheme fee");
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.assertPageTitle(page, await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.expectedPageTitle());
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.SelectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S203-Requested Refunds - No - EU Scheme service - HO number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 203
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("EU Settlement Scheme fee");
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.assertPageTitle(page, await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.expectedPageTitle());
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.SelectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S204-Requested Refunds - No - EU Scheme service - HO number - Complaint on Behalf - No":
            // Original applicant ID: 204
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("EU Settlement Scheme fee");
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.assertPageTitle(page, await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.expectedPageTitle());
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.SelectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S205-Requested Refunds - No - EU Scheme service - IHS number - Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 205
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("EU Settlement Scheme fee");
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.assertPageTitle(page, await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.expectedPageTitle());
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.SelectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S206-Requested Refunds - No - EU Scheme service - IHS number - Complaint on Behalf - No":
            // Original applicant ID: 206
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("EU Settlement Scheme fee");
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.assertPageTitle(page, await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.expectedPageTitle());
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.SelectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S207-Requested Refunds - No - EU Scheme service - GWF number - Complaint on Behalf - Yes - friend":
            // Original applicant ID: 207
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("EU Settlement Scheme fee");
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.assertPageTitle(page, await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.expectedPageTitle());
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.SelectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S208-Requested Refunds - No - EU Scheme service - GWF number - Complaint on Behalf - No":
            // Original applicant ID: 208
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("No");
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(page, await pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
            await pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType("EU Settlement Scheme fee");
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.assertPageTitle(page, await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.expectedPageTitle());
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.SelectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S209-Requested Refunds - Not yet - HIS service - In the Uk - GWF number - Complaint on Behalf - Yes -legal rep":
            // Original applicant ID: 209
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Not yet");
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.IHS_SERVICE_FEE);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S210-Requested Refunds - Not yet - HIS service - Outside Uk - Don't have number - Complaint on Behalf -No":
            // Original applicant ID: 210
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Not yet");
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.IHS_SERVICE_FEE);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S211-Requested Refunds - Not yet - HIS service - In the Uk - Unique number - Complaint on Behalf - Yes -legal rep":
            // Original applicant ID: 211
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Not yet");
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.IHS_SERVICE_FEE);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S212-Requested Refunds - Not yet - HIS service - Outside Uk - Unique number - Complaint on Behalf -No":
            // Original applicant ID: 212
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Not yet");
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.IHS_SERVICE_FEE);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S213-Requested Refunds - Not yet - HIS service - In the Uk - HO number - Complaint on Behalf - Yes -sponsor":
            // Original applicant ID: 213
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Not yet");
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.IHS_SERVICE_FEE);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S214-Requested Refunds - Not yet - HIS service - Outside Uk - HO number - Complaint on Behalf -No":
            // Original applicant ID: 214
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Not yet");
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.IHS_SERVICE_FEE);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S215-Requested Refunds - Not yet - HIS service - In the Uk - IHS number - Complaint on Behalf - Yes -expert support":
            // Original applicant ID: 215
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Not yet");
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.IHS_SERVICE_FEE);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S216-Requested Refunds - Not yet - HIS service - Outside Uk - IHS number - Complaint on Behalf -No":
            // Original applicant ID: 216
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Not yet");
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.IHS_SERVICE_FEE);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S217-Requested Refunds - Not yet - HIS service - In the Uk - GWF number - Complaint on Behalf - Yes  friend":
            // Original applicant ID: 217
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Not yet");
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.IHS_SERVICE_FEE);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S218-Requested Refunds - Not yet - HIS service - Outside Uk - GWF number - Complaint on Behalf -No":
            // Original applicant ID: 218
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Not yet");
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.IHS_SERVICE_FEE);
            await pages.ukvicWhereDidYouApplyPage.assertPageTitle(page, await pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
            await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(page, await pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S219-Requested Refunds - Not yet - EU scheme - GWF number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 219
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Not yet");
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.EU_SETTLEMENT_SCHEME_FEE);
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.assertPageTitle(page, await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.expectedPageTitle());
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.SelectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S220-Requested Refunds - Not yet - EU scheme - Don't have number - Complaint on Behalf - No":
            // Original applicant ID: 220
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Not yet");
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.EU_SETTLEMENT_SCHEME_FEE);
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.assertPageTitle(page, await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.expectedPageTitle());
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.SelectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S221-Requested Refunds - Not yet - EU scheme - Unique number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 221
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Not yet");
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.EU_SETTLEMENT_SCHEME_FEE);
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.assertPageTitle(page, await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.expectedPageTitle());
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.SelectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S222-Requested Refunds - Not yet - EU scheme - Unique number - Complaint on Behalf - No":
            // Original applicant ID: 222
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Not yet");
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.EU_SETTLEMENT_SCHEME_FEE);
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.assertPageTitle(page, await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.expectedPageTitle());
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.SelectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S223-Requested Refunds - Not yet - EU scheme - HO number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 223
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Not yet");
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.EU_SETTLEMENT_SCHEME_FEE);
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.assertPageTitle(page, await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.expectedPageTitle());
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.SelectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S224-Requested Refunds - Not yet - EU scheme - HO number - Complaint on Behalf - No":
            // Original applicant ID: 224
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Not yet");
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.EU_SETTLEMENT_SCHEME_FEE);
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.assertPageTitle(page, await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.expectedPageTitle());
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.SelectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S225-Refunds - Not yet - EU scheme - IHS number -Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 225
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Not yet");
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.EU_SETTLEMENT_SCHEME_FEE);
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.assertPageTitle(page, await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.expectedPageTitle());
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.SelectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S226-Refunds - Not yet - EU scheme - IHS number -Complaint on Behalf - No":
            // Original applicant ID: 226
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
            await pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(page, await pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
            await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse("Not yet");
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.assertPageTitle(page, await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.expectedPageTitle());
            await pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.EU_SETTLEMENT_SCHEME_FEE);
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.assertPageTitle(page, await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.expectedPageTitle());
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.checkExternalLinksAreWorkingOnPage();
            await pages.ukvicIfWaitingForEUSchemeFeeRefundPage.SelectContinueMakingComplaint();
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S227-Staff Behaviour - In person - Outside Uk - GWF number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 227
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In person");
            await pages.ukvicWhereDidTheIncidentHappenPage.assertPageTitle(page, await pages.ukvicWhereDidTheIncidentHappenPage.expectedPageTitle());
            await pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace("Outside the UK, at a visa application centre");
            await pages.ukvicWhereIsTheVisaApplyCentrePage.answerWhereIsTheVisaApplyCentre(c.OVERSEAS_COUNTRY, c.CITY);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S228-Staff Behaviour - In person - Outside Uk - Don't have number - Complaint on Behalf - No":
            // Original applicant ID: 228
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In person");
            await pages.ukvicWhereDidTheIncidentHappenPage.assertPageTitle(page, await pages.ukvicWhereDidTheIncidentHappenPage.expectedPageTitle());
            await pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace("Outside the UK, at a visa application centre");
            await pages.ukvicWhereIsTheVisaApplyCentrePage.answerWhereIsTheVisaApplyCentre(c.OVERSEAS_COUNTRY, c.CITY);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S229-Staff Behaviour - In person - Outside Uk - Unique number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 229
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In person");
            await pages.ukvicWhereDidTheIncidentHappenPage.assertPageTitle(page, await pages.ukvicWhereDidTheIncidentHappenPage.expectedPageTitle());
            await pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace("Outside the UK, at a visa application centre");
            await pages.ukvicWhereIsTheVisaApplyCentrePage.answerWhereIsTheVisaApplyCentre(c.OVERSEAS_COUNTRY, c.CITY);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S230-Staff Behaviour - In person - Outside Uk - Unique number - Complaint on Behalf - No":
            // Original applicant ID: 230
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In person");
            await pages.ukvicWhereDidTheIncidentHappenPage.assertPageTitle(page, await pages.ukvicWhereDidTheIncidentHappenPage.expectedPageTitle());
            await pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace("Outside the UK, at a visa application centre");
            await pages.ukvicWhereIsTheVisaApplyCentrePage.answerWhereIsTheVisaApplyCentre(c.OVERSEAS_COUNTRY, c.CITY);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S231-Staff Behaviour - In person - Outside Uk - HO number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 231
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In person");
            await pages.ukvicWhereDidTheIncidentHappenPage.assertPageTitle(page, await pages.ukvicWhereDidTheIncidentHappenPage.expectedPageTitle());
            await pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace("Outside the UK, at a visa application centre");
            await pages.ukvicWhereIsTheVisaApplyCentrePage.answerWhereIsTheVisaApplyCentre(c.OVERSEAS_COUNTRY, c.CITY);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S232-Staff Behaviour - In person - Outside Uk - HO number - Complaint on Behalf - No":
            // Original applicant ID: 232
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In person");
            await pages.ukvicWhereDidTheIncidentHappenPage.assertPageTitle(page, await pages.ukvicWhereDidTheIncidentHappenPage.expectedPageTitle());
            await pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace("Outside the UK, at a visa application centre");
            await pages.ukvicWhereIsTheVisaApplyCentrePage.answerWhereIsTheVisaApplyCentre(c.OVERSEAS_COUNTRY, c.CITY);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S233-Staff Behaviour - In person - Outside Uk - IHS number -Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 233
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In person");
            await pages.ukvicWhereDidTheIncidentHappenPage.assertPageTitle(page, await pages.ukvicWhereDidTheIncidentHappenPage.expectedPageTitle());
            await pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace("In the UK, at a service support centre");
            await pages.ukvicWhereInUkIsServiceSupportCentrePage.answerWhereInUkIsTheServiceSupportCentre(c.CITY);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S234-Staff Behaviour - In person - Outside Uk - IHS number -Complaint on Behalf - No":
            // Original applicant ID: 234
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In person");
            await pages.ukvicWhereDidTheIncidentHappenPage.assertPageTitle(page, await pages.ukvicWhereDidTheIncidentHappenPage.expectedPageTitle());
            await pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace("In the UK, at a service support centre");
            await pages.ukvicWhereInUkIsServiceSupportCentrePage.answerWhereInUkIsTheServiceSupportCentre(c.CITY);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S235-Staff Behaviour - In person - In the Uk - GWF number - Complaint on Behalf - Yes - friend":
            // Original applicant ID: 235
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In person");
            await pages.ukvicWhereDidTheIncidentHappenPage.assertPageTitle(page, await pages.ukvicWhereDidTheIncidentHappenPage.expectedPageTitle());
            await pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace("In the UK, at a service support centre");
            await pages.ukvicWhereInUkIsServiceSupportCentrePage.answerWhereInUkIsTheServiceSupportCentre(c.CITY);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S236-Staff Behaviour - In person - In the Uk - GWF number - Complaint on Behalf - No":
            // Original applicant ID: 236
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In person");
            await pages.ukvicWhereDidTheIncidentHappenPage.assertPageTitle(page, await pages.ukvicWhereDidTheIncidentHappenPage.expectedPageTitle());
            await pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace("In the UK, at a service support centre");
            await pages.ukvicWhereInUkIsServiceSupportCentrePage.answerWhereInUkIsTheServiceSupportCentre(c.CITY);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S237-Staff Behaviour - In person - In the Uk - GWF number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 237
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In person");
            await pages.ukvicWhereDidTheIncidentHappenPage.assertPageTitle(page, await pages.ukvicWhereDidTheIncidentHappenPage.expectedPageTitle());
            await pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace("In the UK, at a service support centre");
            await pages.ukvicWhereInUkIsServiceSupportCentrePage.answerWhereInUkIsTheServiceSupportCentre(c.CITY);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S238-Staff Behaviour - In person - In the Uk - Don't have number - Complaint on Behalf - No":
            // Original applicant ID: 238
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In person");
            await pages.ukvicWhereDidTheIncidentHappenPage.assertPageTitle(page, await pages.ukvicWhereDidTheIncidentHappenPage.expectedPageTitle());
            await pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace("In the UK, at a service support centre");
            await pages.ukvicWhereInUkIsServiceSupportCentrePage.answerWhereInUkIsTheServiceSupportCentre(c.CITY);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S239-Staff Behaviour - In person - In the Uk - Unique number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 239
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In person");
            await pages.ukvicWhereDidTheIncidentHappenPage.assertPageTitle(page, await pages.ukvicWhereDidTheIncidentHappenPage.expectedPageTitle());
            await pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace("In the UK, at a visa and citizenship application service point");
            await pages.ukvicWhereInUkIsServicePointPage.answerWhereInUkIsTheServicePoint(c.CITY);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S240-Staff Behaviour - In person - In the Uk - Unique number - Complaint on Behalf - No":
            // Original applicant ID: 240
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In person");
            await pages.ukvicWhereDidTheIncidentHappenPage.assertPageTitle(page, await pages.ukvicWhereDidTheIncidentHappenPage.expectedPageTitle());
            await pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace("In the UK, at a visa and citizenship application service point");
            await pages.ukvicWhereInUkIsServicePointPage.answerWhereInUkIsTheServicePoint(c.CITY);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S241-Staff Behaviour - In person - In the Uk - HO number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 241
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In person");
            await pages.ukvicWhereDidTheIncidentHappenPage.assertPageTitle(page, await pages.ukvicWhereDidTheIncidentHappenPage.expectedPageTitle());
            await pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace("In the UK, at a visa and citizenship application service point");
            await pages.ukvicWhereInUkIsServicePointPage.answerWhereInUkIsTheServicePoint(c.CITY);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S242-Staff Behaviour - In person - In the Uk - HO number - Complaint on Behalf - No":
            // Original applicant ID: 242
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In person");
            await pages.ukvicWhereDidTheIncidentHappenPage.assertPageTitle(page, await pages.ukvicWhereDidTheIncidentHappenPage.expectedPageTitle());
            await pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace("In the UK, at a visa and citizenship application service point");
            await pages.ukvicWhereInUkIsServicePointPage.answerWhereInUkIsTheServicePoint(c.CITY);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S243-Staff Behaviour - In person - In the Uk - IHS number - Complaint on Behalf - Yes -expert support":
            // Original applicant ID: 243
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In person");
            await pages.ukvicWhereDidTheIncidentHappenPage.assertPageTitle(page, await pages.ukvicWhereDidTheIncidentHappenPage.expectedPageTitle());
            await pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace("In the UK, at a visa and citizenship application service point");
            await pages.ukvicWhereInUkIsServicePointPage.answerWhereInUkIsTheServicePoint(c.CITY);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S244-Staff Behaviour - In person - In the Uk - GWF number - Complaint on Behalf - No":
            // Original applicant ID: 244
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In person");
            await pages.ukvicWhereDidTheIncidentHappenPage.assertPageTitle(page, await pages.ukvicWhereDidTheIncidentHappenPage.expectedPageTitle());
            await pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace("In the UK, at a visa and citizenship application service point");
            await pages.ukvicWhereInUkIsServicePointPage.answerWhereInUkIsTheServicePoint(c.CITY);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S245-Staff Behaviour -On the phone - GWF number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 245
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("On the phone");
            await pages.ukvicWhatTelephoneNumWasCalledPage.answerWhatTelephoneNumWasCalled(c.TELEPHONE);
            await pages.ukvicWhenWasTheCallPage.answerWhenWasTheCallMade(c.CALL_DATE, c.CALL_TIME);
            await pages.ukvicWhatNumbWasTheCallMadeFromPage.answerWhatNumbWasCallMadeFrom(c.TELEPHONE);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S246-Staff Behaviour - On the phone - Don't have number - Complaint on Behalf - No":
            // Original applicant ID: 246
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("On the phone");
            await pages.ukvicWhatTelephoneNumWasCalledPage.answerWhatTelephoneNumWasCalled(c.TELEPHONE);
            await pages.ukvicWhenWasTheCallPage.answerWhenWasTheCallMade(c.CALL_DATE, c.CALL_TIME);
            await pages.ukvicWhatNumbWasTheCallMadeFromPage.answerWhatNumbWasCallMadeFrom(c.TELEPHONE);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S247-Staff Behaviour -On the phone -Unique number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 247
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("On the phone");
            await pages.ukvicWhatTelephoneNumWasCalledPage.answerWhatTelephoneNumWasCalled(c.TELEPHONE);
            await pages.ukvicWhenWasTheCallPage.answerWhenWasTheCallMade(c.CALL_DATE, c.CALL_TIME);
            await pages.ukvicWhatNumbWasTheCallMadeFromPage.answerWhatNumbWasCallMadeFrom(c.TELEPHONE);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S248-Staff Behaviour - On the phone - Unique number - Complaint on Behalf - No":
            // Original applicant ID: 248
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("On the phone");
            await pages.ukvicWhatTelephoneNumWasCalledPage.answerWhatTelephoneNumWasCalled(c.TELEPHONE);
            await pages.ukvicWhenWasTheCallPage.answerWhenWasTheCallMade(c.CALL_DATE, c.CALL_TIME);
            await pages.ukvicWhatNumbWasTheCallMadeFromPage.answerWhatNumbWasCallMadeFrom(c.TELEPHONE);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S249-Staff Behaviour -On the phone - HO number - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 249
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("On the phone");
            await pages.ukvicWhatTelephoneNumWasCalledPage.answerWhatTelephoneNumWasCalled(c.TELEPHONE);
            await pages.ukvicWhenWasTheCallPage.answerWhenWasTheCallMade(c.CALL_DATE, c.CALL_TIME);
            await pages.ukvicWhatNumbWasTheCallMadeFromPage.answerWhatNumbWasCallMadeFrom(c.TELEPHONE);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S250-Staff Behaviour - On the phone - HO number - Complaint on Behalf - No":
            // Original applicant ID: 250
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("On the phone");
            await pages.ukvicWhatTelephoneNumWasCalledPage.answerWhatTelephoneNumWasCalled(c.TELEPHONE);
            await pages.ukvicWhenWasTheCallPage.answerWhenWasTheCallMade(c.CALL_DATE, c.CALL_TIME);
            await pages.ukvicWhatNumbWasTheCallMadeFromPage.answerWhatNumbWasCallMadeFrom(c.TELEPHONE);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S251-Staff Behaviour - In a letter or email - Unique number - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 251
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In a letter or email");
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S252-Staff Behaviour - In a letter or email - Unique number - Complaint on Behalf - No":
            // Original applicant ID: 252
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In a letter or email");
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S253-Staff Behaviour - In a letter or email - HO number -Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 253
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In a letter or email");
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S254-Staff Behaviour - In a letter or email - HO number - Complaint on Behalf - No":
            // Original applicant ID: 254
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In a letter or email");
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S255-Staff Behaviour - In a letter or email - IHS number - Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 255
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In a letter or email");
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S256-Staff Behaviour - In a letter or email - IHS number - Complaint on Behalf - No":
            // Original applicant ID: 256
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(page, await pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
            await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen("In a letter or email");
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S257-Existing complaint -Have ref numb -Complaint on Behalf -No":
            // Original applicant ID: 257
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
            await pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(page, await pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
            await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourComplaintRefNoPage.answerWhatIsTheRefNumForYourComplaint(c.REF_NUMBER);
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(page, await pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint("Submitting an application");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S258-Existing complaint -No ref Numb - Submit application - complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 258
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
            await pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(page, await pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
            await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_NO);
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(page, await pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint("Submitting an application");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S259-Existing complaint -No ref Numb - Submit application- complaint on Behalf - No":
            // Original applicant ID: 259
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
            await pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(page, await pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
            await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_NO);
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(page, await pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint("Submitting an application");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S260-Existing complaint -No ref Numb - making apptmt - Complaint on Behalf - Yes - friend":
            // Original applicant ID: 260
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
            await pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(page, await pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
            await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_NO);
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(page, await pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint("Making an appointment");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S261-Existing complaint -No ref Numb - making appmt - complaint on Behalf - No":
            // Original applicant ID: 261
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
            await pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(page, await pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
            await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_NO);
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(page, await pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint("Making an appointment");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S262-Existing complaint -No ref Numb - waiting for decision- Complaint on Behalf - Yes -sponsor":
            // Original applicant ID: 262
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
            await pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(page, await pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
            await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_NO);
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(page, await pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint("Waiting for a decision or documents");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S263-Existing complaint -No ref Numb - waiting for decision- complaint on Behalf - No":
            // Original applicant ID: 263
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
            await pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(page, await pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
            await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_NO);
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(page, await pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint("Waiting for a decision or documents");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S264-Existing complaint -No ref Numb - negative or positive decision- complaint on Behalf - Yes - expert support":
            // Original applicant ID: 264
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
            await pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(page, await pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
            await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_NO);
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(page, await pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint("A negative or positive decision");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S265-Existing complaint -No ref Numb - negative or positive decision- complaint on Behalf - No":
            // Original applicant ID: 265
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
            await pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(page, await pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
            await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_NO);
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(page, await pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint("A negative or positive decision");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S266-Existing complaint -No ref Numb - Immigration status change- complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 266
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
            await pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(page, await pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
            await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_NO);
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(page, await pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint("Immigration status change");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S267-Existing complaint -No ref Numb - Immigration status change- complaint on Behalf - No":
            // Original applicant ID: 267
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
            await pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(page, await pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
            await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_NO);
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(page, await pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint("Immigration status change");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S268-Existing complaint -No ref Numb - BRP - Complaint on Behalf - Yes - friend":
            // Original applicant ID: 268
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
            await pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(page, await pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
            await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_NO);
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(page, await pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint("Biometric residence permits (BRPs)");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S269-Existing complaint -No ref Numb - BRP - Complaint on Behalf -No":
            // Original applicant ID: 269
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
            await pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(page, await pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
            await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_NO);
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(page, await pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint("Biometric residence permits (BRPs)");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S270-Existing complaint -No ref Numb -refunds - Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 270
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
            await pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(page, await pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
            await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_NO);
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(page, await pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint("Refunds");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S271-Existing complaint -No ref Numb -refunds - Complaint on Behalf - No":
            // Original applicant ID: 271
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
            await pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(page, await pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
            await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_NO);
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(page, await pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint("Refunds");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S272-Existing complaint -No ref Numb - Staff behaviour- Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 272
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
            await pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(page, await pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
            await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_NO);
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(page, await pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint("Staff behaviour");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S273-Existing complaint -No ref Numb - Staff behaviour- Complaint on Behalf - No":
            // Original applicant ID: 273
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
            await pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(page, await pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
            await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_NO);
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(page, await pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint("Staff behaviour");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S274-Existing complaint -No ref Numb - something else - Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 274
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
            await pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(page, await pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
            await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_NO);
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(page, await pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint("Something else");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S275-Existing complaint -No ref Numb - something else - Complaint on Behalf - No":
            // Original applicant ID: 275
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
            await pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(page, await pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
            await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_NO);
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(page, await pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
            await pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint("Something else");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S276-Something else -GWF number -Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 276
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Something_Else);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a legal representative");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S277-Something else -HO number -Complaint on Behalf - No":
            // Original applicant ID: 277
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Something_Else);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Home Office reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S278-Something else -IHS number -Complaint on Behalf - Yes - legal rep":
            // Original applicant ID: 278
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Something_Else);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a relative or friend");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S279-Something else -IHS number -Complaint on Behalf - No":
            // Original applicant ID: 279
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Something_Else);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("IHS reference number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S280-Something else -GWF number -Complaint on Behalf - Yes - sponsor":
            // Original applicant ID: 280
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Something_Else);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("GWF number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I am a sponsor");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S281-Something else -Unique number -Complaint on Behalf - No":
            // Original applicant ID: 281
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Something_Else);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny("Unique Application Number", c.REF_NUMBER);
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S282-Something else -Don't have number -Complaint on Behalf - Yes - expert support":
            // Original applicant ID: 282
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Something_Else);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(page, await pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
            await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant("I provide expert support or technical assistance");
            await pages.ukvicWhatIsYourNamePage.answerWhatIsYourName(c.NAME);
            await pages.ukvicWhereShldWeSendOurResponsePage.answerWhereShouldWeSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.ukvicWhatIsApplicantFullnamePage.answerApplicantFullName(c.APPLICANT_FULL_NAME);
            await pages.ukvicWhatIsApplicantDobPage.answerApplicantDob(c.APPLICANT_DOB_11_11_1985);
            await pages.ukvicApplicantCountryOfNationalityPage.answerApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        case "S283-Something else -Don't have number -Complaint on Behalf - No":
            // Original applicant ID: 283
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(page, await pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
            await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Something_Else);
            await pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(page, await pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
            await pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb("I don’t have any of these");
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(page, await pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
            await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await pages.ukvicWhatIsYourFullNamePage.answerWhatIsYourFullName(c.NAME);
            await pages.ukvicWhatIsYourDobPage.answerWhatIsYourDob(c.DOB_11_11_1988);
            await pages.ukvicWhatIsYourCountryOfNationalityPage.answerWhatIsYourCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
            await pages.ukvicWhatAreYourContactDetailsPage.answerWhatAreYourContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
            await pages.ukvicWhatAreDetailsOfYourComplainPage.answerWhatAreTheDetailsOfYourComplaint(c.COMPLAINT_DETAILS);
            await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
            break;
        default:
            throw new Error(`Unknown UKVIC description: ${scenarioDescription}`);
    }
});

Then("I am able to submit the Ukvic form", async ({ pages }) => {
    await pages.ukvicCheckYourAnswersPage.verifySubmission();
});

When("I select 'Continue making your complaint' link for ukvic", async ({ pages }) => {
    await pages.ukvicIfHardToGetAppointmentPage.selectContinueMakingComplaint();
});

When("I enter applicant's full name and click continue", async ({ pages }) => {
    await pages.ukvicWhatIsApplicantFullnamePage.answerEnterYourFullName(c.APPLICANT_FULL_NAME);
});

When("I select applicant's country of nationality and click continue", async ({ pages }) => {
    await pages.ukvicApplicantCountryOfNationalityPage.selectApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
});

When("I enter country of nationality and city and click continue", async ({ pages }) => {
    await pages.ukvicWhereIsTheVisaApplyCentrePage.answerEnterYourCApplicationCenter(c.OVERSEAS_COUNTRY, c.CITY);
});

When("I enter details of complaint and click continue", async ({ pages }) => {
    await pages.ukvicWhatAreDetailsOfYourComplainPage.answerEnterComplaintDetails(c.COMPLAINT_DETAILS);
});

When("I upload a document and click continue", async ({ pages }) => {
    await pages.ukvicUploadDocumentsPage.answerUploadDocuments(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
});

When("I enter my name and click continue", async ({ pages }) => {
    await pages.ukvicWhatIsYourNamePage.answerEnterYourName(c.NAME);
});

When("I select the 'Back' button", async ({ pages }) => {
    await pages.basePage.navigateBackward();
});

When("I enter complaint reference number and click continue", async ({ pages }) => {
    await pages.ukvicWhatIsYourComplaintRefNoPage.answerEnterComplaintRefNo(c.REF_NUMBER);
});

Then('I see wait to receive fund {string} message', async ({ pages }, message: string) => {
    await pages.ukvicIfYouRequestedRefundLess6WksAgoPage.pleaseWaitToReceiveYourRefund(message);
});

Then("I should see check my answers page", async ({ pages }) => {
    await pages.ukvicCheckYourAnswersPage.answerCheckYourAnswers();
});

When('I select original complaint {string} and click continue', async ({ pages }, journey: string) => {
    await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(journey);
});

When('I select {string} to start my application and click continue', async ({ pages }, journey: string) => {
    await pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(journey);
});

When('I select the problem {string} and click continue', async ({ pages }, problem: string) => {
    await pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(problem);
});

When('I select {string} with a reference number and click continue', async ({ pages }, reference: string) => {
    await pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny(reference, c.REF_NUMBER);
});

When('I enter email address {string} and click continue for ukvic', async ({ pages }, email: string) => {
    await pages.ukvicWhereShldWeSendOurResponsePage.enterWhereToSendResponse(email, c.TELEPHONE);
});

When("I enter applicant's date of birth {string} and click continue", async ({ pages }, dob: string) => {
    await pages.ukvicWhatIsYourDobPage.enterYourDob(dob);
});

When('I select where applicant applied {string} and click continue', async ({ pages }, location: string) => {
    await pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(location);
});

When('I select complaint on behalf {string} and click continue', async ({ pages }, option: string) => {
    await pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(option);
});

When('I select relation to applicant {string} and click continue', async ({ pages }, relation: string) => {
    await pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant(relation);
});

When('I select what I am waiting for {string} and click continue', async ({ pages }, waitingFor: string) => {
    await pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(waitingFor);
});

When('I enter date {string} application was submitted and click continue', async ({ pages }, month: string) => {
    await pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(month);
});

When('I select type of decision {string} and click continue', async ({ pages }, decision: string) => {
    await pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(decision);
});

When('I select the BRP problem {string} and click continue', async ({ pages }, problem: string) => {
    await pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem(problem);
});

When('I answer have you requested a refund {string} and click continue', async ({ pages }, requested: string) => {
    await pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse(requested);
});

When('I answer when did you request a refund {string} and click continue', async ({ pages }, when: string) => {
    await pages.ukvicWhenDidYouRequestRefundPage.answerSelectResponse(when);
});

When('I answer where did you experience poor behaviour {string} and click continue', async ({ pages }, where: string) => {
    await pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen(where);
});

When('I select where incident took place {string} and click continue', async ({ pages }, location: string) => {
    await pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace(location);
});

When('I answer do you have ref number for the complaint {string} and click continue', async ({ pages }, option: string) => {
    await pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(option);
});

When('I select continue', async ({ pages }) => {
    await pages.basePage.clickContinueButton();
});

Then('I see {string} error header message displayed for ukvi', async ({ pages }, message: string) => {
    await pages.basePage.assertErrorHeader(message);
});

Then('I see {string} error message displayed for ukvi', async ({ pages }, message: string) => {
    await pages.basePage.assertErrorSummary([message]);
});

Then('I see error message displayed for ukvi', async ({ pages }, message: string) => {
    await pages.basePage.assertErrorSummary(message.trim().split(/\r?\n/).map(line => line.trim()));
});

Then('I am on the Check your answers page', async ({ pages }) => {
    await pages.ukvicCheckYourAnswersPage.assertCheckYourAnswersPage();
});
