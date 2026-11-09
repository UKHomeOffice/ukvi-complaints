import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicIfTheGuidanceWasUnclearPage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: If the guidance was unclear or misleading – UK Visas and Immigration complaints – GOV.UK" : "If the guidance was unclear or misleading – UK Visas and Immigration complaints – GOV.UK";
    }

    async selectContinueMakingComplaint(): Promise<void> {
        await this.selectContinueMakingComplaintAndProceed();
    }

    async checkExternalLinkWorksOnPage(): Promise<boolean> {
        return this.contactUkVisasForHelpLink();
    }
}
