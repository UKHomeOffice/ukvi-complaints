import { expect, Locator, Page } from '@playwright/test';
import { ukviCommonPage } from './ukvi-common.page';

export class ukvicWhatAreYourContactDetailsPage extends ukviCommonPage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What are your contact details? – UK Visas and Immigration complaints – GOV.UK" : "What are your contact details? – UK Visas and Immigration complaints – GOV.UK";
    }

    async enterYourContacts(emailAdd: string, phoneNo: string): Promise<void> {
        await this.enterYourContactDetails(emailAdd, phoneNo);
    }
}
