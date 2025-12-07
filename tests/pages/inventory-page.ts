import { expect, Page } from '@playwright/test';
import { APP_CONSTANTS } from './constants/app.constants';
import { BasePage } from './base-page';

//the bridge between the test and the webpage
//same as constructor(page:Page){this.page = page;}
export class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private url = 'https://www.saucedemo.com/inventory.html';

  private getBurgerMenuButton() {
    return this.page.getByRole('button', { name: 'Open Menu' });
  }

  private getHamburgerMenuInventory() {
    return this.page.locator('.bm-item-list .bm-item');
  }

  // test('Get menu items', async () => {
  //   const menuItems: string[] = await inventoryPage.openMenuAndGetItems();
  //   console.log('Menu Items:', menuItems);
  //Menu Items: [ 'All Items', 'About', 'Logout', 'Reset App State' ]
  //readonly function does not change

  readonly EXPECTED_MENU_ITEMS = [
    'All Items',
    'About',
    'Logout',
    'Reset App State',
  ];

  readonly ItemNames = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Onesie',
    'Test.allTheThings() T-Shirt (Red)',
  ];

  private getAppLogo() {
    return this.page.getByText('Swag Labs');
  }

  private getDropDownMenu() {
    return this.page.locator('.product_sort_container');
  }

  private getSauceLabsBackpack() {
    return this.page.getByText('Sauce Labs Backpack');
  }

  private getListOfAllIventory() {
    return this.page.locator('.inventory_item_name');
  }

  private getSauceLabsBackpackDescription() {
    return this.page.getByText(
      'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'
    );
  }

  private getSauceLabsBackpackContainer() {
    return this.page
      .locator('.inventory_item')
      .filter({ hasText: 'Sauce Labs Backpack' });
  }

  private getSauceLabsBackpackPrice() {
    return this.page.getByText('$29.99');
  }

  private addSauceLabsBackpackToBasket() {
    return this.page.locator('#add-to-cart-sauce-labs-backpack');
  }

  private addSauceLabsBoltTshirtToCart() {
    return this.page.locator('#add-to-cart-sauce-labs-bolt-t-shirt');
  }

  private addFleeceJacketToCart() {
    return this.page.locator('#add-to-cart-sauce-labs-fleece-jacket');
  }

  private addSauceLabsBikeLightToCart() {
    return this.page.locator('#add-to-cart-sauce-labs-bike-light');
  }

  private addAllInventoryToCart() {
    return this.page.locator('.inventory_item');
  }

  private removeSauceLabsBoltTshirtToCart() {
    return this.page.locator('#remove-sauce-labs-bolt-t-shirt');
  }

  private removeFleeceJacketToCart() {
    return this.page.locator('#remove-sauce-labs-fleece-jacket');
  }

  private removeSauceLabsBikeLightToCart() {
    return this.page.locator('#remove-sauce-labs-bike-light');
  }

  private shoppingCartButton() {
    return this.page.locator('.shopping_cart_link');
  }

  private get continueButton() {
    return this.page.locator('#continue');
  }

  async goto(): Promise<void> {
    await this.page.goto(`${APP_CONSTANTS.APP_URL}/inventory.html`);
    await this.page.waitForTimeout(APP_CONSTANTS.TIMEOUTS.SHORT);
  }

  async verifyLogo(): Promise<void> {
    await expect(this.getAppLogo()).toBeVisible();
  }

  async verifyLogoText(): Promise<void> {
    await expect(this.getAppLogo()).toHaveText('Swag Labs', { exact: true });
    // await expect(this.getAppLogo()).toHaveText('Swag Labs', { exact: true });
  }

  async verifyBackpackVisibility(): Promise<void> {
    await expect(this.getSauceLabsBackpack()).toBeVisible();
  }

  async verifyBackpackLogoText(): Promise<void> {
    await expect(this.getSauceLabsBackpack()).toHaveText(
      'Sauce Labs Backpack',
      { exact: true }
    );
  }
  async verifyBackpackDescriptionText(): Promise<void> {
    await expect(this.getSauceLabsBackpackDescription()).toHaveText(
      'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
      { exact: true }
    );
  }
  async hoverSauceLabsBackpack(): Promise<void> {
    await this.getSauceLabsBackpack().hover();
  }

  async openMenuAndGetItems(): Promise<string[]> {
    await this.getBurgerMenuButton().click();
    return await this.getHamburgerMenuInventory().allTextContents(); // the text contents means the array will be filled with the menu items
  }

  async dropDownMenuItems(): Promise<string[]> {
    return await this.getDropDownMenu().locator('option').allTextContents(); // the text contents means the array will be filled with the menu items
  }

  async verifyMenuItems(): Promise<void> {
    const items = await this.openMenuAndGetItems(); // Store the returned array
    expect(items).toEqual(this.EXPECTED_MENU_ITEMS); // Compare
  }
  async listOfInventoryItems(): Promise<string[]> {
    return await this.getListOfAllIventory().allTextContents();
  }

  async addAllIventoryItems(): Promise<void> {
    await this.addAllInventoryToCart().click();
  }

  async getInventoryCount(): Promise<number> {
    return await this.getListOfAllIventory().count();
  }

  async verifyBackpackPrice(): Promise<void> {
    const price = await this.getSauceLabsBackpackPrice().textContent();
    expect(price).toBe('$29.99');
  }
  async verifyBackpackPriceVisible(): Promise<void> {
    await expect(this.getSauceLabsBackpackPrice()).toBeVisible();
  }

  async addSauceLabsBackpacktoCart(): Promise<void> {
    await this.addSauceLabsBackpackToBasket().click();
  }

  async hoverOverSauceLabsBackpack(): Promise<void> {
    await this.getSauceLabsBackpackContainer().hover(); //you have to hover over first only difference is whole container
    await expect(this.addSauceLabsBackpackToBasket()).toBeVisible({
      //expect it to be visible
      timeout: APP_CONSTANTS.TIMEOUTS.SHORT, //constants page to help timeout
    });
  }

  async dropDownMenuOptions(): Promise<string[]> {
    return this.getDropDownMenu().locator('option').allTextContents();
  }

  async sortByValue(value: string) {
    const dropdown = this.getDropDownMenu();
    await dropdown.selectOption({ value });
    return dropdown; // Return for verification call the string so it lists it
  }

  async verifySortValue(expectedValue: string): Promise<void> {
    await expect(this.getDropDownMenu()).toHaveValue(expectedValue);
  }

  async addTshirtFleeceJakcetBikeLight(): Promise<void> {
    await this.addSauceLabsBoltTshirtToCart().click();
    await this.addFleeceJacketToCart().click();
    await this.addSauceLabsBikeLightToCart().click();
  }

  async removeTwoItemsFromCart(): Promise<void> {
    await this.removeSauceLabsBikeLightToCart();
    await this.removeFleeceJacketToCart();
  }

  async clickShoppingCartButton(): Promise<void> {
    await this.shoppingCartButton();
  }

  async clickContinueButton(): Promise<void> {
    await this.continueButton.click();
  }
}
