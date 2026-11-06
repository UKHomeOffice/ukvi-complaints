import { expect, Locator, Page } from '@playwright/test';
import { ukviCommonPage } from './ukvi-common.page';

export class ukvicIfWaitingForEUSchemeFeeRefundPage extends ukviCommonPage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: If you’re waiting to be refunded for the EU Settlement Scheme fee – UK Visas and Immigration complaints – GOV.UK" : "If you’re waiting to be refunded for the EU Settlement Scheme fee – UK Visas and Immigration complaints – GOV.UK";
    }

    async SelectContinueMakingComplaint(): Promise<void> {
        await this.selectContinueMakingComplaintAndProceed();
    }

    async checkExternalLinksAreWorkingOnPage(): Promise<boolean> {
        await this.checkExternalLink("Contact the EU Settlement Resolution Centre");
        return true;
    }
}
