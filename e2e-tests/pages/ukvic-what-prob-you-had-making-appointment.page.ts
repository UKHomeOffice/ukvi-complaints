import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhatProbYouHadMakingAppointmentPage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What problem did you have making an appointment? – UK Visas and Immigration complaints – GOV.UK" : "What problem did you have making an appointment? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerSelectTheProblem(problem: string): Promise<void> {
        await this.selectOption(problem);
        await this.clickContinueButton();
    }
}
