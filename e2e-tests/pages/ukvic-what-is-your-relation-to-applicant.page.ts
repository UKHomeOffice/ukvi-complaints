import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhatIsYourRelationToApplicantPage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What is your relation to the applicant? – UK Visas and Immigration complaints – GOV.UK" : "What is your relation to the applicant? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerSelectYourRelationToApplicant(label: string): Promise<void> {
        await this.selectOption(label);
        await this.clickContinueButton();
    }
}
