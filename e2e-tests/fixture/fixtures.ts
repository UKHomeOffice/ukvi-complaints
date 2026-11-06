import { test as base } from 'playwright-bdd';
import { basePage } from '../pages/base-page';
import { ukviCommonPage } from '../pages/ukvi-common.page';
import type { ukVicStepLib } from '../steps/ukvic.step';
import { ukvicApplicantCountryOfNationalityPage } from '../pages/ukvic-applicant-country-of-nationality.page';
import { ukvicCheckYourAnswersPage } from '../pages/ukvic-check-your-answers.page';
import { ukvicDoYouHaveRefNoForComplaintPage } from '../pages/ukvic-do-you-have-ref-no-for-complaint.page';
import { ukvicHaveYouAskedForDocsBackPage } from '../pages/ukvic-have-you-asked-for-docs-back.page';
import { ukvicHaveYouRequestedRefundPage } from '../pages/ukvic-have-you-requested-refund.page';
import { ukvicHomePageWhatIsTheComplaintAbtPage } from '../pages/ukvic-home-page-what-is-the-complaint-abt.page';
import { ukvicIfBRPCardHasNotArrivedPage } from '../pages/ukvic-if-brp-card-has-not-arrived.page';
import { ukvicIfBRPCardIsIncorrectPage } from '../pages/ukvic-if-brp-card-is-incorrect.page';
import { ukvicIfCannotGetAppointmentOutsideUkPage } from '../pages/ukvic-if-cannot-get-appointment-outside-uk.page';
import { ukvicIfHardToGetAppointmentPage } from '../pages/ukvic-if-hard-to-get-appointment.page';
import { ukvicIfTheGuidanceWasUnclearPage } from '../pages/ukvic-if-the-guidance-was-unclear.page';
import { ukvicIfThereWereTechIssuesBookingApmtPage } from '../pages/ukvic-if-there-were-tech-issues-booking-apmt.page';
import { ukvicIfThereWereTechnicalIssuesPage } from '../pages/ukvic-if-there-were-technical-issues.page';
import { ukvicIfWaitingForEUSchemeFeeRefundPage } from '../pages/ukvic-if-waiting-for-eu-scheme-fee-refund.page';
import { ukvicIfWaitingToBeRefundedForIHSPage } from '../pages/ukvic-if-waiting-to-be-refunded-for-ihs.page';
import { ukvicIfWantToChangeYourAppointmentPage } from '../pages/ukvic-if-want-to-change-your-appointment.page';
import { ukvicIfYouAreWaitingForDecisionPage } from '../pages/ukvic-if-you-are-waiting-for-decision.page';
import { ukvicIfYouAreWaitingForDocToBeReturnedPage } from '../pages/ukvic-if-you-are-waiting-for-doc-to-be-returned.page';
import { ukvicIfYouHaveNotUsedOnlineServiceRequestPage } from '../pages/ukvic-if-you-have-not-used-online-service-request.page';
import { ukvicIfYouHaveQuestAbtPositiveDecisionPage } from '../pages/ukvic-if-you-have-quest-abt-positive-decision.page';
import { ukvicIfYouHaveQuestionsAbtNegDecisionPage } from '../pages/ukvic-if-you-have-questions-abt-neg-decision.page';
import { ukvicIfYouHaveQuestionsAbtYourApmtPage } from '../pages/ukvic-if-you-have-questions-abt-your-apmt.page';
import { ukvicIfYouRequestAddedValueServiceRefundPage } from '../pages/ukvic-if-you-request-added-value-service-refund.page';
import { ukvicIfYouRequestStdServRefundPage } from '../pages/ukvic-if-you-request-std-serv-refund.page';
import { ukvicIfYouRequestedRefundLess6WksAgoPage } from '../pages/ukvic-if-you-requested-refund-less6-wks-ago.page';
import { ukvicIfYouWantReqPriorityServRefundPage } from '../pages/ukvic-if-you-want-req-priority-serv-refund.page';
import { ukvicIfYouWantReqSuperPriorityServRefundPage } from '../pages/ukvic-if-you-want-req-super-priority-serv-refund.page';
import { ukvicMakingComplaintBehalfOfSomeonePage } from '../pages/ukvic-making-complaint-behalf-of-someone.page';
import { ukvicUploadDocumentsPage } from '../pages/ukvic-upload-documents.page';
import { ukvicWasDecisionNegOrPositivePage } from '../pages/ukvic-was-decision-neg-or-positive.page';
import { ukvicWhatAreDetailsOfYourComplainPage } from '../pages/ukvic-what-are-details-of-your-complain.page';
import { ukvicWhatAreYouWaitingForPage } from '../pages/ukvic-what-are-you-waiting-for.page';
import { ukvicWhatAreYouWaitingForToBeRefundedPage } from '../pages/ukvic-what-are-you-waiting-for-to-be-refunded.page';
import { ukvicWhatAreYourContactDetailsPage } from '../pages/ukvic-what-are-your-contact-details.page';
import { ukvicWhatIsApplicantDobPage } from '../pages/ukvic-what-is-applicant-dob.page';
import { ukvicWhatIsApplicantFullnamePage } from '../pages/ukvic-what-is-applicant-fullname.page';
import { ukvicWhatIsTheProblemWithTheBrpPage } from '../pages/ukvic-what-is-the-problem-with-the-brp.page';
import { ukvicWhatIsYourComplaintRefNoPage } from '../pages/ukvic-what-is-your-complaint-ref-no.page';
import { ukvicWhatIsYourCountryOfNationalityPage } from '../pages/ukvic-what-is-your-country-of-nationality.page';
import { ukvicWhatIsYourDobPage } from '../pages/ukvic-what-is-your-dob.page';
import { ukvicWhatIsYourFullNamePage } from '../pages/ukvic-what-is-your-full-name.page';
import { ukvicWhatIsYourNamePage } from '../pages/ukvic-what-is-your-name.page';
import { ukvicWhatIsYourRelationToApplicantPage } from '../pages/ukvic-what-is-your-relation-to-applicant.page';
import { ukvicWhatNumbWasTheCallMadeFromPage } from '../pages/ukvic-what-numb-was-the-call-made-from.page';
import { ukvicWhatProbYouHadMakingAppointmentPage } from '../pages/ukvic-what-prob-you-had-making-appointment.page';
import { ukvicWhatTelephoneNumWasCalledPage } from '../pages/ukvic-what-telephone-num-was-called.page';
import { ukvicWhatWasTheProbWithApplyProcessPage } from '../pages/ukvic-what-was-the-prob-with-apply-process.page';
import { ukvicWhatWasYourOriginalComplaintAbtPage } from '../pages/ukvic-what-was-your-original-complaint-abt.page';
import { ukvicWhenDidYouRequestRefundPage } from '../pages/ukvic-when-did-you-request-refund.page';
import { ukvicWhenDidYouSubmitYourApplicationPage } from '../pages/ukvic-when-did-you-submit-your-application.page';
import { ukvicWhenWasTheCallPage } from '../pages/ukvic-when-was-the-call.page';
import { ukvicWhereDidTheIncidentHappenPage } from '../pages/ukvic-where-did-the-incident-happen.page';
import { ukvicWhereDidYouApplyPage } from '../pages/ukvic-where-did-you-apply.page';
import { ukvicWhereDidYouExpPoorBehaviourPage } from '../pages/ukvic-where-did-you-exp-poor-behaviour.page';
import { ukvicWhereDidYouMakeTheApplicationPage } from '../pages/ukvic-where-did-you-make-the-application.page';
import { ukvicWhereInUkIsServicePointPage } from '../pages/ukvic-where-in-uk-is-service-point.page';
import { ukvicWhereInUkIsServiceSupportCentrePage } from '../pages/ukvic-where-in-uk-is-service-support-centre.page';
import { ukvicWhereIsTheVisaApplyCentrePage } from '../pages/ukvic-where-is-the-visa-apply-centre.page';
import { ukvicWhereShldWeSendOurResponsePage } from '../pages/ukvic-where-shld-we-send-our-response.page';
import { ukvicWhichRefNumDoYouHavePage } from '../pages/ukvic-which-ref-num-do-you-have.page';
import { ukvicWhichTypeOfRefundIsRequestedPage } from '../pages/ukvic-which-type-of-refund-is-requested.page';

