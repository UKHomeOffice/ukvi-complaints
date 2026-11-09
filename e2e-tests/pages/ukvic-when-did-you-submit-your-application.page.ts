import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhenDidYouSubmitYourApplicationPage extends basePage {
    readonly dateApplied: Locator;

    constructor(page: Page) {
        super(page);
        this.dateApplied = page.locator("input#when-applied");
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: When did you submit your application? – UK Visas and Immigration complaints – GOV.UK" : "When did you submit your application? – UK Visas and Immigration complaints – GOV.UK";
    }

    async enterDateOrMonth(dateOrMonth: string): Promise<void> {
        await this.type(this.dateApplied, dateOrMonth);
        await this.clickContinueButton();
    }
}
