import { test, expect, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { InventoryPage } from './inventory-page';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly CartItems = [
    'Sauce Labs Backpack',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Bike Light',
  ];

  private url = 'https://www.saucedemo.com/cart.html';

  private get cartItems() {
    return this.page.locator('.cart_list .inventory_item_name');
  }

  private get checkOutButton() {
    return this.page.getByRole('button', { name: 'checkout' });
  }

  async getCartCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async listOfCartItems(): Promise<string[]> {
    return await this.cartItems.allTextContents();
  }

  async checkOut(): Promise<void> {
    await this.checkOutButton.click();
  }
}
