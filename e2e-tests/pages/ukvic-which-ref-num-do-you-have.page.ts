import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhichRefNumDoYouHavePage extends basePage {
    readonly referenceNumberInput: Locator;

    constructor(page: Page) {
        super(page);
        this.referenceNumberInput = page.locator(".govuk-radios__conditional:not(.govuk-radios__conditional--hidden) input[type=text]");
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: Which, if any, of the following reference numbers do you have? – UK Visas and Immigration complaints – GOV.UK" : "Which, if any, of the following reference numbers do you have? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerProvideNumbIfAny(label: string, refNumb: string): Promise<void> {
        await this.selectOption(label);
        await this.type(this.referenceNumberInput, refNumb);
        await this.clickContinueButton();
    }

    async answerDontHaveRefNumb(label: string): Promise<void> {
        await this.selectOption(label);
        await this.clickContinueButton();
    }
}
