import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckOutCompleteLocators } from '../Locators/CheckoutComplete';

export class CheckOutCompleteClass extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async checkoutCompleteTitle() {
    const completeTitle = await this.page.locator(
      CheckOutCompleteLocators.checkoutCompleteTitle
    );

    await expect(completeTitle).toHaveText('Checkout: Complete!');
  }
  async thankYouMessage() {
    const thankYouMessage = await this.page.locator(
      CheckOutCompleteLocators.thankYouMessage
    );
    await expect(thankYouMessage).toHaveText('Thank you for your order!');
  }

  async backToProducts() {
    const backHome = await this.page.locator(CheckOutCompleteLocators.backHome);
    await backHome.click();
    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/inventory.html'
    );
  }
}
