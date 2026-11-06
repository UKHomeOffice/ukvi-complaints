import { expect, Locator, Page } from '@playwright/test';
import { ukviCommonPage } from './ukvi-common.page';

export class ukvicIfYouHaveNotUsedOnlineServiceRequestPage extends ukviCommonPage {
    readonly useOnlineService: Locator;

    constructor(page: Page) {
        super(page);
        this.useOnlineService = page.getByRole('heading', { name: "Get your visa, immigration or citizenship documents back", level: 1, exact: true });
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: If you have not used the online service to request your documents – UK Visas and Immigration complaints – GOV.UK" : "If you have not used the online service to request your documents – UK Visas and Immigration complaints – GOV.UK";
    }

    async selectContinueMakingComplaint(): Promise<void> {
        await this.selectContinueMakingComplaintAndProceed();
    }

    async checkExternalLinkWorksOnPage(): Promise<boolean> {
        await this.checkExternalLink("use the online service", this.useOnlineService);
        return true;
    }

    async answerIfYouHaveNotUsedOnlineServiceRequest(): Promise<void> {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.checkExternalLinkWorksOnPage();
        await this.selectContinueMakingComplaint();
    }
}
