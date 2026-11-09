import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhereInUkIsServicePointPage extends basePage {
    readonly selectCountry: Locator;

    constructor(page: Page) {
        super(page);
        this.selectCountry = page.locator("select#vac-country");
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: Where in the UK is the service point? – UK Visas and Immigration complaints – GOV.UK" : "Where in the UK is the service point? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerEnterServiceSupportCentre(city: string): Promise<void> {
        await this.type(this.selectCity, city);
        await this.clickContinueButton();
    }

    async answerWhereInUkIsTheServicePoint(city: string): Promise<void> {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.answerEnterServiceSupportCentre(city);
    }
}
