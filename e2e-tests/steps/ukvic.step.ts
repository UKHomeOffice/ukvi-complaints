import { expect, Page } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test, Pages } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
import { getApplicantForDescription, UkvicApplicant } from '../test-data/ukvic-applicant';
import { descriptionMappings } from '../test-data/ukvic-descriptions';
import { resolve } from 'node:path';

const same = (left: string, right: string): boolean => left.toLowerCase() === right.toLowerCase();
const isYes = (value: string): boolean => same(value, 'Yes');

export class ukVicStepLib {
    applicant!: UkvicApplicant;
    selectedDescription?: string;

    constructor(readonly pages: Pages, readonly page: Page) { }

    selectScenario(description: string): void {
        if (this.page.url() === 'about:blank') throw new Error('Visit the Ukvic page before selecting scenario data');
        this.applicant = getApplicantForDescription(description, descriptionMappings);
        this.selectedDescription = description;
        this.assertSelectedDescription(description);
    }

    assertSelectedDescription(description: string = this.selectedDescription ?? ''): void {
        expect(description.trim()).not.toBe('');
        expect(description).toBe(this.selectedDescription);
        expect(this.applicant).toEqual(getApplicantForDescription(description, descriptionMappings));
    }

    async openUkviComplaintHomePage(): Promise<void> {
        await this.pages.ukvicHomePageWhatIsTheComplaintAbtPage.openUkvicHomePage();
        await this.pages.ukvicHomePageWhatIsTheComplaintAbtPage.acceptCookies();
    }

