import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhatWasTheProbWithApplyProcessPage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What was the problem with the application process? – UK Visas and Immigration complaints – GOV.UK" : "What was the problem with the application process? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerSelectTheProbWithTheApplyProcess(problem: string): Promise<void> {
        await this.selectOption(problem);
        await this.clickContinueButton();
    }
}
