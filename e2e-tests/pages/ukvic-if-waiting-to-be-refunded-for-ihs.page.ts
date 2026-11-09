import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicIfWaitingToBeRefundedForIHSPage extends basePage {
    readonly payForUkHealthcare: Locator;

    constructor(page: Page) {
        super(page);
        this.payForUkHealthcare = page.getByRole('heading', { name: "Pay for UK healthcare as part of your immigration application", level: 1, exact: true });
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: If you’re waiting to be refunded for the immigration health surcharge (IHS) – UK Visas and Immigration complaints – GOV.UK" : "If you’re waiting to be refunded for the immigration health surcharge (IHS) – UK Visas and Immigration complaints – GOV.UK";
    }

    async selectContinueMakingComplaint(): Promise<void> {
        await this.selectContinueMakingComplaintAndProceed();
    }

    async checkExternalLinksAreWorkingOnPage(): Promise<boolean> {
        await this.contactUkVisasForHelpLink();
        await this.checkExternalLink("Find more about IHS refunds on GOV.UK", this.payForUkHealthcare);
        return true;
    }
}