    async selectYourComplaintTypeAndCompleteForm(): Promise<void> {
        await this.pages.ukvicHomePageWhatIsTheComplaintAbtPage.assertPageTitle(this.page, await this.pages.ukvicHomePageWhatIsTheComplaintAbtPage.expectedPageTitle());
        const complaintType = this.applicant.whatIsTheComplaintAbt;
        switch (complaintType) {
            case c.SUBMIT_APPLICATION:
                await this.pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Submit_Application);
                await this.selectProblemWithTheApplication();
                break;
            case c.MAKE_APPOINTMENT:
                await this.pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Make_Appointment);
                await this.answerWhatProbMakingAppointment();
                break;
            case c.WAIT_FOR_DECISION:
                await this.pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Wait_For_Decision);
                await this.answerWhatAreYouWaitingFor();
                break;
            case c.NEG_OR_POSITIVE_DECISION:
                await this.pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Decision);
                await this.answerWasDecisionNegOrPositive();
                break;
            case c.BRP_PERMITS:
                await this.pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Brp_Permits);
                await this.answerWhatIsTheProbWithTheBRP();
                break;
            case c.REFUNDS:
                await this.pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Refunds);
                await this.answerHaveYouRequestedRefund();
                break;
            case c.STAFF_BEHAVIOUR:
                await this.pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Staff_Behaviour);
                await this.answerWhereDidYouExpPoorBehaviour();
                break;
            case c.EXISTING_COMPLAINT:
                await this.pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Existing_Complaint);
                await this.answerDoYouHaveRefNumbForTheComplaint();
                break;
            case c.SOMETHING_ELSE:
                await this.pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(c.Something_Else);
                await this.answerWhichRefNumbDoYouHave();
                break;
            default:
        }
    }

    async selectProblemWithTheApplication(): Promise<void> {
        await this.pages.ukvicWhatWasTheProbWithApplyProcessPage.assertPageTitle(this.page, await this.pages.ukvicWhatWasTheProbWithApplyProcessPage.expectedPageTitle());
        const applicationProb = this.applicant.whatWasTheProbWithTheApplyProcess;
        switch (applicationProb) {
            case c.TECHNICAL_ISSUES:
                await this.pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Technical_Issues);
                await this.answerWhereDidYouMakeYourApplication();
                break;
            case c.UNCLEAR_GUIDANCE:
                await this.pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Unclear_Guidance);
                await this.answerWhereDidYouMakeYourApplication();
            case c.SOMETHING_ELSE:
                await this.pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(c.Something_Else);
                await this.answerWhichRefNumbDoYouHave();
                break;
            default:
                throw new Error("Selected option not found");
        }
    }

    async answerWhereDidYouMakeYourApplication(): Promise<void> {
        if (same(this.applicant.whatIsTheComplaintAbt, c.NEG_OR_POSITIVE_DECISION)) {
            await this.pages.ukvicWhereDidYouMakeTheApplicationPage.assertPageTitle(this.page, await this.pages.ukvicWhereDidYouMakeTheApplicationPage.expectedPageTitle());
        } else {
            await this.pages.ukvicWhereDidYouApplyPage.assertPageTitle(this.page, await this.pages.ukvicWhereDidYouApplyPage.expectedPageTitle());
        }
        const applicationLoc = this.applicant.whereDidYouMakeYourApplication;
        if (same(applicationLoc, c.IN_THE_UK)) {
            await this.pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.IN_THE_UK);
            if (same(this.applicant.whatProbDidYouHaveMakingAppointment, c.DIFFICULTY_GETTING_APPOINTMENT)) {
                await this.answerDifficultyGettingAppmt();
            } else if (same(this.applicant.whatProbDidYouHaveMakingAppointment, c.DIFFICULTY_CHANGING_APPOINTMENT)) {
                await this.answerDifficultyChangingAppmt();
            } else if (same(this.applicant.whatProbDidYouHaveMakingAppointment, c.TECHNICAL_ISSUES_WITH_BOOKING_APPOINTMENT)) {
                await this.answerTechnicalIssuesWithBkingAppmt();
            } else if (same(this.applicant.whatWasTheProbWithTheApplyProcess, c.TECHNICAL_ISSUES)) {
                await this.answerTechnicalIssuesWithPayments();
            } else if (same(this.applicant.whatWasTheProbWithTheApplyProcess, c.UNCLEAR_GUIDANCE)) {
                await this.answerGuidanceUnclearOrMisleading();
            } else if (same(this.applicant.whatProbDidYouHaveMakingAppointment, c.HAVE_QUESTION_ABT_MY_APPOINTMENT)) {
                await this.answerHaveQuestionsAbtYourAppmt();
            } else if (same(this.applicant.whatAreYouWaitingFor, c.Application_Decision)) {
                await this.answerIfYouAreWaitingForDecision();
            } else if (same(this.applicant.wasDecisionNegativeOrPositive, c.POSITIVE)) {
                await this.answerIfYouHaveQuestionsAbtPositiveDecision();
            } else if (same(this.applicant.wasDecisionNegativeOrPositive, c.NEGATIVE)) {
                await this.answerIfYouHaveQuestionsAbtNegDecision();
            } else if (same(this.applicant.whichTypeOfRefundDoYouRequest, c.PRIORITY_SERVICE_FEE)) {
                await this.answerIfYouWantToRequestPrioritySerRefund();
            } else if (same(this.applicant.whichTypeOfRefundDoYouRequest, c.SUPER_PRIORITY_SERVICE_FEE)) {
                await this.answerIfYouWantToRequestSuperPrioritySerRefund();
            } else if (same(this.applicant.whichTypeOfRefundDoYouRequest, c.IHS_SERVICE_FEE)) {
                await this.answerIfWaitingToBeRefundedForIHS();
            } else if (same(this.applicant.whatAreYouWaitingToBeRefunded, c.IHS_SERVICE_FEE)) {
                await this.answerIfWaitingToBeRefundedForIHS();
            }
        } else if (same(applicationLoc, c.OUTSIDE_OF_THE_UK)) {
            await this.pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(c.OUTSIDE_OF_THE_UK);
            if (same(this.applicant.whatProbDidYouHaveMakingAppointment, c.DIFFICULTY_GETTING_APPOINTMENT)) {
                await this.answerDifficultyGettingAppmt();
            } else if (same(this.applicant.whatProbDidYouHaveMakingAppointment, c.DIFFICULTY_CHANGING_APPOINTMENT)) {
                await this.answerDifficultyChangingAppmt();
            } else if (same(this.applicant.whatWasTheProbWithTheApplyProcess, c.TECHNICAL_ISSUES)) {
                await this.answerTechnicalIssuesWithPayments();
            } else if (same(this.applicant.whatWasTheProbWithTheApplyProcess, c.UNCLEAR_GUIDANCE)) {
                await this.answerGuidanceUnclearOrMisleading();
            } else if (same(this.applicant.whatProbDidYouHaveMakingAppointment, c.TECHNICAL_ISSUES_WITH_BOOKING_APPOINTMENT)) {
                await this.answerTechnicalIssuesWithBkingAppmt();
            } else if (same(this.applicant.whatProbDidYouHaveMakingAppointment, c.HAVE_QUESTION_ABT_MY_APPOINTMENT)) {
                await this.answerHaveQuestionsAbtYourAppmt();
            } else if (same(this.applicant.whatAreYouWaitingFor, c.Application_Decision)) {
                await this.answerIfYouAreWaitingForDecision();
            } else if (same(this.applicant.wasDecisionNegativeOrPositive, c.NEGATIVE)) {
                await this.answerIfYouHaveQuestionsAbtNegDecision();
            } else if (same(this.applicant.wasDecisionNegativeOrPositive, c.POSITIVE)) {
                await this.answerIfYouHaveQuestionsAbtPositiveDecision();
            } else if (same(this.applicant.whichTypeOfRefundDoYouRequest, c.PRIORITY_SERVICE_FEE)) {
                await this.answerIfYouWantToRequestPrioritySerRefund();
            } else if (same(this.applicant.whichTypeOfRefundDoYouRequest, c.SUPER_PRIORITY_SERVICE_FEE)) {
                await this.answerIfYouWantToRequestSuperPrioritySerRefund();
            } else if (same(this.applicant.whichTypeOfRefundDoYouRequest, c.IHS_SERVICE_FEE)) {
                await this.answerIfWaitingToBeRefundedForIHS();
            } else if (same(this.applicant.whatAreYouWaitingToBeRefunded, c.IHS_SERVICE_FEE)) {
                await this.answerIfWaitingToBeRefundedForIHS();
            }
        } else {
            throw new Error("Selected option: " + applicationLoc + " not found");
        }
    }

    async answerIfYouWantToRequestPrioritySerRefund(): Promise<void> {
        await this.pages.ukvicIfYouWantReqPriorityServRefundPage.assertPageTitle(this.page, await this.pages.ukvicIfYouWantReqPriorityServRefundPage.expectedPageTitle());
        await this.pages.ukvicIfYouWantReqPriorityServRefundPage.checkExternalLinkWorksOnPage();
        await this.pages.ukvicIfYouWantReqPriorityServRefundPage.selectContinueMakingComplaint();
        await this.answerWhichRefNumbDoYouHave();
    }

    async answerIfYouWantToRequestSuperPrioritySerRefund(): Promise<void> {
        await this.pages.ukvicIfYouWantReqSuperPriorityServRefundPage.assertPageTitle(this.page, await this.pages.ukvicIfYouWantReqSuperPriorityServRefundPage.expectedPageTitle());
        await this.pages.ukvicIfYouWantReqSuperPriorityServRefundPage.checkExternalLinkWorksOnPage();
        await this.pages.ukvicIfYouWantReqSuperPriorityServRefundPage.selectContinueMakingComplaint();
        await this.answerWhichRefNumbDoYouHave();
    }

    async answerIfWaitingToBeRefundedForIHS(): Promise<void> {
        await this.pages.ukvicIfWaitingToBeRefundedForIHSPage.assertPageTitle(this.page, await this.pages.ukvicIfWaitingToBeRefundedForIHSPage.expectedPageTitle());
        await this.pages.ukvicIfWaitingToBeRefundedForIHSPage.checkExternalLinksAreWorkingOnPage();
        await this.pages.ukvicIfWaitingToBeRefundedForIHSPage.selectContinueMakingComplaint();
        await this.answerWhichRefNumbDoYouHave();
    }

    async answerIfYouAreWaitingForDecision(): Promise<void> {
        await this.pages.ukvicIfYouAreWaitingForDecisionPage.assertPageTitle(this.page, await this.pages.ukvicIfYouAreWaitingForDecisionPage.expectedPageTitle());
        if (same(this.applicant.whereDidYouMakeYourApplication, c.IN_THE_UK)) {
            await this.pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_InUk();
        } else {
            await this.pages.ukvicIfYouAreWaitingForDecisionPage.checkWaitingTimesLinkWork_OutsideUk();
        }
        await this.pages.ukvicIfYouAreWaitingForDecisionPage.selectContinueMakingComplaint();
        await this.pages.ukvicWhenDidYouSubmitYourApplicationPage.assertPageTitle(this.page, await this.pages.ukvicWhenDidYouSubmitYourApplicationPage.expectedPageTitle());
        await this.pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(c.APPLICATION_MONTH);
        await this.answerWhichRefNumbDoYouHave();
    }

    async answerDifficultyGettingAppmt(): Promise<void> {
        if (same(this.applicant.whereDidYouMakeYourApplication, c.IN_THE_UK)) {
            await this.pages.ukvicIfHardToGetAppointmentPage.assertPageTitle(this.page, await this.pages.ukvicIfHardToGetAppointmentPage.expectedPageTitle());
            await this.pages.ukvicIfHardToGetAppointmentPage.checkExternalLinkWorksOnPage();
        } else {
            await this.pages.ukvicIfCannotGetAppointmentOutsideUkPage.assertPageTitle(this.page, await this.pages.ukvicIfCannotGetAppointmentOutsideUkPage.expectedPageTitle());
        }
        await this.pages.ukvicIfHardToGetAppointmentPage.selectContinueMakingComplaint();
        await this.answerWhichRefNumbDoYouHave();
    }

    async answerDifficultyChangingAppmt(): Promise<void> {
        await this.pages.ukvicIfWantToChangeYourAppointmentPage.assertPageTitle(this.page, await this.pages.ukvicIfWantToChangeYourAppointmentPage.expectedPageTitle());
        if (same(this.applicant.whereDidYouMakeYourApplication, c.IN_THE_UK)) {
            await this.pages.ukvicIfWantToChangeYourAppointmentPage.checkExternalLinkWorksOnPage();
        }
        await this.pages.ukvicIfWantToChangeYourAppointmentPage.selectContinueMakingComplaint();
        await this.answerWhichRefNumbDoYouHave();
    }

    async answerHaveQuestionsAbtYourAppmt(): Promise<void> {
        await this.pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.assertPageTitle(this.page, await this.pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.expectedPageTitle());
        await this.pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.checkExternalLinkWorksOnPage();
        await this.pages.ukvicIfYouHaveQuestionsAbtYourApmtPage.selectContinueMakingComplaint();
        await this.answerWhichRefNumbDoYouHave();
    }

    async answerTechnicalIssuesWithBkingAppmt(): Promise<void> {
        await this.pages.ukvicIfThereWereTechIssuesBookingApmtPage.assertPageTitle(this.page, await this.pages.ukvicIfThereWereTechIssuesBookingApmtPage.expectedPageTitle());
        await this.pages.ukvicIfThereWereTechIssuesBookingApmtPage.checkExternalLinkWorksOnPage();
        await this.pages.ukvicIfThereWereTechIssuesBookingApmtPage.selectContinueMakingComplaint();
        await this.answerWhichRefNumbDoYouHave();
    }

    async answerTechnicalIssuesWithPayments(): Promise<void> {
        await this.pages.ukvicIfThereWereTechnicalIssuesPage.assertPageTitle(this.page, await this.pages.ukvicIfThereWereTechnicalIssuesPage.expectedPageTitle());
        await this.pages.ukvicIfThereWereTechnicalIssuesPage.checkExternalLinkWorksOnPage();
        await this.pages.ukvicIfThereWereTechnicalIssuesPage.selectContinueMakingComplaint();
        await this.answerWhichRefNumbDoYouHave();
    }

    async answerGuidanceUnclearOrMisleading(): Promise<void> {
        await this.pages.ukvicIfTheGuidanceWasUnclearPage.assertPageTitle(this.page, await this.pages.ukvicIfTheGuidanceWasUnclearPage.expectedPageTitle());
        await this.pages.ukvicIfTheGuidanceWasUnclearPage.checkExternalLinkWorksOnPage();
        await this.pages.ukvicIfTheGuidanceWasUnclearPage.selectContinueMakingComplaint();
        await this.answerWhichRefNumbDoYouHave();
    }

    async answerWhichRefNumbDoYouHave(): Promise<void> {
        await this.pages.ukvicWhichRefNumDoYouHavePage.assertPageTitle(this.page, await this.pages.ukvicWhichRefNumDoYouHavePage.expectedPageTitle());
        const refNumb = this.applicant.whichOfTheseRefNumbDoYouHave;
        switch (refNumb) {
            case c.GWF_NUMBER:
                await this.pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny(c.GWF_NUMBER, c.REF_NUMBER);
                break;
            case c.HOME_OFFICE_REF:
                await this.pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny(c.HOME_OFFICE_REF, c.REF_NUMBER);
                break;
            case c.IHS_REF_NUMBER:
                await this.pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny(c.IHS_REF_NUMBER, c.REF_NUMBER);
                break;
            case c.UNIQUE_APPLICATION_NUMBER:
                await this.pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny(c.UNIQUE_APPLICATION_NUMBER, c.REF_NUMBER);
                break;
            case c.DONT_HAVE_ANY_OF_THESE:
                await this.pages.ukvicWhichRefNumDoYouHavePage.answerDontHaveRefNumb(c.DONT_HAVE_ANY_OF_THESE);
                break;
            default:
                throw new Error("Selected option not found");
        }
        await this.answerAreYouMakingComplaintOnBehalfOfSomeoneElse();
    }

    async answerAreYouMakingComplaintOnBehalfOfSomeoneElse(): Promise<void> {
        await this.pages.ukvicMakingComplaintBehalfOfSomeonePage.assertPageTitle(this.page, await this.pages.ukvicMakingComplaintBehalfOfSomeonePage.expectedPageTitle());
        const haveConsent = isYes(this.applicant.areYouMakingThisComplaintForSomeoneElse);
        if (haveConsent) {
            await this.pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_YES);
            await this.answerYourRelationToApplicant();
        } else {
            await this.pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(c.RESPONSE_NO);
            await this.answerWhatIsYourFullName();
            await this.answerWhatIsYourDob();
            await this.answerWhatIsYourCountryOfNationality();
            await this.answerWhatAreYourContactDetails();
            await this.answerWhatAreTheDetailsOfYourComplaint();
            await this.answerUploadDocuments();
        }
    }

    async answerYourRelationToApplicant(): Promise<void> {
        await this.pages.ukvicWhatIsYourRelationToApplicantPage.assertPageTitle(this.page, await this.pages.ukvicWhatIsYourRelationToApplicantPage.expectedPageTitle());
        const relationToApplicant = this.applicant.whatIsYourRelationToApplicant;
        switch (relationToApplicant) {
            case c.LEGAL_REPRESENTATIVE:
                await this.pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant(c.LEGAL_REPRESENTATIVE);
                break;
            case c.RELATIVE_OR_FRIEND:
                await this.pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant(c.RELATIVE_OR_FRIEND);
                break;
            case c.SPONSOR:
                await this.pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant(c.SPONSOR);
                break;
            case c.PROVIDE_EXPERT_SUPPORT:
                await this.pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant(c.PROVIDE_EXPERT_SUPPORT);
                break;
            default:
                throw new Error("Selected option not found");
        }
        await this.answerWhatIsYourName();
        await this.answerWhereShouldWeSendResponse();
        await this.answerApplicantFullName();
        await this.answerApplicantDob();
        await this.answerApplicantCountryOfNationality();
        await this.answerWhatAreTheDetailsOfYourComplaint();
        await this.answerUploadDocuments();
    }

    async answerWhatIsYourName(): Promise<void> {
        await this.pages.ukvicWhatIsYourNamePage.assertPageTitle(this.page, await this.pages.ukvicWhatIsYourNamePage.expectedPageTitle());
        await this.pages.ukvicWhatIsYourNamePage.answerEnterYourName(c.NAME);
    }

    async answerWhatIsYourFullName(): Promise<void> {
        await this.pages.ukvicWhatIsYourFullNamePage.assertPageTitle(this.page, await this.pages.ukvicWhatIsYourFullNamePage.expectedPageTitle());
        await this.pages.ukvicWhatIsYourFullNamePage.answerEnterYourFullName(c.NAME);
    }

    async answerWhereShouldWeSendResponse(): Promise<void> {
        await this.pages.ukvicWhereShldWeSendOurResponsePage.assertPageTitle(this.page, await this.pages.ukvicWhereShldWeSendOurResponsePage.expectedPageTitle());
        await this.pages.ukvicWhereShldWeSendOurResponsePage.enterWhereToSendResponse(c.SAS_HOF_EMAIL, c.TELEPHONE);
    }

    async answerApplicantFullName(): Promise<void> {
        await this.pages.ukvicWhatIsApplicantFullnamePage.assertPageTitle(this.page, await this.pages.ukvicWhatIsApplicantFullnamePage.expectedPageTitle());
        await this.pages.ukvicWhatIsApplicantFullnamePage.answerEnterYourFullName(c.APPLICANT_FULL_NAME);
    }

    async answerApplicantDob(): Promise<void> {
        await this.pages.ukvicWhatIsApplicantDobPage.assertPageTitle(this.page, await this.pages.ukvicWhatIsApplicantDobPage.expectedPageTitle());
        await this.pages.ukvicWhatIsApplicantDobPage.enterApplicantDob(c.APPLICANT_DOB_11_11_1985);
    }

    async answerWhatIsYourDob(): Promise<void> {
        await this.pages.ukvicWhatIsYourDobPage.assertPageTitle(this.page, await this.pages.ukvicWhatIsYourDobPage.expectedPageTitle());
        await this.pages.ukvicWhatIsYourDobPage.enterYourDob(c.DOB_11_11_1988);
    }

    async answerApplicantCountryOfNationality(): Promise<void> {
        await this.pages.ukvicApplicantCountryOfNationalityPage.assertPageTitle(this.page, await this.pages.ukvicApplicantCountryOfNationalityPage.expectedPageTitle());
        await this.pages.ukvicApplicantCountryOfNationalityPage.selectApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
    }

    async answerWhatProbMakingAppointment(): Promise<void> {
        await this.pages.ukvicWhatProbYouHadMakingAppointmentPage.assertPageTitle(this.page, await this.pages.ukvicWhatProbYouHadMakingAppointmentPage.expectedPageTitle());
        switch (this.applicant.whatProbDidYouHaveMakingAppointment) {
            case c.DIFFICULTY_GETTING_APPOINTMENT:
                await this.pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem(c.DIFFICULTY_GETTING_APPOINTMENT);
                await this.answerWhereDidYouMakeYourApplication();
                break;
            case c.DIFFICULTY_CHANGING_APPOINTMENT:
                await this.pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem(c.DIFFICULTY_CHANGING_APPOINTMENT);
                await this.answerWhereDidYouMakeYourApplication();
                break;
            case c.TECHNICAL_ISSUES_WITH_BOOKING_APPOINTMENT:
                await this.pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem(c.TECHNICAL_ISSUES_WITH_BOOKING_APPOINTMENT);
                await this.answerWhereDidYouMakeYourApplication();
                break;
            case c.HAVE_QUESTION_ABT_MY_APPOINTMENT:
                await this.pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem(c.HAVE_QUESTION_ABT_MY_APPOINTMENT);
                await this.answerWhereDidYouMakeYourApplication();
                break;
            case c.SOMETHING_ELSE:
                await this.pages.ukvicWhatProbYouHadMakingAppointmentPage.answerSelectTheProblem(c.SOMETHING_ELSE);
                await this.answerWhichRefNumbDoYouHave();
                break;
            default:
                throw new Error("Selected option not found");
        }
    }

    async answerWhatAreYouWaitingFor(): Promise<void> {
        await this.pages.ukvicWhatAreYouWaitingForPage.assertPageTitle(this.page, await this.pages.ukvicWhatAreYouWaitingForPage.expectedPageTitle());
        const expectation = this.applicant.whatAreYouWaitingFor;
        if (same(expectation, c.Application_Decision)) {
            await this.pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Application_Decision);
            await this.answerWhereDidYouMakeYourApplication();
        } else if (same(expectation, c.Return_Some_Doc)) {
            await this.pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(c.Return_Some_Doc);
            await this.answerHaveYouAskedForDocsBack();
        } else {
            throw new Error("Selected option not found");
        }
    }

    async answerHaveYouAskedForDocsBack(): Promise<void> {
        await this.pages.ukvicHaveYouAskedForDocsBackPage.assertPageTitle(this.page, await this.pages.ukvicHaveYouAskedForDocsBackPage.expectedPageTitle());
        switch (this.applicant.haveYouAskedForDocsBack) {
            case c.YES_USING_ONLINE_FORM:
                await this.pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse(c.YES_USING_ONLINE_FORM);
                await this.answerIfYouWaitingForDocsToBeReturned();
                break;
            case c.YES_BY_PHONE_EMAIL_ETC:
                await this.pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse(c.YES_BY_PHONE_EMAIL_ETC);
                await this.answerIfYouHaveNotUsedOnlineServiceRequest();
                break;
            case c.RESPONSE_NO:
                await this.pages.ukvicHaveYouAskedForDocsBackPage.answerSelectResponse(c.RESPONSE_NO);
                await this.answerIfYouHaveNotUsedOnlineServiceRequest();
                break;
            default:
                throw new Error("Selected option not found");
        }
        await this.answerWhichRefNumbDoYouHave();
    }

    async answerIfYouHaveNotUsedOnlineServiceRequest(): Promise<void> {
        await this.pages.ukvicIfYouHaveNotUsedOnlineServiceRequestPage.assertPageTitle(this.page, await this.pages.ukvicIfYouHaveNotUsedOnlineServiceRequestPage.expectedPageTitle());
        await this.pages.ukvicIfYouHaveNotUsedOnlineServiceRequestPage.checkExternalLinkWorksOnPage();
        await this.pages.ukvicIfYouHaveNotUsedOnlineServiceRequestPage.selectContinueMakingComplaint();
    }

    async answerIfYouWaitingForDocsToBeReturned(): Promise<void> {
        await this.pages.ukvicIfYouAreWaitingForDocToBeReturnedPage.assertPageTitle(this.page, await this.pages.ukvicIfYouAreWaitingForDocToBeReturnedPage.expectedPageTitle());
        await this.pages.ukvicIfYouAreWaitingForDocToBeReturnedPage.selectContinueMakingComplaint();
    }

    async answerWasDecisionNegOrPositive(): Promise<void> {
        await this.pages.ukvicWasDecisionNegOrPositivePage.assertPageTitle(this.page, await this.pages.ukvicWasDecisionNegOrPositivePage.expectedPageTitle());
        if (same(this.applicant.wasDecisionNegativeOrPositive, c.NEGATIVE)) {
            await this.pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.NEGATIVE);
            await this.answerIfYouHaveQuestionsAbtNegDecision();
        } else {
            await this.pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(c.POSITIVE);
            await this.answerWhereDidYouMakeYourApplication();
        }
        await this.answerWhichRefNumbDoYouHave();
    }

    async answerIfYouHaveQuestionsAbtNegDecision(): Promise<void> {
        await this.pages.ukvicIfYouHaveQuestionsAbtNegDecisionPage.assertPageTitle(this.page, await this.pages.ukvicIfYouHaveQuestionsAbtNegDecisionPage.expectedPageTitle());
        await this.pages.ukvicIfYouHaveQuestionsAbtNegDecisionPage.checkExternalLinksAreWorkingOnPage();
        await this.pages.ukvicIfYouHaveQuestionsAbtNegDecisionPage.selectContinueMakingComplaint();
    }

    async answerIfYouHaveQuestionsAbtPositiveDecision(): Promise<void> {
        await this.pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.assertPageTitle(this.page, await this.pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.expectedPageTitle());
        await this.pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.checkExternalLinkWorksOnPage();
        await this.pages.ukvicIfYouHaveQuestAbtPositiveDecisionPage.selectContinueMakingComplaint();
    }

    async answerWhatIsTheProbWithTheBRP(): Promise<void> {
        await this.pages.ukvicWhatIsTheProblemWithTheBrpPage.assertPageTitle(this.page, await this.pages.ukvicWhatIsTheProblemWithTheBrpPage.expectedPageTitle());
        switch (this.applicant.whatIsTheProbWithTheBrp) {
            case c.HAS_NOT_ARRIVED:
                await this.pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem(c.HAS_NOT_ARRIVED);
                await this.answerIfBRPHasNotArrived();
                break;
            case c.IS_INCORRECT:
                await this.pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem(c.IS_INCORRECT);
                await this.answerIfBRPIsIncorrect();
                break;
            case c.SOMETHING_ELSE:
                await this.pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem(c.SOMETHING_ELSE);
                break;
            default:
                throw new Error("Selected option not found");
        }
        await this.answerWhichRefNumbDoYouHave();
    }

    async answerIfBRPHasNotArrived(): Promise<void> {
        await this.pages.ukvicIfBRPCardHasNotArrivedPage.assertPageTitle(this.page, await this.pages.ukvicIfBRPCardHasNotArrivedPage.expectedPageTitle());
        await this.pages.ukvicIfBRPCardHasNotArrivedPage.checkExternalLinkWorksOnPage();
        await this.pages.ukvicIfBRPCardHasNotArrivedPage.selectContinueMakingComplaint();
    }

    async answerIfBRPIsIncorrect(): Promise<void> {
        await this.pages.ukvicIfBRPCardIsIncorrectPage.assertPageTitle(this.page, await this.pages.ukvicIfBRPCardIsIncorrectPage.expectedPageTitle());
        await this.pages.ukvicIfBRPCardIsIncorrectPage.checkExternalLinkWorksOnPage();
        await this.pages.ukvicIfBRPCardIsIncorrectPage.selectContinueMakingComplaint();
    }

    async answerHaveYouRequestedRefund(): Promise<void> {
        await this.pages.ukvicHaveYouRequestedRefundPage.assertPageTitle(this.page, await this.pages.ukvicHaveYouRequestedRefundPage.expectedPageTitle());
        switch (this.applicant.haveYouRequestedARefund) {
            case c.RESPONSE_YES:
                await this.pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse(c.RESPONSE_YES);
                await this.answerWhenDidYouRequestRefund();
                break;
            case c.RESPONSE_NO:
                await this.pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse(c.RESPONSE_NO);
                await this.answerWhichTypeOfRefundYouRequest();
                break;
            case c.NOT_YET:
                await this.pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse(c.NOT_YET);
                await this.answerWhatAreYouWaitingToBeRefunded();
                break;
            default:
                throw new Error("Selected option not found");
        }
    }

    async answerWhenDidYouRequestRefund(): Promise<void> {
        await this.pages.ukvicWhenDidYouRequestRefundPage.assertPageTitle(this.page, await this.pages.ukvicWhenDidYouRequestRefundPage.expectedPageTitle());
        if (same(this.applicant.whenDidYouRequestRefund, c.Less_Than_6Wks)) {
            await this.pages.ukvicWhenDidYouRequestRefundPage.answerSelectResponse(c.Less_Than_6Wks);
        } else {
            await this.pages.ukvicWhenDidYouRequestRefundPage.answerSelectResponse(c.More_Than_6Wks);
            await this.answerWhichRefNumbDoYouHave();
        }
    }

    async pleaseWaitToReceiveYourRefund(waitForRefund: string): Promise<void> {
        await this.pages.ukvicIfYouRequestedRefundLess6WksAgoPage.assertPageTitle(this.page, await this.pages.ukvicIfYouRequestedRefundLess6WksAgoPage.expectedPageTitle());
        expect(await this.pages.ukvicIfYouRequestedRefundLess6WksAgoPage.getWaitForRefundMessage()).toBe(waitForRefund);
        await this.pages.ukvicIfYouRequestedRefundLess6WksAgoPage.exitApplication();
    }

    async answerWhichTypeOfRefundYouRequest(): Promise<void> {
        await this.pages.ukvicWhichTypeOfRefundIsRequestedPage.assertPageTitle(this.page, await this.pages.ukvicWhichTypeOfRefundIsRequestedPage.expectedPageTitle());
        switch (this.applicant.whichTypeOfRefundDoYouRequest) {
            case c.STANDARD_SERVICE_FEE:
                await this.pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType(c.STANDARD_SERVICE_FEE);
                await this.pages.ukvicIfYouRequestStdServRefundPage.assertPageTitle(this.page, await this.pages.ukvicIfYouRequestStdServRefundPage.expectedPageTitle());
                await this.pages.ukvicIfYouRequestStdServRefundPage.selectContinueMakingComplaint();
                await this.answerWhichRefNumbDoYouHave();
                break;
            case c.PRIORITY_SERVICE_FEE:
                await this.pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType(c.PRIORITY_SERVICE_FEE);
                await this.answerWhereDidYouMakeYourApplication();
                break;
            case c.SUPER_PRIORITY_SERVICE_FEE:
                await this.pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType(c.SUPER_PRIORITY_SERVICE_FEE);
                await this.answerWhereDidYouMakeYourApplication();
                break;
            case c.ADDED_VALUE_SERVICE_FEE:
                await this.pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType(c.ADDED_VALUE_SERVICE_FEE);
                await this.pages.ukvicIfYouRequestAddedValueServiceRefundPage.assertPageTitle(this.page, await this.pages.ukvicIfYouRequestAddedValueServiceRefundPage.expectedPageTitle());
                await this.pages.ukvicIfYouRequestAddedValueServiceRefundPage.checkExternalLinksAreWorkingOnPage();
                await this.pages.ukvicIfYouRequestAddedValueServiceRefundPage.selectContinueMakingComplaint();
                await this.answerWhichRefNumbDoYouHave();
                break;
            case c.IHS_SERVICE_FEE:
                await this.pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType(c.IHS_SERVICE_FEE);
                await this.answerWhereDidYouMakeYourApplication();
                break;
            case c.EU_SETTLEMENT_SCHEME_FEE:
                await this.pages.ukvicWhichTypeOfRefundIsRequestedPage.answerSelectRefundType(c.EU_SETTLEMENT_SCHEME_FEE);
                await this.answerIfWaitingForEuSettlementRefund();
                break;
            default:
                throw new Error("Selected option not found");
        }
    }

    async answerWhatAreYouWaitingToBeRefunded(): Promise<void> {
        await this.pages.ukvicWhatAreYouWaitingForToBeRefundedPage.assertPageTitle(this.page, await this.pages.ukvicWhatAreYouWaitingForToBeRefundedPage.expectedPageTitle());
        if (same(this.applicant.whatAreYouWaitingToBeRefunded, c.IHS_SERVICE_FEE)) {
            await this.pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.IHS_SERVICE_FEE);
            await this.answerWhereDidYouMakeYourApplication();
        } else {
            await this.pages.ukvicWhatAreYouWaitingForToBeRefundedPage.selectRefundYouAreWaitingFor(c.EU_SETTLEMENT_SCHEME_FEE);
            await this.answerIfWaitingForEuSettlementRefund();
        }
    }

    async answerIfWaitingForEuSettlementRefund(): Promise<void> {
        await this.pages.ukvicIfWaitingForEUSchemeFeeRefundPage.assertPageTitle(this.page, await this.pages.ukvicIfWaitingForEUSchemeFeeRefundPage.expectedPageTitle());
        await this.pages.ukvicIfWaitingForEUSchemeFeeRefundPage.checkExternalLinksAreWorkingOnPage();
        await this.pages.ukvicIfWaitingForEUSchemeFeeRefundPage.SelectContinueMakingComplaint();
        await this.answerWhichRefNumbDoYouHave();
    }

    async answerWhereDidYouExpPoorBehaviour(): Promise<void> {
        await this.pages.ukvicWhereDidYouExpPoorBehaviourPage.assertPageTitle(this.page, await this.pages.ukvicWhereDidYouExpPoorBehaviourPage.expectedPageTitle());
        switch (this.applicant.whereDidYouExpPoorBehaviour) {
            case c.IN_PERSON:
                await this.pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen(c.IN_PERSON);
                await this.answerWhereDidTheIncidentTakePlace();
                break;
            case c.ON_THE_PHONE:
                await this.pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen(c.ON_THE_PHONE);
                await this.answerWhatTelephoneNumWasCalled();
                await this.answerWhenWasTheCallMade();
                await this.answerWhatNumbWasCallMadeFrom();
                await this.answerWhichRefNumbDoYouHave();
                break;
            case c.IN_A_LETTER_OR_EMAIL:
                await this.pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen(c.IN_A_LETTER_OR_EMAIL);
                await this.answerWhichRefNumbDoYouHave();
                break;
            default:
                throw new Error("Selected option not found");
        }
    }

    async answerWhereDidTheIncidentTakePlace(): Promise<void> {
        await this.pages.ukvicWhereDidTheIncidentHappenPage.assertPageTitle(this.page, await this.pages.ukvicWhereDidTheIncidentHappenPage.expectedPageTitle());
        switch (this.applicant.whereDidTheIncidentTakePlace) {
            case c.OUTSIDE_UK_VISA_CENTRE:
                await this.pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace(c.OUTSIDE_UK_VISA_CENTRE);
                await this.answerWhereIsTheVisaApplyCentre();
                break;
            case c.IN_UK_VISA_SERVICE_SUPPORT_CENTRE:
                await this.pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace(c.IN_UK_VISA_SERVICE_SUPPORT_CENTRE);
                await this.answerWhereInUkIsTheServiceSupportCentre();
                break;
            case c.IN_UK_VISA_CITIZEN_SERVICE_POINT:
                await this.pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace(c.IN_UK_VISA_CITIZEN_SERVICE_POINT);
                await this.answerWhereInUkIsTheServicePoint();
                break;
            default:
                throw new Error("Selected option not found");
        }
        await this.answerWhichRefNumbDoYouHave();
    }

    async answerWhereIsTheVisaApplyCentre(): Promise<void> {
        await this.pages.ukvicWhereIsTheVisaApplyCentrePage.assertPageTitle(this.page, await this.pages.ukvicWhereIsTheVisaApplyCentrePage.expectedPageTitle());
        await this.pages.ukvicWhereIsTheVisaApplyCentrePage.answerEnterYourCApplicationCenter(c.OVERSEAS_COUNTRY, c.CITY);
    }

    async answerWhereInUkIsTheServiceSupportCentre(): Promise<void> {
        await this.pages.ukvicWhereInUkIsServiceSupportCentrePage.assertPageTitle(this.page, await this.pages.ukvicWhereInUkIsServiceSupportCentrePage.expectedPageTitle());
        await this.pages.ukvicWhereInUkIsServiceSupportCentrePage.answerEnterServiceSupportCentre(c.CITY);
    }

    async answerWhereInUkIsTheServicePoint(): Promise<void> {
        await this.pages.ukvicWhereInUkIsServicePointPage.assertPageTitle(this.page, await this.pages.ukvicWhereInUkIsServicePointPage.expectedPageTitle());
        await this.pages.ukvicWhereInUkIsServicePointPage.answerEnterServiceSupportCentre(c.CITY);
    }

    async answerWhatTelephoneNumWasCalled(): Promise<void> {
        await this.pages.ukvicWhatTelephoneNumWasCalledPage.assertPageTitle(this.page, await this.pages.ukvicWhatTelephoneNumWasCalledPage.expectedPageTitle());
        await this.pages.ukvicWhatTelephoneNumWasCalledPage.answerEnterCalledNumber(c.TELEPHONE);
    }

    async answerWhenWasTheCallMade(): Promise<void> {
        await this.pages.ukvicWhenWasTheCallPage.assertPageTitle(this.page, await this.pages.ukvicWhenWasTheCallPage.expectedPageTitle());
        await this.pages.ukvicWhenWasTheCallPage.answerEnterCalledDate(c.CALL_DATE);
        await this.pages.ukvicWhenWasTheCallPage.answerEnterCalledTime(c.CALL_TIME);
    }

    async answerWhatNumbWasCallMadeFrom(): Promise<void> {
        await this.pages.ukvicWhatNumbWasTheCallMadeFromPage.assertPageTitle(this.page, await this.pages.ukvicWhatNumbWasTheCallMadeFromPage.expectedPageTitle());
        await this.pages.ukvicWhatNumbWasTheCallMadeFromPage.answerEnterTheTelPhone(c.TELEPHONE);
    }

    async answerDoYouHaveRefNumbForTheComplaint(): Promise<void> {
        await this.pages.ukvicDoYouHaveRefNoForComplaintPage.assertPageTitle(this.page, await this.pages.ukvicDoYouHaveRefNoForComplaintPage.expectedPageTitle());
        if (same(this.applicant.doYouHaveARefNumbForTheComplaint, c.RESPONSE_YES)) {
            await this.pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_YES);
            await this.answerWhatIsTheRefNumForYourComplaint();
            await this.answerWhatWasYourOriginalApplyAbt();
        } else {
            await this.pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(c.RESPONSE_NO);
            await this.answerWhatWasYourOriginalApplyAbt();
        }
    }

    async answerWhatIsTheRefNumForYourComplaint(): Promise<void> {
        await this.pages.ukvicWhatIsYourComplaintRefNoPage.assertPageTitle(this.page, await this.pages.ukvicWhatIsYourComplaintRefNoPage.expectedPageTitle());
        await this.pages.ukvicWhatIsYourComplaintRefNoPage.answerEnterComplaintRefNo(c.REF_NUMBER);
    }

    async answerWhatAreTheDetailsOfYourComplaint(): Promise<void> {
        await this.pages.ukvicWhatAreDetailsOfYourComplainPage.assertPageTitle(this.page, await this.pages.ukvicWhatAreDetailsOfYourComplainPage.expectedPageTitle());
        await this.pages.ukvicWhatAreDetailsOfYourComplainPage.answerEnterComplaintDetails(c.COMPLAINT_DETAILS);
    }

    async answerUploadDocuments(): Promise<void> {
        await this.pages.ukvicUploadDocumentsPage.assertPageTitle(this.page, await this.pages.ukvicUploadDocumentsPage.expectedPageTitle());
        await this.pages.ukvicUploadDocumentsPage.answerFileToUpload(resolve(__dirname, '../test-data/user-upload-files', c.UPLOAD_FILE_NAME));
    }

    async answerWhatWasYourOriginalApplyAbt(): Promise<void> {
        await this.pages.ukvicWhatWasYourOriginalComplaintAbtPage.assertPageTitle(this.page, await this.pages.ukvicWhatWasYourOriginalComplaintAbtPage.expectedPageTitle());
        switch (this.applicant.whatWasYourOriginalComplaintAbt) {
            case c.SUBMITTING_AN_APPLICATION:
                await this.pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint(c.SUBMITTING_AN_APPLICATION);
                break;
            case c.MAKING_AN_APPOINTMENT:
                await this.pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint(c.MAKING_AN_APPOINTMENT);
                break;
            case c.WAITING_FOR_A_DECISION:
                await this.pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint(c.WAITING_FOR_A_DECISION);
                break;
            case c.NEG_OR_POSITIVE_DECISION:
                await this.pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint(c.NEG_OR_POSITIVE_DECISION);
                break;
            case c.IMMIGRATION_STATUS_CHANGE:
                await this.pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint(c.IMMIGRATION_STATUS_CHANGE);
                break;
            case c.BRP_PERMITS:
                await this.pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint(c.BRP_PERMITS);
                break;
            case c.REFUNDS:
                await this.pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint(c.REFUNDS);
                break;
            case c.STAFF_BEHAVIOR:
                await this.pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint(c.STAFF_BEHAVIOR);
                break;
            case c.SOMETHING_ELSE:
                await this.pages.ukvicWhatWasYourOriginalComplaintAbtPage.answerSelectYourOriginalComplaint(c.SOMETHING_ELSE);
                break;
            default:
                throw new Error("Selected option not found");
        }
        await this.answerAreYouMakingComplaintOnBehalfOfSomeoneElse();
    }

    async answerWhatIsYourCountryOfNationality(): Promise<void> {
        await this.pages.ukvicWhatIsYourCountryOfNationalityPage.assertPageTitle(this.page, await this.pages.ukvicWhatIsYourCountryOfNationalityPage.expectedPageTitle());
        await this.pages.ukvicWhatIsYourCountryOfNationalityPage.answerEnterYourNationality(c.COUNTRY_OF_NATIONALITY);
    }

    async answerWhatAreYourContactDetails(): Promise<void> {
        await this.pages.ukvicWhatAreYourContactDetailsPage.assertPageTitle(this.page, await this.pages.ukvicWhatAreYourContactDetailsPage.expectedPageTitle());
        await this.pages.ukvicWhatAreYourContactDetailsPage.enterYourContacts(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
    }

    async answerCheckYourAnswers(): Promise<void> {
        await this.pages.ukvicCheckYourAnswersPage.assertPageTitle(this.page, await this.pages.ukvicCheckYourAnswersPage.expectedPageTitle());
        await this.pages.ukvicCheckYourAnswersPage.isCheckYourAnsHeaderTextDisplayed();
        await this.pages.ukvicCheckYourAnswersPage.answerSendComplaint();
    }

    async verifySubmission(): Promise<void> {
        expect(await this.pages.ukvicCheckYourAnswersPage.verifyComplaintIsSubmittedSuccessfully()).toBe(true);
    }

    async navigateBackward(): Promise<void> {
        await this.pages.basePage.navigateBackLink.click();
    }

    async ansSelectAJourney(journey: string): Promise<void> {
        await this.pages.ukvicHomePageWhatIsTheComplaintAbtPage.answerSelectYourComplaint(journey);
    }

    async ansProbWithApplyProcess(theProb: string): Promise<void> {
        await this.pages.ukvicWhatWasTheProbWithApplyProcessPage.answerSelectTheProbWithTheApplyProcess(theProb);
    }

    async ansWhereDidYouApply(location: string): Promise<void> {
        await this.pages.ukvicWhereDidYouApplyPage.answerSelectWhereYouApplied(location);
    }

    async ansContinueMakingComplaint(): Promise<void> {
        await this.pages.ukvicIfHardToGetAppointmentPage.selectContinueMakingComplaint();
    }

    async ansProvideRefNumYouHave(option: string): Promise<void> {
        await this.pages.ukvicWhichRefNumDoYouHavePage.answerProvideNumbIfAny(option, c.REF_NUMBER);
    }

    async ansMakingComplaintBehalfOfSomeone(option: string): Promise<void> {
        await this.pages.ukvicMakingComplaintBehalfOfSomeonePage.answerSelectYourComplaint(option);
    }

    async ansYourRelationToApplicant(relationToApplicant: string): Promise<void> {
        await this.pages.ukvicWhatIsYourRelationToApplicantPage.answerSelectYourRelationToApplicant(relationToApplicant);
    }

    async ansWhatIsYourName(): Promise<void> {
        await this.pages.ukvicWhatIsYourNamePage.answerEnterYourName(c.NAME);
    }

    async ansWhereToSendOurResponse(email: string): Promise<void> {
        await this.pages.ukvicWhereShldWeSendOurResponsePage.enterWhereToSendResponse(email, c.TELEPHONE);
    }

    async ansWhatIsApplicantFullName(): Promise<void> {
        await this.pages.ukvicWhatIsApplicantFullnamePage.answerEnterYourFullName(c.APPLICANT_FULL_NAME);
    }

    async ansWhatIsYourDob(dob: string): Promise<void> {
        await this.pages.ukvicWhatIsYourDobPage.enterYourDob(dob);
    }

    async ansApplicantCountryOfNationality(): Promise<void> {
        await this.pages.ukvicApplicantCountryOfNationalityPage.selectApplicantCountryOfNationality(c.COUNTRY_OF_NATIONALITY);
    }

    async ansEnterNationalityAndCity(): Promise<void> {
        await this.pages.ukvicWhereIsTheVisaApplyCentrePage.answerEnterYourCApplicationCenter(c.OVERSEAS_COUNTRY, c.CITY);
    }

    async ansWhatAreDetailsOfYourComplaint(): Promise<void> {
        await this.pages.ukvicWhatAreDetailsOfYourComplainPage.answerEnterComplaintDetails(c.COMPLAINT_DETAILS);
    }

    async ansWhatAreYouWaitingFor(option: string): Promise<void> {
        await this.pages.ukvicWhatAreYouWaitingForPage.selectWhatYouAreWaitingFor(option);
    }

    async ansWhenDidYouSubmitApplication(month: string): Promise<void> {
        await this.pages.ukvicWhenDidYouSubmitYourApplicationPage.enterDateOrMonth(month);
    }

    async ansWasDecisionNegOrPositive(decision: string): Promise<void> {
        await this.pages.ukvicWasDecisionNegOrPositivePage.answerSelectDecision(decision);
    }

    async ansWhatIsTheProblemWithTheBrp(brpProb: string): Promise<void> {
        await this.pages.ukvicWhatIsTheProblemWithTheBrpPage.answerSelectTheProblem(brpProb);
    }

    async ansHaveYouRequestedRefund(requestedRefund: string): Promise<void> {
        await this.pages.ukvicHaveYouRequestedRefundPage.answerSelectResponse(requestedRefund);
    }

    async ansWhenDidYouRequestRefund(requestedRefundWhen: string): Promise<void> {
        await this.pages.ukvicWhenDidYouRequestRefundPage.answerSelectResponse(requestedRefundWhen);
    }

    async ansWhereDidYouExpPoorBehaviour(where: string): Promise<void> {
        await this.pages.ukvicWhereDidYouExpPoorBehaviourPage.answerSelectWhereBehaviourHappen(where);
    }

    async ansWhereDidTheIncidentHappen(incidentPlace: string): Promise<void> {
        await this.pages.ukvicWhereDidTheIncidentHappenPage.answerSelectWhereIncidentTakePlace(incidentPlace);
    }

    async ansDoYouHaveRefNoForComplaint(option: string): Promise<void> {
        await this.pages.ukvicDoYouHaveRefNoForComplaintPage.answerHaveRefNo(option);
    }

    async ansWhatIsYourComplaintRefNo(): Promise<void> {
        await this.pages.ukvicWhatIsYourComplaintRefNoPage.answerEnterComplaintRefNo(c.REF_NUMBER);
    }
}

