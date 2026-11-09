import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhereShldWeSendOurResponsePage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: Where should we send our response? – UK Visas and Immigration complaints – GOV.UK" : "Where should we send our response? – UK Visas and Immigration complaints – GOV.UK";
    }

    async enterWhereToSendResponse(emailAdd: string, phoneNo: string): Promise<void> {
        await this.type(this.emailAddress, emailAdd);
        await this.type(this.phoneNumb, phoneNo);
        await this.clickContinueButton();
    }

    async answerWhereShouldWeSendResponse(sasHofEmail: string, telephone: string): Promise<void> {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.enterWhereToSendResponse(sasHofEmail, telephone);
    }
}
