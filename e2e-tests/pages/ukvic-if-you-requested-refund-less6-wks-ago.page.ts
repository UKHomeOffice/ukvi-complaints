import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicIfYouRequestedRefundLess6WksAgoPage extends basePage {
    readonly waitForRefundMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.waitForRefundMessage = page.getByText("Please wait to receive your refund", { exact: true });
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: If you requested a refund less than 6 weeks ago – UK Visas and Immigration complaints – GOV.UK" : "If you requested a refund less than 6 weeks ago – UK Visas and Immigration complaints – GOV.UK";
    }

    async getWaitForRefundMessage(): Promise<string> {
        return (await this.waitForRefundMessage.innerText()).trim();
    }

    async exitApplication(): Promise<void> {
        await this.page.close();
    }

    async pleaseWaitToReceiveYourRefund(waitForRefund: string): Promise<void> {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        expect(await this.getWaitForRefundMessage()).toBe(waitForRefund);
        await this.exitApplication();
    }
}