export const { Given, When, Then } = createBdd(test);

Given("I visit the Ukvic page", async ({ ukvic }) => {
    await ukvic.openUkviComplaintHomePage();
});

When('I fill out my answers for the Ukvic form pertaining to {string}', async ({ ukvic }, description: string) => {
    ukvic.selectScenario(description);
    await ukvic.selectYourComplaintTypeAndCompleteForm();
});

Then("I am able to submit the Ukvic form", async ({ ukvic }) => {
    ukvic.assertSelectedDescription();
    await ukvic.verifySubmission();
});

When("I select 'Continue making your complaint' link for ukvic", async ({ ukvic }) => {
    await ukvic.ansContinueMakingComplaint();
});

When("I enter applicant's full name and click continue", async ({ ukvic }) => {
    await ukvic.ansWhatIsApplicantFullName();
});

When("I select applicant's country of nationality and click continue", async ({ ukvic }) => {
    await ukvic.ansApplicantCountryOfNationality();
});

When("I enter country of nationality and city and click continue", async ({ ukvic }) => {
    await ukvic.ansEnterNationalityAndCity();
});

When("I enter details of complaint and click continue", async ({ ukvic }) => {
    await ukvic.ansWhatAreDetailsOfYourComplaint();
});

When("I upload a document and click continue", async ({ ukvic }) => {
    await ukvic.answerUploadDocuments();
});

