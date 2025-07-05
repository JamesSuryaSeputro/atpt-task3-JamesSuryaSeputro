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

/*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Navigates to the login page by clicking on the signup/login button.
     */

/*******  843251b9-7241-49b1-8bb1-8f926caf9676  *******/
    async navigateToLogin() {
        await this.signupLoginButton.click();
    }
}