export type Pages = {
    basePage: basePage;
    ukviCommonPage: ukviCommonPage;
    ukvicApplicantCountryOfNationalityPage: ukvicApplicantCountryOfNationalityPage;
    ukvicCheckYourAnswersPage: ukvicCheckYourAnswersPage;
    ukvicDoYouHaveRefNoForComplaintPage: ukvicDoYouHaveRefNoForComplaintPage;
    ukvicHaveYouAskedForDocsBackPage: ukvicHaveYouAskedForDocsBackPage;
    ukvicHaveYouRequestedRefundPage: ukvicHaveYouRequestedRefundPage;
    ukvicHomePageWhatIsTheComplaintAbtPage: ukvicHomePageWhatIsTheComplaintAbtPage;
    ukvicIfBRPCardHasNotArrivedPage: ukvicIfBRPCardHasNotArrivedPage;
    ukvicIfBRPCardIsIncorrectPage: ukvicIfBRPCardIsIncorrectPage;
    ukvicIfCannotGetAppointmentOutsideUkPage: ukvicIfCannotGetAppointmentOutsideUkPage;
    ukvicIfHardToGetAppointmentPage: ukvicIfHardToGetAppointmentPage;
    ukvicIfTheGuidanceWasUnclearPage: ukvicIfTheGuidanceWasUnclearPage;
    ukvicIfThereWereTechIssuesBookingApmtPage: ukvicIfThereWereTechIssuesBookingApmtPage;
    ukvicIfThereWereTechnicalIssuesPage: ukvicIfThereWereTechnicalIssuesPage;
    ukvicIfWaitingForEUSchemeFeeRefundPage: ukvicIfWaitingForEUSchemeFeeRefundPage;
    ukvicIfWaitingToBeRefundedForIHSPage: ukvicIfWaitingToBeRefundedForIHSPage;
    ukvicIfWantToChangeYourAppointmentPage: ukvicIfWantToChangeYourAppointmentPage;
    ukvicIfYouAreWaitingForDecisionPage: ukvicIfYouAreWaitingForDecisionPage;
    ukvicIfYouAreWaitingForDocToBeReturnedPage: ukvicIfYouAreWaitingForDocToBeReturnedPage;
    ukvicIfYouHaveNotUsedOnlineServiceRequestPage: ukvicIfYouHaveNotUsedOnlineServiceRequestPage;
    ukvicIfYouHaveQuestAbtPositiveDecisionPage: ukvicIfYouHaveQuestAbtPositiveDecisionPage;
    ukvicIfYouHaveQuestionsAbtNegDecisionPage: ukvicIfYouHaveQuestionsAbtNegDecisionPage;
    ukvicIfYouHaveQuestionsAbtYourApmtPage: ukvicIfYouHaveQuestionsAbtYourApmtPage;
    ukvicIfYouRequestAddedValueServiceRefundPage: ukvicIfYouRequestAddedValueServiceRefundPage;
    ukvicIfYouRequestStdServRefundPage: ukvicIfYouRequestStdServRefundPage;
    ukvicIfYouRequestedRefundLess6WksAgoPage: ukvicIfYouRequestedRefundLess6WksAgoPage;
    ukvicIfYouWantReqPriorityServRefundPage: ukvicIfYouWantReqPriorityServRefundPage;
    ukvicIfYouWantReqSuperPriorityServRefundPage: ukvicIfYouWantReqSuperPriorityServRefundPage;
    ukvicMakingComplaintBehalfOfSomeonePage: ukvicMakingComplaintBehalfOfSomeonePage;
    ukvicUploadDocumentsPage: ukvicUploadDocumentsPage;
    ukvicWasDecisionNegOrPositivePage: ukvicWasDecisionNegOrPositivePage;
    ukvicWhatAreDetailsOfYourComplainPage: ukvicWhatAreDetailsOfYourComplainPage;
    ukvicWhatAreYouWaitingForPage: ukvicWhatAreYouWaitingForPage;
    ukvicWhatAreYouWaitingForToBeRefundedPage: ukvicWhatAreYouWaitingForToBeRefundedPage;
    ukvicWhatAreYourContactDetailsPage: ukvicWhatAreYourContactDetailsPage;
    ukvicWhatIsApplicantDobPage: ukvicWhatIsApplicantDobPage;
    ukvicWhatIsApplicantFullnamePage: ukvicWhatIsApplicantFullnamePage;
    ukvicWhatIsTheProblemWithTheBrpPage: ukvicWhatIsTheProblemWithTheBrpPage;
    ukvicWhatIsYourComplaintRefNoPage: ukvicWhatIsYourComplaintRefNoPage;
    ukvicWhatIsYourCountryOfNationalityPage: ukvicWhatIsYourCountryOfNationalityPage;
    ukvicWhatIsYourDobPage: ukvicWhatIsYourDobPage;
    ukvicWhatIsYourFullNamePage: ukvicWhatIsYourFullNamePage;
    ukvicWhatIsYourNamePage: ukvicWhatIsYourNamePage;
    ukvicWhatIsYourRelationToApplicantPage: ukvicWhatIsYourRelationToApplicantPage;
    ukvicWhatNumbWasTheCallMadeFromPage: ukvicWhatNumbWasTheCallMadeFromPage;
    ukvicWhatProbYouHadMakingAppointmentPage: ukvicWhatProbYouHadMakingAppointmentPage;
    ukvicWhatTelephoneNumWasCalledPage: ukvicWhatTelephoneNumWasCalledPage;
    ukvicWhatWasTheProbWithApplyProcessPage: ukvicWhatWasTheProbWithApplyProcessPage;
    ukvicWhatWasYourOriginalComplaintAbtPage: ukvicWhatWasYourOriginalComplaintAbtPage;
    ukvicWhenDidYouRequestRefundPage: ukvicWhenDidYouRequestRefundPage;
    ukvicWhenDidYouSubmitYourApplicationPage: ukvicWhenDidYouSubmitYourApplicationPage;
    ukvicWhenWasTheCallPage: ukvicWhenWasTheCallPage;
    ukvicWhereDidTheIncidentHappenPage: ukvicWhereDidTheIncidentHappenPage;
    ukvicWhereDidYouApplyPage: ukvicWhereDidYouApplyPage;
    ukvicWhereDidYouExpPoorBehaviourPage: ukvicWhereDidYouExpPoorBehaviourPage;
    ukvicWhereDidYouMakeTheApplicationPage: ukvicWhereDidYouMakeTheApplicationPage;
    ukvicWhereInUkIsServicePointPage: ukvicWhereInUkIsServicePointPage;
    ukvicWhereInUkIsServiceSupportCentrePage: ukvicWhereInUkIsServiceSupportCentrePage;
    ukvicWhereIsTheVisaApplyCentrePage: ukvicWhereIsTheVisaApplyCentrePage;
    ukvicWhereShldWeSendOurResponsePage: ukvicWhereShldWeSendOurResponsePage;
    ukvicWhichRefNumDoYouHavePage: ukvicWhichRefNumDoYouHavePage;
    ukvicWhichTypeOfRefundIsRequestedPage: ukvicWhichTypeOfRefundIsRequestedPage;
};

