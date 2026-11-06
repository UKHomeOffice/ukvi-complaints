import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicApplicantCountryOfNationalityPage extends basePage {
    readonly countryOfNationality: Locator;

    constructor(page: Page) {
        super(page);
        this.countryOfNationality = page.locator("#agent-representative-nationality");
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: What is the applicant’s country of nationality? – UK Visas and Immigration complaints – GOV.UK" : "What is the applicant’s country of nationality? – UK Visas and Immigration complaints – GOV.UK";
    }

    async selectApplicantCountryOfNationality(country: string): Promise<void> {
        await this.selectAutocomplete(this.countryOfNationality, country);
        await this.clickContinueButton();
    }
}
