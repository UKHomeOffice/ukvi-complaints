import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicCheckYourAnswersPage extends basePage {
    readonly checkYourAnswers: Locator;
    readonly sendComplaintBtn: Locator;
    readonly complaintSubmittedText: Locator;

    constructor(page: Page) {
        super(page);
        this.checkYourAnswers = page.getByRole('heading', { name: "Check your answers", level: 1, exact: true });
        this.sendComplaintBtn = page.locator("input[value='Send complaint']");
        this.complaintSubmittedText = page.getByRole('heading', { name: "Complaint submitted", level: 1, exact: true });
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: Check your answers – UK Visas and Immigration complaints – GOV.UK" : "Check your answers – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerSendComplaint(): Promise<void> {
        await this.sendComplaintBtn.click();
    }

    async verifyComplaintIsSubmittedSuccessfully(): Promise<boolean> {
        await expect(this.complaintSubmittedText).toBeVisible();
        return true;
    }

    async isCheckYourAnsHeaderTextDisplayed(): Promise<boolean> {
        await expect(this.checkYourAnswers).toBeVisible();
        return true;
    }
}
