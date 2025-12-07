import { test, expect, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { InventoryPage } from './inventory-page';
import { info } from 'console';
import { userInfo } from 'os';

export class CheckOutPageYourInfo extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get firstNameTextBox() {
    return this.page.locator('#first-name');
  }

  private get lastNameTextBox() {
    return this.page.locator('#last-name');
  }

  private get zipPostCode() {
    return this.page.locator('#postal-code');
  }

  private get continueButton() {
    return this.page.locator('#continue');
  }

  async checkOutInfo(
    firstName: string,
    lastName: string,
    zipPostCode: string
  ): Promise<void> {
    await this.firstNameTextBox.fill(firstName);
    await this.lastNameTextBox.fill(lastName);
    await this.zipPostCode.fill(zipPostCode.toString());
  }

  private get cancelButton() {
    return this.page.getByRole('button', { name: 'cancel' });
  }

  async cancelButtonClick(): Promise<void> {
    await this.cancelButton.click;
  }

  async continueButtonClick(): Promise<void> {
    await this.continueButton.click;
  }
}
