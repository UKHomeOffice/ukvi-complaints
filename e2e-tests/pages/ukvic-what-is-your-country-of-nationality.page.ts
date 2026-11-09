import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhatIsYourCountryOfNationalityPage extends basePage {
    readonly countryOFNationality: Locator;

    constructor(page: Page) {
        super(page);
        this.countryOFNationality = page.locator("#applicant-nationality");
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What is your country of nationality? – UK Visas and Immigration complaints – GOV.UK" : "What is your country of nationality? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerEnterYourNationality(nationality: string): Promise<void> {
        await this.selectAutocomplete(this.countryOFNationality, nationality);
        await this.clickContinueButton();
    }

    async answerWhatIsYourCountryOfNationality(countryOfNationality: string): Promise<void> {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.answerEnterYourNationality(countryOfNationality);
    }
}
