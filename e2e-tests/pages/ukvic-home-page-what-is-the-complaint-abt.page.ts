import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicHomePageWhatIsTheComplaintAbtPage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What is the complaint about? – UK Visas and Immigration complaints – GOV.UK" : "What is the complaint about? – UK Visas and Immigration complaints – GOV.UK";
    }

    async openUkvicHomePage(): Promise<void> {
        await this.page.goto('/');
    }

    async answerSelectYourComplaint(complaint: string): Promise<void> {
        await this.selectOption(complaint);
        await this.clickContinueButton();
    }

    async openUkviComplaintHomePage(): Promise<void> {
        await this.openUkvicHomePage();
        await this.acceptCookies();
    }
}
