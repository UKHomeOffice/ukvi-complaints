import { expect, Locator, Page } from '@playwright/test';
import { ukviCommonPage } from './ukvi-common.page';

export class ukvicIfYouAreWaitingForDecisionPage extends ukviCommonPage {
    readonly abtOurService: Locator;
    readonly applicationOutsideUk: Locator;

    constructor(page: Page) {
        super(page);
        this.abtOurService = page.getByRole('heading', { name: "About our services - UK Visas and Immigration", level: 1, exact: true });
        this.applicationOutsideUk = page.getByRole('heading', { name: "Visa processing times: applications outside the UK", level: 1, exact: true });
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: If you are waiting for a decision on an application – UK Visas and Immigration complaints – GOV.UK" : "If you are waiting for a decision on an application – UK Visas and Immigration complaints – GOV.UK";
    }

    async selectContinueMakingComplaint(): Promise<void> {
        await this.selectContinueMakingComplaintAndProceed();
    }

    async checkWaitingTimesLinkWork_InUk(): Promise<boolean> {
        await this.checkExternalLink("see when you can expect a decision by", this.abtOurService);
        return true;
    }

    async checkWaitingTimesLinkWork_OutsideUk(): Promise<boolean> {
        await this.checkExternalLink("see when you can expect your decision by", this.applicationOutsideUk);
        return true;
    }
}
