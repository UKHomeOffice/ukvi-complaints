import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWasDecisionNegOrPositivePage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: Was the decision negative or positive? – UK Visas and Immigration complaints – GOV.UK" : "Was the decision negative or positive? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerSelectDecision(decision: string): Promise<void> {
        await this.selectOption(decision);
        await this.clickContinueButton();
    }
}
