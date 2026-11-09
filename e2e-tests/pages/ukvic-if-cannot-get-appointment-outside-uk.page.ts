import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicIfCannotGetAppointmentOutsideUkPage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: If you cannot get an appointment outside of the UK – UK Visas and Immigration complaints – GOV.UK" : "If you cannot get an appointment outside of the UK – UK Visas and Immigration complaints – GOV.UK";
    }

    async selectContinueMakingComplaint(): Promise<void> {
        await this.selectContinueMakingComplaintAndProceed();
    }
}
