import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignupPage extends BasePage {
    readonly titleRadio: (gender: 'Mr' | 'Mrs') => Locator;
    readonly passwordInput: Locator;
    readonly daysDropdown: Locator;
    readonly monthsDropdown: Locator;
    readonly yearsDropdown: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly address1Input: Locator;
    readonly countryDropdown: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;

    constructor(page: Page) {
        super(page);
        this.titleRadio = (gender) => page.locator(`#id_gender${gender === 'Mr' ? '1' : '2'}`);
        this.passwordInput = page.locator('input[data-qa="password"]');
        this.daysDropdown = page.locator('select[data-qa="days"]');
        this.monthsDropdown = page.locator('select[data-qa="months"]');
        this.yearsDropdown = page.locator('select[data-qa="years"]');
        this.firstNameInput = page.locator('input[data-qa="first_name"]');
        this.lastNameInput = page.locator('input[data-qa="last_name"]');
        this.address1Input = page.locator('input[data-qa="address"]');
        this.countryDropdown = page.locator('select[data-qa="country"]');
        this.stateInput = page.locator('input[data-qa="state"]');
        this.cityInput = page.locator('input[data-qa="city"]');
        this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
        this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');
        this.createAccountButton = page.locator('button[data-qa="create-account"]');
    }

    async fillRegistrationForm(userData: any) {
        await this.titleRadio(userData.title).check();
        await this.passwordInput.fill(userData.password);
        await this.daysDropdown.selectOption(String(userData.dob.day));
        await this.monthsDropdown.selectOption(String(userData.dob.month));
        await this.yearsDropdown.selectOption(String(userData.dob.year));
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.address1Input.fill(userData.address);
        await this.countryDropdown.selectOption(userData.country);
        await this.stateInput.fill(userData.state);
        await this.cityInput.fill(userData.city);
        await this.zipcodeInput.fill(userData.zipcode);
        await this.mobileNumberInput.fill(userData.mobileNumber);
        await this.createAccountButton.click();
    }
}