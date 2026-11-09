import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicIfYouHaveQuestionsAbtNegDecisionPage extends basePage {
    readonly applicationOutsideUk: Locator;
    readonly appealAgainstDecision: Locator;
    readonly visaAdminReview: Locator;
    readonly visaReconsiderationRequest: Locator;

    constructor(page: Page) {
        super(page);
        this.applicationOutsideUk = page.getByRole('heading', { name: "Visa processing times: applications outside the UK", level: 1, exact: true });
        this.appealAgainstDecision = page.getByRole('heading', { name: "Appeal against a visa or immigration decision", level: 1, exact: true });
        this.visaAdminReview = page.getByRole('heading', { name: "Ask for a visa administrative review", level: 1, exact: true });
        this.visaReconsiderationRequest = page.getByRole('heading', { name: "Visa and immigration reconsideration requests", level: 1, exact: true });
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: If you have questions about a negative decision – UK Visas and Immigration complaints – GOV.UK" : "If you have questions about a negative decision – UK Visas and Immigration complaints – GOV.UK";
    }

    async selectContinueMakingComplaint(): Promise<void> {
        await this.selectContinueMakingComplaintAndProceed();
    }

    async checkExternalLinksAreWorkingOnPage(): Promise<boolean> {
        await this.checkExternalLink("Appeal the decision", this.appealAgainstDecision);
        await this.checkExternalLink("Apply for a review", this.visaAdminReview);
        await this.checkExternalLink("Ask for a reconsideration", this.visaReconsiderationRequest);
        return true;
    }

    async answerIfYouHaveQuestionsAbtNegDecision(): Promise<void> {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.checkExternalLinksAreWorkingOnPage();
        await this.selectContinueMakingComplaint();
    }
}
