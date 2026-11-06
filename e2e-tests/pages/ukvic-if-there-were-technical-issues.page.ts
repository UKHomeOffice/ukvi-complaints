import { expect, Locator, Page } from '@playwright/test';
import { ukviCommonPage } from './ukvi-common.page';

export class ukvicIfThereWereTechnicalIssuesPage extends ukviCommonPage {
    readonly brpNotReceived: Locator;

    constructor(page: Page) {
        super(page);
        this.brpNotReceived = page.getByRole('heading', { name: "Contact UK Visas and Immigration for help", level: 1, exact: true });
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: If there were technical issues with the website or payments – UK Visas and Immigration complaints – GOV.UK" : "If there were technical issues with the website or payments – UK Visas and Immigration complaints – GOV.UK";
    }

    async selectContinueMakingComplaint(): Promise<void> {
        await this.selectContinueMakingComplaintAndProceed();
    }

    async checkExternalLinkWorksOnPage(): Promise<boolean> {
        return this.contactUkVisasForHelpLink();
    }
}
