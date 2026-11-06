import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixture/fixtures';

const { Given, When, Then } = createBdd(test);

Given('I use the Ukvic scenario {string}', async ({ ukvic }, description: string) => {
    ukvic.selectScenario(description);
});

When('I select continue', async ({ pages }) => {
    await pages.basePage.clickContinueButton();
});

Then('I see {string} error header message displayed for ukvi', async ({ pages, ukvic }, message: string) => {
    ukvic.assertSelectedDescription();
    await expect(pages.basePage.thereIsAProblemText).toHaveText(message);
});

Then('I see {string} error message displayed for ukvi', async ({ pages, ukvic }, message: string) => {
    ukvic.assertSelectedDescription();
    await expect(pages.basePage.errorSummaryList.locator('li')).toHaveText([message]);
});

Then('I see error message displayed for ukvi', async ({ pages, ukvic }, message: string) => {
    ukvic.assertSelectedDescription();
    await expect(pages.basePage.errorSummaryList.locator('li')).toHaveText(message.trim().split(/\r?\n/).map(line => line.trim()));
});

Then('I am on the Check your answers page', async ({ pages, page, ukvic }) => {
    ukvic.assertSelectedDescription();
    await pages.ukvicCheckYourAnswersPage.assertPageTitle(page, await pages.ukvicCheckYourAnswersPage.expectedPageTitle());
    await pages.ukvicCheckYourAnswersPage.isCheckYourAnsHeaderTextDisplayed();
});