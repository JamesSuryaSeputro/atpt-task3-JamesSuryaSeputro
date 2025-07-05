import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.proceedToCheckoutButton = page.locator('a:has-text("Proceed To Checkout")');
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }
}
