import { expect, Locator, Page } from '@playwright/test';

export class basePage {
    readonly headerText: Locator;
    readonly continueButton: Locator;
    readonly thereIsAProblemText: Locator;
    readonly errorSummaryList: Locator;
    readonly navigateBackLink: Locator;
    readonly continueMakingComplaint: Locator;
    readonly getFasterServLink: Locator;
    readonly emailAddress: Locator;
    readonly phoneNumb: Locator;
    readonly selectCity: Locator;

    constructor(readonly page: Page) {
        this.headerText = page.locator('h1');
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
        this.thereIsAProblemText = page.locator('#error-summary-title');
        this.errorSummaryList = page.locator('.govuk-error-summary__list');
        this.navigateBackLink = page.getByRole('link', { name: 'Back', exact: true });
        this.continueMakingComplaint = page.getByRole('button', { name: 'Continue making your complaint', exact: true });
        this.getFasterServLink = page.getByRole('heading', { name: 'Get a faster decision on your visa, settlement or citizenship application', exact: true });
        this.emailAddress = page.locator('input[id$=-email-address], input[id$=-email]');
        this.phoneNumb = page.locator('input[id$=-phone-number], input[id$=-phone]');
        this.selectCity = page.locator('input[id$=-city]');
    }

    async assertPageTitle(page: Page, title: string): Promise<void> {
        await expect(page).toHaveTitle(title);
    }

    async click(locator: Locator): Promise<void> {
        await locator.click();
    }

    async type(locator: Locator, text: string): Promise<void> {
        await locator.fill(text);
        await locator.press('Tab');
    }

    async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }

    async selectContinueMakingComplaintAndProceed(): Promise<void> {
        await this.continueMakingComplaint.click();
    }

    async contactUkVisasForHelpLink(): Promise<boolean> {
        return this.checkExternalLink('Contact UK Visas and Immigration');
    }

    async isGetFasterDecisionMessageDisplayed(): Promise<boolean> {
        return this.checkExternalLink('how soon to expect a decision', this.getFasterServLink);
    }

    async selectOption(option: string): Promise<void> {
        const exact = this.page.getByRole('radio', { name: option, exact: true });
        const radio = await exact.count() ? exact : this.page.getByRole('radio', { name: option });
        await radio.check();
    }

    async enterDateOrDob(inputDate: string): Promise<void> {
        if (!inputDate.trim()) return;
        const dateParts = inputDate.split('/');
        if (dateParts.length !== 3) throw new Error('Invalid date format. Expected dd/MM/yyyy');
        await this.type(this.page.getByLabel('Day', { exact: true }), dateParts[0]);
        await this.type(this.page.getByLabel('Month', { exact: true }), dateParts[1]);
        await this.type(this.page.getByLabel('Year', { exact: true }), dateParts[2]);
    }

    async selectAutocomplete(locator: Locator, option: string): Promise<void> {
        if (await locator.evaluate(element => element.tagName === 'SELECT')) {
            await locator.selectOption({ label: option });
            return;
        }
        await locator.click();
        await locator.fill('');
        await locator.pressSequentially(option);
        const optionName = new RegExp(`^${option.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');
        await this.page.getByRole('option', { name: optionName }).click();
        await locator.press('Tab');
    }

    async checkExternalLink(linkText: string, expectedHeading?: Locator): Promise<boolean> {
        const link = this.page.getByRole('link', { name: linkText }).first();
        await expect(link).toBeVisible();
        const href = await link.getAttribute('href');
        if (!href) throw new Error(`Missing destination for link: ${linkText}`);
        await this.page.goto(new URL(href, this.page.url()).href);
        try {
            if (expectedHeading) await expect(expectedHeading).toBeVisible();
            return true;
        } finally {
            await this.page.goBack();
        }
    }

    async acceptCookies(): Promise<void> {
        const accept = this.page.getByRole('button', { name: 'Accept additional cookies' });
        if (!(await accept.isVisible())) {
            await this.page.context().clearCookies();
            await this.page.reload();
        }
        await accept.click();
        await this.page.getByRole('button', { name: /Hide/ }).click();
    }

    async getThereIsAProblemTextErrorText(): Promise<string | null> {
        return this.thereIsAProblemText.textContent();
    }

    async getErrorSummaryListText(): Promise<string | null> {
        return this.errorSummaryList.textContent();
    }

    async navigateBackward(): Promise<void> {
        await this.navigateBackLink.click();
    }

    async assertErrorHeader(message: string): Promise<void> {
        await expect(this.thereIsAProblemText).toHaveText(message);
    }

    async assertErrorSummary(messages: string[]): Promise<void> {
        await expect(this.errorSummaryList.locator('li')).toHaveText(messages);
    }
}