import { expect, Locator, Page } from '@playwright/test';
import { ukviCommonPage } from './ukvi-common.page';

export class ukvicIfYouAreWaitingForDocToBeReturnedPage extends ukviCommonPage {
    readonly reportDocNotReceived: Locator;

    constructor(page: Page) {
        super(page);
        this.reportDocNotReceived = page.getByRole('heading', { name: "Report that you have not received your documents", level: 1, exact: true });
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: If you are waiting for documents to be returned – UK Visas and Immigration complaints – GOV.UK" : "If you are waiting for documents to be returned – UK Visas and Immigration complaints – GOV.UK";
    }

    async selectContinueMakingComplaint(): Promise<void> {
        await this.selectContinueMakingComplaintAndProceed();
    }

    async checkExternalLinkWorksOnPage(): Promise<boolean> {
        await this.checkExternalLink("Report that your documents have not been received", this.reportDocNotReceived);
        return true;
    }

    async answerIfYouWaitingForDocsToBeReturned(): Promise<void> {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.selectContinueMakingComplaint();
    }
}
