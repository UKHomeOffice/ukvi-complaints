import { expect, Locator, Page } from '@playwright/test';
import { ukviCommonPage } from './ukvi-common.page';

export class ukvicIfBRPCardIsIncorrectPage extends ukviCommonPage {
    readonly brpNotReceived: Locator;

    constructor(page: Page) {
        super(page);
        this.brpNotReceived = page.getByRole('heading', { name: "Biometric residence permits (BRPs)", level: 1, exact: true });
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: If a BRP card is incorrect – UK Visas and Immigration complaints – GOV.UK" : "If a BRP card is incorrect – UK Visas and Immigration complaints – GOV.UK";
    }

    async selectContinueMakingComplaint(): Promise<void> {
        await this.selectContinueMakingComplaintAndProceed();
    }

    async checkExternalLinkWorksOnPage(): Promise<boolean> {
        await this.checkExternalLink("Report that your BRP is incorrect", this.brpNotReceived);
        return true;
    }

    async answerIfBRPIsIncorrect(): Promise<void> {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.checkExternalLinkWorksOnPage();
        await this.selectContinueMakingComplaint();
    }
}
