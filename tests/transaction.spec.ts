import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { SignupPage } from '../pages/SignupPage';
import { LoginPage } from '../pages/LoginPage';
import { AccountCreatedPage } from '../pages/AccountCreatedPage';
import { generateUserData } from '../utils/data-helper';
import { faker } from '@faker-js/faker';

test.describe('User Product Transaction Flow', () => {
  let userData: any;

  test.beforeAll(() => {
    userData = generateUserData();
  });

  test('should allow a user to purchase a product end-to-end', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);

    // 1. Navigate to homepage and login
    await homePage.goto('/');
    await homePage.navigateToLogin();
    await expect(loginPage.newUserSignupHeader).toBeVisible();
    await loginPage.startSignup(userData.email, userData.password);
    const signupPage = new SignupPage(page);
    await signupPage.fillRegistrationForm(userData);

    const accountCreatedPage = new AccountCreatedPage(page);
    await expect(accountCreatedPage.accountCreatedHeader).toBeVisible();
    await accountCreatedPage.proceed();

    // 2. Go to Products Page
    await productsPage.navigate();
    await productsPage.checkAccessibility('ProductsPage');
    await expect(page).toHaveScreenshot('products-page.png', {
      maxDiffPixelRatio: 0.01,
      mask: [
        page.locator('iframe'),
        page.locator('div[id^="aswift"]'),
        homePage.sliderCarousel
      ]
    });

    // 3. Add product to cart and view cart
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await page.waitForTimeout(1000);
    await productsPage.addFirstProductToCart();
    await cartPage.checkAccessibility('CartPage');
    await expect(page).toHaveScreenshot('cart-page.png', {
      maxDiffPixelRatio: 0.01,
      mask: [
        page.locator('iframe'),
        page.locator('ins.adsbygoogle')
      ]
    });

    // 4. Proceed to checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.checkAccessibility('CheckoutPage');
    await expect(page).toHaveScreenshot('checkout-page.png', {
      maxDiffPixelRatio: 0.01
    });

    // 5. Fill in payment details and confirm order
    await checkoutPage.placeOrder();
    await paymentPage.fillPaymentDetails({
      nameOnCard: faker.name.fullName(),
      cardNumber: faker.finance.creditCardNumber('4111########1111'),
      cvc: faker.finance.creditCardCVV(),
      expirationMonth: faker.date.future().getMonth().toString().padStart(2, '0'),
      expirationYear: faker.date.future().getFullYear().toString()
    });

    await paymentPage.confirmOrder();
    await paymentPage.checkAccessibility('PaymentPage');
    await expect(page).toHaveScreenshot('order-confirmation-page.png', {
      maxDiffPixelRatio: 0.01
    });
  });
});
