import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhereDidYouMakeTheApplicationPage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: Where did you make the application? – UK Visas and Immigration complaints – GOV.UK" : "Where did you make the application? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerSelectWhereYouApplied(whereYouApplied: string): Promise<void> {
        await this.selectOption(whereYouApplied);
        await this.clickContinueButton();
    }
}
