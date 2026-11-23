import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhatIsApplicantDobPage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What is the applicant’s date of birth? – UK Visas and Immigration complaints – GOV.UK" : "What is the applicant’s date of birth? – UK Visas and Immigration complaints – GOV.UK";
    }

    async enterApplicantDob(dob: string): Promise<void> {
        await this.enterDateOrDob(dob);
        await this.clickContinueButton();
    }

    async answerApplicantDob(applicantDob_11_11_1985: string): Promise<void> {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.enterApplicantDob(applicantDob_11_11_1985);
    }
}
