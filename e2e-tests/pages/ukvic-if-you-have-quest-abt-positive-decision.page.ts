import { expect, Locator, Page } from '@playwright/test';
import { ukviCommonPage } from './ukvi-common.page';

export class ukvicIfYouHaveQuestAbtPositiveDecisionPage extends ukviCommonPage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: If you have questions about a positive decision – UK Visas and Immigration complaints – GOV.UK" : "If you have questions about a positive decision – UK Visas and Immigration complaints – GOV.UK";
    }

    async selectContinueMakingComplaint(): Promise<void> {
        await this.selectContinueMakingComplaintAndProceed();
    }

    async checkExternalLinkWorksOnPage(): Promise<boolean> {
        return this.contactUkVisasForHelpLink();
    }

    async answerIfYouHaveQuestionsAbtPositiveDecision(): Promise<void> {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.checkExternalLinkWorksOnPage();
        await this.selectContinueMakingComplaint();
    }
}