export const test = base.extend<{ pages: Pages; ukvic: ukVicStepLib }>({
    pages: async ({ page }, use) => {
        await use({
            basePage: new basePage(page),
            ukviCommonPage: new ukviCommonPage(page),
            ukvicApplicantCountryOfNationalityPage: new ukvicApplicantCountryOfNationalityPage(page),
            ukvicCheckYourAnswersPage: new ukvicCheckYourAnswersPage(page),
            ukvicDoYouHaveRefNoForComplaintPage: new ukvicDoYouHaveRefNoForComplaintPage(page),
            ukvicHaveYouAskedForDocsBackPage: new ukvicHaveYouAskedForDocsBackPage(page),
            ukvicHaveYouRequestedRefundPage: new ukvicHaveYouRequestedRefundPage(page),
            ukvicHomePageWhatIsTheComplaintAbtPage: new ukvicHomePageWhatIsTheComplaintAbtPage(page),
            ukvicIfBRPCardHasNotArrivedPage: new ukvicIfBRPCardHasNotArrivedPage(page),
            ukvicIfBRPCardIsIncorrectPage: new ukvicIfBRPCardIsIncorrectPage(page),
            ukvicIfCannotGetAppointmentOutsideUkPage: new ukvicIfCannotGetAppointmentOutsideUkPage(page),
            ukvicIfHardToGetAppointmentPage: new ukvicIfHardToGetAppointmentPage(page),
            ukvicIfTheGuidanceWasUnclearPage: new ukvicIfTheGuidanceWasUnclearPage(page),
            ukvicIfThereWereTechIssuesBookingApmtPage: new ukvicIfThereWereTechIssuesBookingApmtPage(page),
            ukvicIfThereWereTechnicalIssuesPage: new ukvicIfThereWereTechnicalIssuesPage(page),
            ukvicIfWaitingForEUSchemeFeeRefundPage: new ukvicIfWaitingForEUSchemeFeeRefundPage(page),
            ukvicIfWaitingToBeRefundedForIHSPage: new ukvicIfWaitingToBeRefundedForIHSPage(page),
            ukvicIfWantToChangeYourAppointmentPage: new ukvicIfWantToChangeYourAppointmentPage(page),
            ukvicIfYouAreWaitingForDecisionPage: new ukvicIfYouAreWaitingForDecisionPage(page),
            ukvicIfYouAreWaitingForDocToBeReturnedPage: new ukvicIfYouAreWaitingForDocToBeReturnedPage(page),
            ukvicIfYouHaveNotUsedOnlineServiceRequestPage: new ukvicIfYouHaveNotUsedOnlineServiceRequestPage(page),
            ukvicIfYouHaveQuestAbtPositiveDecisionPage: new ukvicIfYouHaveQuestAbtPositiveDecisionPage(page),
            ukvicIfYouHaveQuestionsAbtNegDecisionPage: new ukvicIfYouHaveQuestionsAbtNegDecisionPage(page),
            ukvicIfYouHaveQuestionsAbtYourApmtPage: new ukvicIfYouHaveQuestionsAbtYourApmtPage(page),
            ukvicIfYouRequestAddedValueServiceRefundPage: new ukvicIfYouRequestAddedValueServiceRefundPage(page),
            ukvicIfYouRequestStdServRefundPage: new ukvicIfYouRequestStdServRefundPage(page),
            ukvicIfYouRequestedRefundLess6WksAgoPage: new ukvicIfYouRequestedRefundLess6WksAgoPage(page),
            ukvicIfYouWantReqPriorityServRefundPage: new ukvicIfYouWantReqPriorityServRefundPage(page),
            ukvicIfYouWantReqSuperPriorityServRefundPage: new ukvicIfYouWantReqSuperPriorityServRefundPage(page),
            ukvicMakingComplaintBehalfOfSomeonePage: new ukvicMakingComplaintBehalfOfSomeonePage(page),
            ukvicUploadDocumentsPage: new ukvicUploadDocumentsPage(page),
            ukvicWasDecisionNegOrPositivePage: new ukvicWasDecisionNegOrPositivePage(page),
            ukvicWhatAreDetailsOfYourComplainPage: new ukvicWhatAreDetailsOfYourComplainPage(page),
            ukvicWhatAreYouWaitingForPage: new ukvicWhatAreYouWaitingForPage(page),
            ukvicWhatAreYouWaitingForToBeRefundedPage: new ukvicWhatAreYouWaitingForToBeRefundedPage(page),
            ukvicWhatAreYourContactDetailsPage: new ukvicWhatAreYourContactDetailsPage(page),
            ukvicWhatIsApplicantDobPage: new ukvicWhatIsApplicantDobPage(page),
            ukvicWhatIsApplicantFullnamePage: new ukvicWhatIsApplicantFullnamePage(page),
            ukvicWhatIsTheProblemWithTheBrpPage: new ukvicWhatIsTheProblemWithTheBrpPage(page),
            ukvicWhatIsYourComplaintRefNoPage: new ukvicWhatIsYourComplaintRefNoPage(page),
            ukvicWhatIsYourCountryOfNationalityPage: new ukvicWhatIsYourCountryOfNationalityPage(page),
            ukvicWhatIsYourDobPage: new ukvicWhatIsYourDobPage(page),
            ukvicWhatIsYourFullNamePage: new ukvicWhatIsYourFullNamePage(page),
            ukvicWhatIsYourNamePage: new ukvicWhatIsYourNamePage(page),
            ukvicWhatIsYourRelationToApplicantPage: new ukvicWhatIsYourRelationToApplicantPage(page),
            ukvicWhatNumbWasTheCallMadeFromPage: new ukvicWhatNumbWasTheCallMadeFromPage(page),
            ukvicWhatProbYouHadMakingAppointmentPage: new ukvicWhatProbYouHadMakingAppointmentPage(page),
            ukvicWhatTelephoneNumWasCalledPage: new ukvicWhatTelephoneNumWasCalledPage(page),
            ukvicWhatWasTheProbWithApplyProcessPage: new ukvicWhatWasTheProbWithApplyProcessPage(page),
            ukvicWhatWasYourOriginalComplaintAbtPage: new ukvicWhatWasYourOriginalComplaintAbtPage(page),
            ukvicWhenDidYouRequestRefundPage: new ukvicWhenDidYouRequestRefundPage(page),
            ukvicWhenDidYouSubmitYourApplicationPage: new ukvicWhenDidYouSubmitYourApplicationPage(page),
            ukvicWhenWasTheCallPage: new ukvicWhenWasTheCallPage(page),
            ukvicWhereDidTheIncidentHappenPage: new ukvicWhereDidTheIncidentHappenPage(page),
            ukvicWhereDidYouApplyPage: new ukvicWhereDidYouApplyPage(page),
            ukvicWhereDidYouExpPoorBehaviourPage: new ukvicWhereDidYouExpPoorBehaviourPage(page),
            ukvicWhereDidYouMakeTheApplicationPage: new ukvicWhereDidYouMakeTheApplicationPage(page),
            ukvicWhereInUkIsServicePointPage: new ukvicWhereInUkIsServicePointPage(page),
            ukvicWhereInUkIsServiceSupportCentrePage: new ukvicWhereInUkIsServiceSupportCentrePage(page),
            ukvicWhereIsTheVisaApplyCentrePage: new ukvicWhereIsTheVisaApplyCentrePage(page),
            ukvicWhereShldWeSendOurResponsePage: new ukvicWhereShldWeSendOurResponsePage(page),
            ukvicWhichRefNumDoYouHavePage: new ukvicWhichRefNumDoYouHavePage(page),
            ukvicWhichTypeOfRefundIsRequestedPage: new ukvicWhichTypeOfRefundIsRequestedPage(page),
        });
    },
    ukvic: async ({ page, pages }, use) => {
        const { ukVicStepLib } = await import('../steps/ukvic.step');
        await use(new ukVicStepLib(pages, page));
    },
});

export const expect = test.expect;
