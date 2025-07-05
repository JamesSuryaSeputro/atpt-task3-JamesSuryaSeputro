import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { AccountCreatedPage } from '../pages/AccountCreatedPage';
import { LoggedInHomePage } from '../pages/LoggedInHomePage';
import { AccountDeletedPage } from '../pages/AccountDeletedPage';
import { generateUserData } from '../utils/data-helper';

test.describe('User Account Deletion Flow', () => {
    let userData: any;

    // This hook runs before the test, setting up the required state (a registered user).
    test.beforeEach(async ({ page }) => {
        userData = generateUserData();
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const signupPage = new SignupPage(page);
        const accountCreatedPage = new AccountCreatedPage(page);

        await homePage.goto();
        await homePage.navigateToLogin();
        await loginPage.startSignup(userData.name, userData.email);
        await signupPage.fillRegistrationForm(userData);
        await accountCreatedPage.proceed();
        
        // Handle potential ad
        if (await page.locator('#aswift_6').isVisible()) {
            await page.frameLocator('#aswift_6').frameLocator('#ad_iframe').getByLabel('Close ad').click();
        }
    });

    test('should allow a logged-in user to delete their account', async ({ page }) => {
        // 1. Initialize Page Objects for this test
        const loggedInHomePage = new LoggedInHomePage(page);
        const accountDeletedPage = new AccountDeletedPage(page);

        // 2. Verify we are in the correct state (logged in)
        await expect(loggedInHomePage.loggedInAsText(userData.name)).toBeVisible();

        // 3. Delete the account
        await loggedInHomePage.clickDeleteAccount();

        // 4. Verify account deletion
        await expect(accountDeletedPage.accountDeletedHeader).toBeVisible();
        await accountDeletedPage.checkAccessibility('AccountDeletedPage');
        await expect(page).toHaveScreenshot('account-deleted-page.png');

        // 5. Continue and verify user is logged out (by checking for the Signup/Login button)
        await accountDeletedPage.continueButton.click();
        const homePage = new HomePage(page);
        await expect(homePage.signupLoginButton).toBeVisible();
    });
});