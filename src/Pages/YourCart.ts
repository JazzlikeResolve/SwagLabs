import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { YourCartLocators } from '../Locators/YourCart';
import { ProductsPageLocators } from '../Locators/ProductsPage';

export class YourCart extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async yourCartTitleHeader() {
    const cartTitle = await this.page.getByText(YourCartLocators.yourCartTitle);
    await this.page.locator(YourCartLocators.shoppingCartLink).click();
    expect(cartTitle).toHaveText('Your Cart');
  }

  async youCartQtyTitle() {
    const cartQtyTitle = await this.page.locator(
      YourCartLocators.shoppingCartQuantity
    );
    expect(cartQtyTitle).toBeVisible();
  }

  async selectFirstItemForCart() {
    const firstCartItem = this.page.locator(YourCartLocators.firstaddButton);
    const isVisible = await firstCartItem.isVisible();

    if (isVisible) {
      await firstCartItem.isVisible();
      await firstCartItem.click();
      const quantityCart = this.page.locator(
        YourCartLocators.shoppingCartQuantity
      );
      await expect(quantityCart).toHaveText('1');
      console.log('Item is showing as 1');
    } else {
      console.log('First Add to cart button is not visible');
    }
  }

  async selectAllItemsQuantity() {
    const buttons = this.page.locator(ProductsPageLocators.addButton);
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click();
      await this.page.waitForTimeout(3000);
    }
    const quantityCart = this.page.locator(
      YourCartLocators.shoppingCartQuantity
    );
    if (quantityCart) {
      await expect(quantityCart).toHaveText('6');
      await this.page.locator(ProductsPageLocators.shoppingCartButton).click();
      console.log('All 6 items are showing');
    } else {
      throw new Error();
    }
  }

  async removeItemsFromCart() {
    const buttons = this.page.locator(ProductsPageLocators.addButton);
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click();
    }
    const quantityCart = this.page.locator(
      YourCartLocators.shoppingCartQuantity
    );
    if (quantityCart) {
      await expect(quantityCart).toHaveText('6');
      await this.page.locator(ProductsPageLocators.shoppingCartButton).click();
      console.log('All 6 items are showing');
    } else {
      throw new Error();
    }
    const removeButton = this.page.getByRole('button', { name: 'Remove' });
    const countRemove = await removeButton.count();
    for (let i = 0; i < countRemove; i++) {
      await removeButton.nth(0).click(); // always click the first "Remove"
    }

    // Assert cart badge is empty
    await expect(quantityCart).toHaveCount(0);
  }

  async verifyCartPricesMatch() {
    // Get all product prices from the products page
    const productPricesOnPage = await this.page
      .locator(ProductsPageLocators.allProductPrices)
      .allTextContents();

    // Get all product prices from the cart page
    const productPricesInCart = await this.page
      .locator(YourCartLocators.allProductPrices)
      .allTextContents();

    console.log('Products page prices:', productPricesOnPage);
    console.log('Cart page prices:', productPricesInCart);

    // Assert that both arrays match exactly
    await expect(productPricesInCart).toEqual(productPricesOnPage);
  }

  async continueShoppingButton() {
    await this.page.locator(YourCartLocators.continueShopping).click();
  }
}
