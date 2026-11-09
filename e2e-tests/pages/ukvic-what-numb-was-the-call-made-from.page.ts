import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhatNumbWasTheCallMadeFromPage extends basePage {
    readonly calledFrom: Locator;

    constructor(page: Page) {
        super(page);
        this.calledFrom = page.locator("input#called-from");
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What number was the call made from? – UK Visas and Immigration complaints – GOV.UK" : "What number was the call made from? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerEnterTheTelPhone(telPhoneNo: string): Promise<void> {
        await this.type(this.calledFrom, telPhoneNo);
        await this.clickContinueButton();
    }

    async answerWhatNumbWasCallMadeFrom(telephone: string): Promise<void> {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.answerEnterTheTelPhone(telephone);
    }
}
