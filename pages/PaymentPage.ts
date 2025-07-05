import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PaymentPage extends BasePage {
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expirationMonthInput: Locator;
  readonly expirationYearInput: Locator;
  readonly payAndConfirmButton: Locator;

  constructor(page: Page) {
    super(page);
    this.nameOnCardInput = page.locator('input[name="name_on_card"]');
    this.cardNumberInput = page.locator('input[name="card_number"]');
    this.cvcInput = page.locator('input[name="cvc"]');
    this.expirationMonthInput = page.locator('input[name="expiry_month"]');
    this.expirationYearInput = page.locator('input[name="expiry_year"]');
    this.payAndConfirmButton = page.locator('button#submit');
  }

  async fillPaymentDetails(data: {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expirationMonth: string;
    expirationYear: string;
  }) {
    await this.nameOnCardInput.fill(data.nameOnCard);
    await this.cardNumberInput.fill(data.cardNumber);
    await this.cvcInput.fill(data.cvc);
    await this.expirationMonthInput.fill(data.expirationMonth);
    await this.expirationYearInput.fill(data.expirationYear);
  }

  async confirmOrder() {
    await this.payAndConfirmButton.click();
  }
}
