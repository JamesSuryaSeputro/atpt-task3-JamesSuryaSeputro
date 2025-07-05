import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountCreatedPage extends BasePage {
    readonly accountCreatedHeader: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.accountCreatedHeader = page.locator('h2[data-qa="account-created"]');
        this.continueButton = page.locator('a[data-qa="continue-button"]');
    }

    async proceed() {
        await this.continueButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.continueButton.click();
    }
}