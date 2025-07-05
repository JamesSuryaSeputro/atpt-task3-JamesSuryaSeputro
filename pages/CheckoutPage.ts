// File: pages/CheckoutPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.placeOrderButton = page.locator('a:has-text("Place Order")');
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }
}
