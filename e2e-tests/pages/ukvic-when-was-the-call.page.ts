import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhenWasTheCallPage extends basePage {
    readonly calledDate: Locator;
    readonly calledTime: Locator;

    constructor(page: Page) {
        super(page);
        this.calledDate = page.locator("input#called-date");
        this.calledTime = page.locator("input#called-time");
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: When was the call made? – UK Visas and Immigration complaints – GOV.UK" : "When was the call made? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerEnterCalledDate(dateOfCall: string): Promise<void> {
        await this.type(this.calledDate, dateOfCall);
        await this.clickContinueButton();
    }

    async answerEnterCalledTime(timeOfCall: string): Promise<void> {
        await this.type(this.calledTime, timeOfCall);
        await this.clickContinueButton();
    }
}
