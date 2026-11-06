import { expect, Locator, Page } from '@playwright/test';
import { ukviCommonPage } from './ukvi-common.page';

export class ukvicIfYouRequestAddedValueServiceRefundPage extends ukviCommonPage {
    readonly contactUkVisasForHelp: Locator;

    constructor(page: Page) {
        super(page);
        this.contactUkVisasForHelp = page.getByRole('heading', { name: "Contact UK Visas and Immigration for help", level: 1, exact: true });
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: If you want to request an added value service refund – UK Visas and Immigration complaints – GOV.UK" : "If you want to request an added value service refund – UK Visas and Immigration complaints – GOV.UK";
    }

    async selectContinueMakingComplaint(): Promise<void> {
        await this.selectContinueMakingComplaintAndProceed();
    }

    async checkExternalLinksAreWorkingOnPage(): Promise<boolean> {
        await this.contactUkVisasForHelpLink();
        await this.checkExternalLink("Request a refund from TLScontact");
        return true;
    }
}
