import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhatIsYourDobPage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What is your date of birth? – UK Visas and Immigration complaints – GOV.UK" : "What is your date of birth? – UK Visas and Immigration complaints – GOV.UK";
    }

    async enterYourDob(dob: string): Promise<void> {
        await this.enterDateOrDob(dob);
        await this.clickContinueButton();
    }
}
