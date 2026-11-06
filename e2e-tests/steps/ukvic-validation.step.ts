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
    await pages.basePage.assertErrorHeader(message);
});

Then('I see {string} error message displayed for ukvi', async ({ pages, ukvic }, message: string) => {
    ukvic.assertSelectedDescription();
    await pages.basePage.assertErrorSummary([message]);
});

Then('I see error message displayed for ukvi', async ({ pages, ukvic }, message: string) => {
    ukvic.assertSelectedDescription();
    await pages.basePage.assertErrorSummary(message.trim().split(/\r?\n/).map(line => line.trim()));
});

Then('I am on the Check your answers page', async ({ pages, ukvic }) => {
    ukvic.assertSelectedDescription();
    await pages.ukvicCheckYourAnswersPage.assertCheckYourAnswersPage();
});