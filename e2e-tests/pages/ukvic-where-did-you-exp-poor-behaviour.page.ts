import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicWhereDidYouExpPoorBehaviourPage extends basePage {


    constructor(page: Page) {
        super(page);

    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: Where did you experience poor behaviour? – UK Visas and Immigration complaints – GOV.UK" : "Where did you experience poor behaviour? – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerSelectWhereBehaviourHappen(behaviour: string): Promise<void> {
        await this.selectOption(behaviour);
        await this.clickContinueButton();
    }
}
