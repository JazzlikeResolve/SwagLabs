import { test, expect, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  private url = 'https://www.saucedemo.com/';

  private get userNameInput() {
    return this.page.locator('#user-name');
  }

  private get userPasswordInput() {
    return this.page.locator('#password');
  }

  private get loginButton() {
    return this.page.locator('#login-button');
  }

  //you need the getter method in order for the error to show in the method
  private get errorMessage() {
    return this.page.locator('[data-test="error"]'); //copy dont type locators
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async login(username: string, password: string): Promise<void> {
    await this.userNameInput.fill(username);
    await this.userPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyPageUrl(): Promise<void> {
    await expect(this.page).toHaveURL(this.url);
  }

  //you run the test if it is wrong it returns a string "error message" if not than its null
  async getLoginErrorLocked(): Promise<void> {
    await expect(this.errorMessage).toHaveText(
      /Epic sadface: Sorry, this user has been locked out./
    );
  }

  async getLoginErrorNoPassword(): Promise<void> {
    await expect(this.errorMessage).toHaveText(
      /Epic sadface: Password is required/
    );
  }

  async getLoginErrorUser(): Promise<void> {
    await expect(this.errorMessage).toHaveText(
      /Epic sadface: Password is required/
    );
  }

  async getLoginErrorVisual_userNoPW(): Promise<void> {
    await expect(this.errorMessage).toHaveText(
      /Epic sadface: Password is required/
    );
  }

  async getLoginErrorNoUsername(): Promise<void> {
    await expect(this.errorMessage).toHaveText(
      /Epic sadface: Username is required/
    );
  }

  async getInvalidUserNameAndPassword(): Promise<void> {
    await expect(this.errorMessage).toHaveText(
      /Epic sadface: Username and password do not match any user in this service/
    );
  }
}
