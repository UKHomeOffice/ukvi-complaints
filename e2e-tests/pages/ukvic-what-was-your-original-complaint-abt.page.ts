import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhatWasYourOriginalComplaintAbtPage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What was your original complaint about? – UK Visas and Immigration complaints – GOV.UK" : "What was your original complaint about? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerSelectYourOriginalComplaint(complaint: string): Promise<void> {
        await this.selectOption(complaint);
        await this.clickContinueButton();
    }
}
