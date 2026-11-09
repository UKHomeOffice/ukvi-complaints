import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhatAreYourContactDetailsPage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What are your contact details? – UK Visas and Immigration complaints – GOV.UK" : "What are your contact details? – UK Visas and Immigration complaints – GOV.UK";
    }

    async enterYourContacts(emailAdd: string, phoneNo: string): Promise<void> {
        await this.type(this.emailAddress, emailAdd);
        await this.type(this.phoneNumb, phoneNo);
        await this.clickContinueButton();
    }

    async answerWhatAreYourContactDetails(contactEmailAddress: string, contactTelephone: string): Promise<void> {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.enterYourContacts(contactEmailAddress, contactTelephone);
    }
}
