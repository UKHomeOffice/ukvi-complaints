import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicDoYouHaveRefNoForComplaintPage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: Do you have a reference number for the complaint? – UK Visas and Immigration complaints – GOV.UK" : "Do you have a reference number for the complaint? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerHaveRefNo(ans: string): Promise<void> {
        await this.selectOption(ans);
        await this.clickContinueButton();
    }
}
