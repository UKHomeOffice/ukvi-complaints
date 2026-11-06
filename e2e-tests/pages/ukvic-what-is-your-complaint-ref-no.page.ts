import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhatIsYourComplaintRefNoPage extends basePage {
    readonly complaintRefNo: Locator;

    constructor(page: Page) {
        super(page);
        this.complaintRefNo = page.locator("input#complaint-reference-number");
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What is the reference number for your complaint? – UK Visas and Immigration complaints – GOV.UK" : "What is the reference number for your complaint? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerEnterComplaintRefNo(complaintRefNumb: string): Promise<void> {
        await this.type(this.complaintRefNo, complaintRefNumb);
        await this.clickContinueButton();
    }
}
