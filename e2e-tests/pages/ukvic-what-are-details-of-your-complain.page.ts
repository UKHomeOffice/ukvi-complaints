import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhatAreDetailsOfYourComplainPage extends basePage {
    readonly complaintDetails: Locator;

    constructor(page: Page) {
        super(page);
        this.complaintDetails = page.getByLabel('Complaint details', { exact: true });
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What are the details of your complaint? – UK Visas and Immigration complaints – GOV.UK" : "What are the details of your complaint? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerEnterComplaintDetails(complaintDetails: string): Promise<void> {
        await this.complaintDetails.click();
        await this.complaintDetails.pressSequentially(complaintDetails);
        await this.clickContinueButton();
    }
}
