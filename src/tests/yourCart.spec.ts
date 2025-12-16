import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { validuser } from '../Data/Users';
import { ProductsPage } from '../Pages/ProductsPage';
import { YourCart } from '../Pages/YourCart';
import { YourCartLocators } from '../Locators/YourCart';

test.beforeEach('Opening SauceLabs homepage', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo('https://www.saucedemo.com/');
  await loginPage.login(
    validuser.standard.username,
    validuser.standard.password
  );
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Verify if Your Cart Title is showing', async ({ page }) => {
  const yourCart = new YourCart(page);
  await yourCart.yourCartTitleHeader();
});

test('Select Item to show as 1 on QTY', async ({ page }) => {
  const yourCart = new YourCart(page);
  await yourCart.selectFirstItemForCart();
});

test('Select All Items Quantity(6)', async ({ page }) => {
  const yourCart = new YourCart(page);
  await yourCart.selectAllItemsQuantity();
});

test('Remove Items From Cart(0)', async ({ page }) => {
  const yourCart = new YourCart(page);
  await yourCart.removeItemsFromCart();
});

test('Verify Cart Prices Match', async ({ page }) => {
  const yourCart = new YourCart(page);
  await yourCart.verifyCartPricesMatch();
});

test('Verify the Continue Shopping Button', async ({ page }) => {
  const yourCart = new YourCart(page);
  await yourCart.page.locator(YourCartLocators.shoppingCartLink).click();
  await yourCart.page.locator(YourCartLocators.continueShopping).click();
  await yourCart.page.locator(YourCartLocators.shoppingCartLink).click();
  await yourCart.page.locator(YourCartLocators.checkOutButton).click();
});