When("I enter my name and click continue", async ({ ukvic }) => {
    await ukvic.ansWhatIsYourName();
});

When("I select the 'Back' button", async ({ ukvic }) => {
    await ukvic.navigateBackward();
});

When("I enter complaint reference number and click continue", async ({ ukvic }) => {
    await ukvic.ansWhatIsYourComplaintRefNo();
});

Then('I see wait to receive fund {string} message', async ({ ukvic }, message: string) => {
    ukvic.assertSelectedDescription();
    await ukvic.pleaseWaitToReceiveYourRefund(message);
});


Then("I should see check my answers page", async ({ ukvic }) => {
    ukvic.assertSelectedDescription();
    await ukvic.answerCheckYourAnswers();
});
    
When('I select original complaint {string} and click continue', async ({ ukvic }, journey: string) => {
    await ukvic.ansSelectAJourney(journey);
});

When('I select {string} to start my application and click continue', async ({ ukvic }, journey: string) => {
    await ukvic.ansSelectAJourney(journey);
});

When('I select the problem {string} and click continue', async ({ ukvic }, problem: string) => {
    await ukvic.ansProbWithApplyProcess(problem);
});

When('I select {string} with a reference number and click continue', async ({ ukvic }, reference: string) => {
    await ukvic.ansProvideRefNumYouHave(reference);
});

