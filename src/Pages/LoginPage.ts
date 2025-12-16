import { expect, Page } from 'playwright/test';
import { BasePage } from './BasePage';
import { LoginPageLocators } from '../Locators/LoginPage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async verifyLoginLogo() {
    const logo = this.page.locator(LoginPageLocators.pageTitle);
    await expect(logo).toBeVisible();
    await expect(logo).toHaveText('Swag Labs');
  }

  async login(username: string, password: string) {
    await this.page.locator(LoginPageLocators.username).fill(username);
    await this.page.locator(LoginPageLocators.password).fill(password);
    await this.page.locator(LoginPageLocators.loginButton).click();
  }

  async loginErrorMessage(): Promise<string> {
    const errorMessage = this.page.locator(LoginPageLocators.errorMessage);
    await expect(errorMessage).toBeVisible();
    return (await errorMessage.textContent()) || ''; //return error message or nothing
  }
}
