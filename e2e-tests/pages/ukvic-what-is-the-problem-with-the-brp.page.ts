import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhatIsTheProblemWithTheBrpPage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What is the problem with the BRP? – UK Visas and Immigration complaints – GOV.UK" : "What is the problem with the BRP? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerSelectTheProblem(theProblem: string): Promise<void> {
        await this.selectOption(theProblem);
        await this.clickContinueButton();
    }
}
