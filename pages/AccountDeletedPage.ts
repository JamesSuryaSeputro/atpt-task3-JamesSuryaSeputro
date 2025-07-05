import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountDeletedPage extends BasePage {
    readonly accountDeletedHeader: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.accountDeletedHeader = page.locator('h2[data-qa="account-deleted"]');
        this.continueButton = page.locator('a[data-qa="continue-button"]');
    }
}
