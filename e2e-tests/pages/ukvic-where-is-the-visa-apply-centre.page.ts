import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhereIsTheVisaApplyCentrePage extends basePage {
    readonly selectCountry: Locator;

    constructor(page: Page) {
        super(page);
        this.selectCountry = page.locator("#vac-country");
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: Where is the visa application centre? – UK Visas and Immigration complaints – GOV.UK" : "Where is the visa application centre? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerEnterYourCApplicationCenter(country: string, city: string): Promise<void> {
        await this.selectAutocomplete(this.selectCountry, country);
        await this.type(this.selectCity, city);
        await this.clickContinueButton();
    }

    async answerWhereIsTheVisaApplyCentre(overseasCountry: string, city: string): Promise<void> {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.answerEnterYourCApplicationCenter(overseasCountry, city);
    }
}
