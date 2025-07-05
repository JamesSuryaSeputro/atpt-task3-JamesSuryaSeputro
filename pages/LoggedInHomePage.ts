import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoggedInHomePage extends BasePage {
    readonly loggedInAsText: (username: string) => Locator;
    readonly deleteAccountButton: Locator;
    readonly sliderCarousel: Locator;

    constructor(page: Page) {
        super(page);
        this.loggedInAsText = (username) => page.getByText(`Logged in as ${username}`);
        this.deleteAccountButton = page.locator('a[href="/delete_account"]');
            this.sliderCarousel = page.locator('#slider-carousel');
    }

    async clickDeleteAccount() {
        await this.deleteAccountButton.click();
    }
}