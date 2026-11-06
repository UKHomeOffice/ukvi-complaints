import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukviCommonPage extends basePage {
    readonly landlordName: Locator;
    readonly company: Locator;
    readonly emailAddress: Locator;
    readonly phoneNumb: Locator;
    readonly requestSent: Locator;
    readonly personDisqualifiedRequestSent: Locator;
    readonly thankYouForReportingSent: Locator;
    readonly requestAnotherNoticeLink: Locator;
    readonly checkDisqPersonLink: Locator;
    readonly reportSomeoneLink: Locator;
    readonly selectCity: Locator;
    readonly contactUkVisasForHelp: Locator;
    readonly continueMakingComplaint: Locator;
    readonly getFasterServLink: Locator;
    readonly name: Locator;
    readonly deleteBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.landlordName = page.locator('input#landlord-name');
        this.company = page.locator('input[id$=-company]');
        this.emailAddress = page.locator('input[id$=-email-address], input[id$=-email]');
        this.phoneNumb = page.locator('input[id$=-phone-number], input[id$=-phone]');
        this.requestSent = page.getByRole('heading', { name: 'Your request has been sent', exact: true });
        this.personDisqualifiedRequestSent = page.getByRole('heading', { name: 'Your request to check if a person is still disqualified from renting has been sent.', exact: true });
        this.thankYouForReportingSent = page.getByRole('heading', { name: 'Thank you for letting us know that a disqualified person has left your property.', exact: true });
        this.requestAnotherNoticeLink = page.getByRole('link', { name: 'Request another Notice of Letting to a Disqualified Person' });
        this.checkDisqPersonLink = page.getByRole('link', { name: 'Check if someone named on a different Notice of Letting to a Disqualified Person' });
        this.reportSomeoneLink = page.getByRole('link', { name: 'Report that someone else' });
        this.selectCity = page.locator('input[id$=-city]');
        this.contactUkVisasForHelp = page.getByRole('heading', { name: 'Contact UK Visas and Immigration for help', exact: true });
        this.continueMakingComplaint = page.getByRole('button', { name: 'Continue making your complaint', exact: true });
        this.getFasterServLink = page.getByRole('heading', { name: 'Get a faster decision on your visa, settlement or citizenship application', exact: true });
        this.name = page.locator('input[id$=name]');
        this.deleteBtn = page.getByRole('link', { name: 'Delete', exact: true });
    }

    async isTenantDetailedDisplayed(tenantStatus: string): Promise<boolean> {
        await expect(this.deleteBtn).toBeVisible();
        await expect(this.page.getByRole('heading', { name: tenantStatus })).toBeVisible();
        return true;
    }

    async enterNameAndContinue(fullName: string): Promise<void> {
        await this.type(this.name, fullName);
        await this.clickContinueButton();
    }

    async selectContinueMakingComplaintAndProceed(): Promise<void> {
        await this.continueMakingComplaint.click();
    }

    async enterServiceCity(city: string): Promise<void> {
        await this.type(this.selectCity, city);
        await this.clickContinueButton();
    }

    async enterYourContactDetails(emailAdd: string, phoneNo: string): Promise<void> {
        await this.type(this.emailAddress, emailAdd);
        await this.type(this.phoneNumb, phoneNo);
        await this.clickContinueButton();
    }

    async contactUkVisasForHelpLink(): Promise<boolean> {
        return this.checkExternalLink('Contact UK Visas and Immigration');
    }

    async isGetFasterDecisionMessageDisplayed(): Promise<boolean> {
        return this.checkExternalLink('how soon to expect a decision', this.getFasterServLink);
    }
}