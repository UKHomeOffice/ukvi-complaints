import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhereDidTheIncidentHappenPage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: Where did the incident take place? – UK Visas and Immigration complaints – GOV.UK" : "Where did the incident take place? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerSelectWhereIncidentTakePlace(incidentPlace: string): Promise<void> {
        await this.selectOption(incidentPlace);
        await this.clickContinueButton();
    }
}
