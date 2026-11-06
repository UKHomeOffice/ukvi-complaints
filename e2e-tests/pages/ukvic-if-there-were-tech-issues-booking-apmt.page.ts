import { expect, Locator, Page } from '@playwright/test';
import { ukviCommonPage } from './ukvi-common.page';

export class ukvicIfThereWereTechIssuesBookingApmtPage extends ukviCommonPage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: If there were technical issues with booking an appointment – UK Visas and Immigration complaints – GOV.UK" : "If there were technical issues with booking an appointment – UK Visas and Immigration complaints – GOV.UK";
    }

    async selectContinueMakingComplaint(): Promise<void> {
        await this.selectContinueMakingComplaintAndProceed();
    }

    async checkExternalLinkWorksOnPage(): Promise<boolean> {
        return this.contactUkVisasForHelpLink();
    }
}
