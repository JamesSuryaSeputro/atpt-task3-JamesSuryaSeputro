import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly signupLoginButton: Locator;
    readonly sliderCarousel: Locator;

    constructor(page: Page) {
        super(page);
        this.signupLoginButton = page.locator('a[href="/login"]');
        this.sliderCarousel = page.locator('#slider-carousel');

    }

    async navigateToLogin() {
        await this.signupLoginButton.click({ force: true });
    }

    async navigateToProducts() {
        await this.page.locator('a[href="/products"]').click();
        await this.page.waitForURL('**/products', { timeout: 10000 });
    }
}