import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ProductsPageLocators } from '../Locators/ProductsPage';
import { products } from '../Data/Products';
import { url } from 'inspector';
import { count, error } from 'console';

export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async shoppingCartButton() {
    await this.page.locator(ProductsPageLocators.shoppingCartButton).click();
    await expect(this.page.locator('#cart_contents_container')).toHaveText(
      'Your Cart'
    );
  }

  async verifyAllProductItemInfo(): Promise<string[]> {
    const allProducts = await this.page
      .locator(ProductsPageLocators.allProducts)
      .allTextContents();
    console.log('This is all the info for products:', allProducts);
    return allProducts;
  }

  async verifyAllProductItems() {
    const allProducts = await this.verifyAllProductItemInfo();
    await expect(allProducts).toEqual(expect.arrayContaining(products));
  }

  async verifyAllPrices() {
    const productPrices = await this.page
      .locator(ProductsPageLocators.allProductPrices)
      .allTextContents();
    const countProductPrices = productPrices.length;
    for (let i = 0; i < countProductPrices; i++) {
      const prices = productPrices[i].trim();
      console.log(`${i + 1}: ${prices} `);
    }
  }

  async verifyAllPricesWithNames(): Promise<{ name: string; price: string }[]> {
    const productPrices = await this.page
      .locator(ProductsPageLocators.allProductPrices)
      .allTextContents();

    if (products.length !== productPrices.length) {
      //if the products array doesnt match how many prices we have it will throw an error
      throw new Error(
        `Mismatch: ${products.length} names vs ${productPrices.length} prices`
      );
    }

    return products.map((name, i) => {
      const price = productPrices[i].trim();
      console.log(`${name} - ${price}`);
      return { name, price };
    });
  }

  async verifyTitle() {
    const pageTitle = await this.page.locator(ProductsPageLocators.pageTitle);
    expect(pageTitle).toBeVisible();
  }

  async addButtons() {
    const buttons = this.page.locator(ProductsPageLocators.addButton);
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click();
      await this.page.waitForTimeout(3000);
    }
  }

  async aboutButton() {
    await this.page.locator(ProductsPageLocators.hamburgerMenu).click();
    await this.page.locator(ProductsPageLocators.aboutSideLink).isVisible();
    await this.page.locator(ProductsPageLocators.aboutSideLink).click();
    await expect(this.page).toHaveURL('https://saucelabs.com/');
    await expect(
      this.page.locator('button:has-text("Book a demo")')
    ).toBeVisible();
  }

  async logoutButton() {
    await this.page.locator(ProductsPageLocators.hamburgerMenu).click();
    await this.page.locator(ProductsPageLocators.aboutSideLink).isVisible();
    await this.page.locator(ProductsPageLocators.logOutSideLink).click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/');
  }

  async sortAtoZDropDown() {
    await this.page
      .locator(ProductsPageLocators.dropDownMenuProducts)
      .selectOption('za');
    await this.page
      .locator(ProductsPageLocators.dropDownMenuProducts)
      .selectOption('az');
    const allProducts = await this.page
      .locator(ProductsPageLocators.allProducts)
      .allInnerTexts();
    const sortedProducts = [...allProducts].sort((a, b) => a.localeCompare(b));

    expect(allProducts).toEqual(sortedProducts);
    console.log('Products are stored alphabetically:', allProducts);
  }

  async sortZtoADropDown() {
    await this.page
      .locator(ProductsPageLocators.dropDownMenuProducts)
      .selectOption('za');
    const allProducts = await this.page
      .locator(ProductsPageLocators.allProducts)
      .allInnerTexts();
    const sortedProducts = [...allProducts].sort((a, b) => b.localeCompare(a));

    expect(allProducts).toEqual(sortedProducts);
    console.log('Products are stored from Z to A:', allProducts);
  }

  async pricesLowToHigh() {
    await this.page
      .locator(ProductsPageLocators.dropDownMenuProducts)
      .selectOption('lohi');

    const productPrices = await this.page
      .locator(ProductsPageLocators.allProductPrices)
      .allTextContents();
    const numericPrices = productPrices.map((p) =>
      parseFloat(p.replace('$', ''))
    );
    const sortedPricesAsc = [...numericPrices].sort((a, b) => a - b);

    console.log('Actual numeric:', numericPrices);
    console.log('Expected sorted:', sortedPricesAsc);

    expect(numericPrices).toEqual(sortedPricesAsc);
  }

  async pricesHighToLow() {
    // Select the correct dropdown option for High → Low
    await this.page
      .locator(ProductsPageLocators.dropDownMenuProducts)
      .selectOption('hilo');

    // Grab raw prices
    const productPrices = await this.page
      .locator(ProductsPageLocators.allProductPrices)
      .allTextContents();
    const numericPrices = productPrices.map((p) =>
      parseFloat(p.replace('$', ''))
    );

    // Sort descending
    const sortedPricesDsc = [...numericPrices].sort((a, b) => b - a);

    console.log('Actual numeric:', numericPrices);
    console.log('Expected sorted (High→Low):', sortedPricesDsc);

    // Assert actual DOM order matches expected descending order
    expect(numericPrices).toEqual(sortedPricesDsc);
  }

  async removeButton() {
    const buttons = this.page.locator(ProductsPageLocators.addButton);
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click();
      await this.page.waitForTimeout(2000);
    }

    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click();
      await this.page.waitForTimeout(2000);
    }
  }
}
