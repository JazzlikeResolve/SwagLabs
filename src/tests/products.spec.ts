import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { validuser } from '../Data/Users';
import { ProductsPage } from '../Pages/ProductsPage';

test.beforeEach('Opening SauceLabs homepage', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo('https://www.saucedemo.com/');
  await loginPage.login(
    validuser.standard.username,
    validuser.standard.password
  );
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Verify all Product Items', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.verifyAllProductItemInfo();
  await productsPage.verifyAllProductItems();
});

test('List of Prices for all products with names', async ({ page }) => {
  const productPage = new ProductsPage(page);
  await productPage.verifyAllPricesWithNames();
});

test('List of Prices', async ({ page }) => {
  const productPage = new ProductsPage(page);
  await productPage.verifyAllPrices();
});

test('Verify all Add Buttons are working', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.addButtons();
});

test('About Button Working', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.aboutButton();
});

test('Logout Button Working', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.logoutButton();
});

test('Drop Down A to Z button', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.sortAtoZDropDown();
});

test('Drop Down Z to A button', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.sortZtoADropDown();
});

test('Prices Low to High', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.pricesLowToHigh();
});

test('Prices High to Low', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.pricesHighToLow();
});

test('Verify all Remove Buttons are working', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.removeButton();
});
