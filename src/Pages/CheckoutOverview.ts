import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutOverviewLocators } from '../Locators/CheckoutOverview';
import { ProductsPageLocators } from '../Locators/ProductsPage';
import { ProductsPage } from './ProductsPage';

export class CheckoutOverview extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async verifyCheckOutOverviewTitle() {
    const checkoutOverviewTitle = await this.page.locator(
      CheckoutOverviewLocators.checkoutOverviewTitle
    );
    await expect(checkoutOverviewTitle).toHaveText('Checkout: Overview');
  }

  async paymentInformationTitle() {
    const paymentInformationTitle = await this.page.getByText(
      CheckoutOverviewLocators.paymentInformationTitle
    );
    await expect(paymentInformationTitle).toHaveText('Payment Information:');
  }

  async shippingInformationTitle() {
    const shippingInformationTitle = await this.page.getByText(
      CheckoutOverviewLocators.shippingInformationTitle
    );
    await expect(shippingInformationTitle).toHaveText('Shipping Information:');
  }

  async priceTotalTitle() {
    const priceTotalTitle = await this.page.locator(
      CheckoutOverviewLocators.priceTotalTitle
    );
    await expect(priceTotalTitle).toHaveText('Price Total');
  }

  async verifyItemTotal(): Promise<number> {
    const itemTotalLabel = this.page.locator(
      CheckoutOverviewLocators.itemTotal
    );
    const itemTotalText = await itemTotalLabel.textContent();
    // Parse numeric value from "Item total: $129.94"
    return parseFloat(itemTotalText!.replace('Item total: $', ''));
  }

  async verifyTaxAmount(): Promise<number> {
    const taxLabel = await this.page.locator(CheckoutOverviewLocators.tax);
    const taxText = await taxLabel.innerText();
    return parseFloat(taxText!.replace('Tax: $', ''));
  }

  async verifyTotal() {
    const itemTotal = await this.verifyItemTotal();
    const taxTotal = await this.verifyTaxAmount();

    const total = `Total: $${(itemTotal + taxTotal).toFixed(2)}`;
    const totalLabel = await this.page.locator(CheckoutOverviewLocators.total);
    expect(totalLabel).toHaveText(total);
  }
  async clickFinishButton(): Promise<void> {
    const finishButton = this.page.locator(
      CheckoutOverviewLocators.finishButton
    );
    await Promise.all([
      this.page.waitForURL(/checkout-complete/),
      finishButton.click(),
    ]);
  }
}
