import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhichTypeOfRefundIsRequestedPage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: Which type of refund do you want to request? – UK Visas and Immigration complaints – GOV.UK" : "Which type of refund do you want to request? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerSelectRefundType(refund: string): Promise<void> {
        await this.selectOption(refund);
        await this.clickContinueButton();
    }
}
