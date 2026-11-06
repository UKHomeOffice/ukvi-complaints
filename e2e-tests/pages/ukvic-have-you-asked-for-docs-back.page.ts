import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicHaveYouAskedForDocsBackPage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: Have you asked for the documents back? – UK Visas and Immigration complaints – GOV.UK" : "Have you asked for the documents back? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerSelectResponse(response: string): Promise<void> {
        await this.selectOption(response);
        await this.clickContinueButton();
    }
}
