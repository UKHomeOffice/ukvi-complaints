import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicMakingComplaintBehalfOfSomeonePage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: Are you making this complaint on behalf of someone else? – UK Visas and Immigration complaints – GOV.UK" : "Are you making this complaint on behalf of someone else? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerSelectYourComplaint(consent: string): Promise<void> {
        await this.selectOption(consent);
        await this.clickContinueButton();
    }
}
