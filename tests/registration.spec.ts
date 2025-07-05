import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { AccountCreatedPage } from '../pages/AccountCreatedPage';
import { LoggedInHomePage } from '../pages/LoggedInHomePage';
import { generateUserData } from '../utils/data-helper';

test.describe('User Registration Flow', () => {
  let userData: any;

  test.beforeAll(() => {
    // Generate user data once for the entire test file
    userData = generateUserData();
  });

  test('should allow a user to register a new account successfully', async ({ page }) => {
    // 1. Initialize Page Objects
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    const loggedInHomePage = new LoggedInHomePage(page);

    // 2. Navigate to the website
    await homePage.goto();

    // 3. Visual and Accessibility checks on Home Page
    await expect(page).toHaveURL('/');
    await homePage.checkAccessibility('HomePage');
    // Mask the dynamic slider carousel for a stable screenshot
    await expect(page).toHaveScreenshot('home-page.png', { mask: [homePage.sliderCarousel] });

    // 4. Navigate to Signup page
    await homePage.navigateToLogin();
    await expect(loginPage.newUserSignupHeader).toBeVisible();

    // 5. Visual and Accessibility checks on Login/Signup Page
    await loginPage.checkAccessibility('LoginPage');
    await expect(page).toHaveScreenshot('login-page.png');

    // 6. Start signup process
    await loginPage.startSignup(userData.name, userData.email);

    // 7. Fill out the registration form
    await expect(page).toHaveURL(/.*signup/);
    await signupPage.checkAccessibility('SignupPage');
    await expect(page).toHaveScreenshot('signup-form-page.png');
    await signupPage.fillRegistrationForm(userData);

    // 8. Verify account creation
    await expect(accountCreatedPage.accountCreatedHeader).toBeVisible();
    await accountCreatedPage.checkAccessibility('AccountCreatedPage');
    await expect(page).toHaveScreenshot('account-created-page.png');

    // 9. Continue to the logged-in state
    await accountCreatedPage.proceed();
    
    // An ad might pop up, so we handle it gracefully by closing it if it appears.
    // This is a common pattern for dealing with unpredictable overlays.
    if (await page.locator('#aswift_6').isVisible()) {
        await page.frameLocator('#aswift_6').frameLocator('#ad_iframe').getByLabel('Close ad').click();
    }


    // 10. Verify user is logged in
    await expect(loggedInHomePage.loggedInAsText(userData.name)).toBeVisible();
    await loggedInHomePage.checkAccessibility('LoggedInHomePage');
    await expect(page).toHaveScreenshot('logged-in-home-page.png', { mask: [homePage.sliderCarousel] });
  });
});