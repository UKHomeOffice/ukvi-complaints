import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvicUploadDocumentsPage extends basePage {
    readonly continueUpload: Locator;
    readonly fileUpload: Locator;

    constructor(page: Page) {
        super(page);
        this.continueUpload = page.locator("[name='continueWithoutUpload']");
        this.fileUpload = page.locator("input[type=file]");
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error') ? "Error: Upload documents (optional) – UK Visas and Immigration complaints – GOV.UK" : "Upload documents (optional) – UK Visas and Immigration complaints – GOV.UK";
    }

    async answerFileToUpload(fileName: string): Promise<void> {
        await this.fileUpload.setInputFiles(fileName);
        await this.continueUpload.click();
    }

    async answerUploadDocuments(uploadFilePath: string): Promise<void> {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.answerFileToUpload(uploadFilePath);
    }
}