When('I enter email address {string} and click continue for ukvic', async ({ ukvic }, email: string) => {
    await ukvic.ansWhereToSendOurResponse(email);
});

When("I enter applicant's date of birth {string} and click continue", async ({ ukvic }, dob: string) => {
    await ukvic.ansWhatIsYourDob(dob);
});

When('I select where applicant applied {string} and click continue', async ({ ukvic }, location: string) => {
    await ukvic.ansWhereDidYouApply(location);
});

When('I select complaint on behalf {string} and click continue', async ({ ukvic }, option: string) => {
    await ukvic.ansMakingComplaintBehalfOfSomeone(option);
});

When('I select relation to applicant {string} and click continue', async ({ ukvic }, relation: string) => {
    await ukvic.ansYourRelationToApplicant(relation);
});

When('I select what I am waiting for {string} and click continue', async ({ ukvic }, waitingFor: string) => {
    await ukvic.ansWhatAreYouWaitingFor(waitingFor);
});

When('I enter date {string} application was submitted and click continue', async ({ ukvic }, month: string) => {
    await ukvic.ansWhenDidYouSubmitApplication(month);
});

When('I select type of decision {string} and click continue', async ({ ukvic }, decision: string) => {
    await ukvic.ansWasDecisionNegOrPositive(decision);
});

When('I select the BRP problem {string} and click continue', async ({ ukvic }, problem: string) => {
    await ukvic.ansWhatIsTheProblemWithTheBrp(problem);
});

When('I answer have you requested a refund {string} and click continue', async ({ ukvic }, requested: string) => {
    await ukvic.ansHaveYouRequestedRefund(requested);
});

When('I answer when did you request a refund {string} and click continue', async ({ ukvic }, when: string) => {
    await ukvic.ansWhenDidYouRequestRefund(when);
});

When('I answer where did you experience poor behaviour {string} and click continue', async ({ ukvic }, where: string) => {
    await ukvic.ansWhereDidYouExpPoorBehaviour(where);
});

When('I select where incident took place {string} and click continue', async ({ ukvic }, location: string) => {
    await ukvic.ansWhereDidTheIncidentHappen(location);
});

When('I answer do you have ref number for the complaint {string} and click continue', async ({ ukvic }, option: string) => {
    await ukvic.ansDoYouHaveRefNoForComplaint(option);
});
