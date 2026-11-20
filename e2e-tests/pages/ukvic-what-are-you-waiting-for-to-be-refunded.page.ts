import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhatAreYouWaitingForToBeRefundedPage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What are you waiting to be refunded? – UK Visas and Immigration complaints – GOV.UK" : "What are you waiting to be refunded? – UK Visas and Immigration complaints – GOV.UK";
    }

    async selectRefundYouAreWaitingFor(refundWaifingFor: string): Promise<void> {
        await this.selectOption(refundWaifingFor);
        await this.clickContinueButton();
    }
}
