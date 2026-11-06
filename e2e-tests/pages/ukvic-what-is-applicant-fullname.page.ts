import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhatIsApplicantFullnamePage extends basePage {
    readonly name: Locator;

    constructor(page: Page) {
        super(page);
        this.name = page.locator("input[id$=name]");
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What is the applicant’s full name? – UK Visas and Immigration complaints – GOV.UK" : "What is the applicant’s full name? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerEnterYourFullName(fullName: string): Promise<void> {
        await this.type(this.name, fullName);
        await this.clickContinueButton();
    }
}
