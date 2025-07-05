// File: pages/ProductsPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly addToCartButton: Locator;
  readonly viewCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page.locator('a[data-product-id]:has-text("Add to cart")').first();
    this.viewCartButton = page.locator('u:has-text("View Cart")');
  }

  async navigate() {
    await this.page.click('a[href="/products"]');
  }

  async addFirstProductToCart() {
    await this.addToCartButton.hover();
    await this.addToCartButton.click();
    await this.viewCartButton.click();
  }
}
