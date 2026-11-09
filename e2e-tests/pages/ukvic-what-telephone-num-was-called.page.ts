import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhatTelephoneNumWasCalledPage extends basePage {
    readonly calledNumb: Locator;

    constructor(page: Page) {
        super(page);
        this.calledNumb = page.locator("input#called-number");
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What telephone number was called? – UK Visas and Immigration complaints – GOV.UK" : "What telephone number was called? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerEnterCalledNumber(phoneNo: string): Promise<void> {
        await this.type(this.calledNumb, phoneNo);
        await this.clickContinueButton();
    }

    async answerWhatTelephoneNumWasCalled(telephone: string): Promise<void> {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.answerEnterCalledNumber(telephone);
    }
}
