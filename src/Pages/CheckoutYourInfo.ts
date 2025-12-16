import { BasePage } from './BasePage';
import { Page, expect } from '@playwright/test';
import { checkoutYourInfoLocators } from '../Locators/CheckoutYourInfo';

export class CheckoutYourInfo extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async checkOutYourInformationTitle() {
    const checkOutYourInfoTitle = await this.page.locator(
      checkoutYourInfoLocators.checkOutYourInformationTitle
    );
    await expect(checkOutYourInfoTitle).toBeVisible();
    await expect(checkOutYourInfoTitle).toHaveText(
      'Checkout: Your Information'
    );
  }

  async validLoginInfo(
    firstName: string,
    lastName: string,
    postalcode: string
  ) {
    await this.page
      .locator(checkoutYourInfoLocators.firstNameBox)
      .fill(firstName);
    await this.page
      .locator(checkoutYourInfoLocators.lastNameBox)
      .fill(lastName);
    await this.page.locator(checkoutYourInfoLocators.postBox).fill(postalcode);
    await this.page.locator(checkoutYourInfoLocators.continueButton).click();
  }
  async invalidLoginInfo(
    firstName: string,
    lastName: string,
    postalcode: string
  ) {
    await this.page
      .locator(checkoutYourInfoLocators.firstNameBox)
      .fill(firstName);
    await this.page
      .locator(checkoutYourInfoLocators.lastNameBox)
      .fill(lastName);
    await this.page.locator(checkoutYourInfoLocators.postBox).fill(postalcode);
    await this.page.locator(checkoutYourInfoLocators.continueButton).click();

    const errorMessage = this.page.locator(
      checkoutYourInfoLocators.errorMessage
    );
    await expect(errorMessage).toBeVisible();

    if (!firstName) {
      await expect(errorMessage).toHaveText('Error: First Name is required');
    }
    if (!lastName) {
      await expect(errorMessage).toHaveText('Error: Last Name is required');
    }
    if (!postalcode) {
      await expect(errorMessage).toHaveText('Error: Postal Code is required');
    }
  }
}
