import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhatIsYourNamePage extends basePage {
    readonly name: Locator;

    constructor(page: Page) {
        super(page);
        this.name = page.locator("input[id$=name]");
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What is your name? – UK Visas and Immigration complaints – GOV.UK" : "What is your name? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerEnterYourName(yourName: string): Promise<void> {
        await this.type(this.name, yourName);
        await this.clickContinueButton();
    }

    async answerWhatIsYourName(name: string): Promise<void> {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.answerEnterYourName(name);
    }
}
