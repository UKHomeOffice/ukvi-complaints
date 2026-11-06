import { expect, Locator, Page } from '@playwright/test';
import { ukviCommonPage } from './ukvi-common.page';

export class ukvicIfWantToChangeYourAppointmentPage extends ukviCommonPage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: If you want to change your appointment – UK Visas and Immigration complaints – GOV.UK" : "If you want to change your appointment – UK Visas and Immigration complaints – GOV.UK";
    }

    async selectContinueMakingComplaint(): Promise<void> {
        await this.selectContinueMakingComplaintAndProceed();
    }

    async checkExternalLinkWorksOnPage(): Promise<boolean> {
        return this.contactUkVisasForHelpLink();
    }
}
