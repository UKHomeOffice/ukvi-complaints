import { expect, Locator, Page } from '@playwright/test';
import { ukviCommonPage } from './ukvi-common.page';

export class ukvicWhereShldWeSendOurResponsePage extends ukviCommonPage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: Where should we send our response? – UK Visas and Immigration complaints – GOV.UK" : "Where should we send our response? – UK Visas and Immigration complaints – GOV.UK";
    }

    async enterWhereToSendResponse(emailAdd: string, phoneNo: string): Promise<void> {
        await this.enterYourContactDetails(emailAdd, phoneNo);
    }
}
