import { expect, Locator, Page } from '@playwright/test';
import { ukviCommonPage } from './ukvi-common.page';

export class ukvicWhereInUkIsServiceSupportCentrePage extends ukviCommonPage {
    readonly selectCountry: Locator;

    constructor(page: Page) {
        super(page);
        this.selectCountry = page.locator("select#vac-country");
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: Where in the UK is the service support centre? – UK Visas and Immigration complaints – GOV.UK" : "Where in the UK is the service support centre? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerEnterServiceSupportCentre(city: string): Promise<void> {
        await this.enterServiceCity(city);
    }

    async answerWhereInUkIsTheServiceSupportCentre(city: string): Promise<void> {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.answerEnterServiceSupportCentre(city);
    }
}
