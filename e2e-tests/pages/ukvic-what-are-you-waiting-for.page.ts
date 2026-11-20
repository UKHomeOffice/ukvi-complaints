import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhatAreYouWaitingForPage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What are you waiting for? – UK Visas and Immigration complaints – GOV.UK" : "What are you waiting for? – UK Visas and Immigration complaints – GOV.UK";
    }

    async selectWhatYouAreWaitingFor(waitingFor: string): Promise<void> {
        await this.selectOption(waitingFor);
        await this.clickContinueButton();
    }
}
