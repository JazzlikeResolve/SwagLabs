import { test, expect } from '@playwright/test';
import { url } from 'inspector';
import { Users } from '../data/users';
import { InventoryPage } from '../pages/inventory-page';
import { LoginPage } from '../pages/login-page';

let inventoryPage: InventoryPage;
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  await loginPage.navigate();
  await loginPage.login(Users.standard.username, Users.standard.password);
});

test('Open Inventory Page', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); // this is the wrapper, you are heading to the url so you use page you are not messing with the pageobjects
});

test('VerifyLogo', async ({ page }) => {
  await inventoryPage.verifyLogo();
});

test('VerifyLogoText', async ({ page }) => {
  await inventoryPage.verifyLogoText();
});

test('Verify SauceLabsBackPack Visibility', async ({ page }) => {
  await inventoryPage.verifyBackpackVisibility();
});

test('Verify SauceLabsBackPack Logo', async ({ page }) => {
  await inventoryPage.verifyBackpackLogoText();
});

test('Verify SauceLabsBackPack Description', async ({ page }) => {
  await inventoryPage.verifyBackpackDescriptionText();
});

test('Hover over backpack', async ({ page }) => {
  await inventoryPage.hoverSauceLabsBackpack();
});

test('Get menu items', async () => {
  const menuItems = await inventoryPage.openMenuAndGetItems();
  console.log('Menu Items:', menuItems);
  expect(menuItems).toEqual(inventoryPage.EXPECTED_MENU_ITEMS);
});

// ✅ Opens the menu

// ✅ Returns array of menu item texts

// ✅ Clear, descriptive name

// ✅ Reusable for other tests

test('Verify menu items', async () => {
  await inventoryPage.verifyMenuItems(); // Open menu first the dropdown
});

// ✅ Uses the first method (DRY principle)

// ✅ Does the assertion inside the page object

// ✅ One-line verification in tests

// ✅ Clean separation of concerns

test('Get Drop Down items with verification', async () => {
  const dropDownItems = await inventoryPage.dropDownMenuOptions();
  console.log('Dropdown Menu Items:', dropDownItems);

  //Add assertions
  expect(dropDownItems).toHaveLength(4);
  expect(dropDownItems).toEqual([
    'Name (A to Z)',
    'Name (Z to A)',
    'Price (low to high)',
    'Price (high to low)',
  ]);
});

test('Verify BackPack Price', async ({ page }) => {
  await inventoryPage.verifyBackpackPrice();
});

test('Add Sauce Labs Backpack to Cart', async ({ page }) => {
  await inventoryPage.addSauceLabsBackpacktoCart();
});

test('AddThreeItemsToTheCart', async ({ page }) => {
  await inventoryPage.addTshirtFleeceJakcetBikeLight();
});

test('RemoveTwoItemsFromCart', async ({ page }) => {
  await inventoryPage.removeTwoItemsFromCart();
});

test('listOfAllInventoryItems', async ({ page }) => {
  const count = await page.locator('.inventory_item_name').count();
  console.log(`Direct selector count: ${count}`);
  const itemNames = await page
    .locator('.inventory_item_name')
    .allTextContents();
  console.log('Item names:', itemNames);
});

test('verifyCountofInventoryItems', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const count = await page.locator('.inventory_item_name').count();
  expect(count).toBe(6);
});

test('verifyAllOfTheInventoryItems', async ({ page }) => {
  const listInventoryPage = await inventoryPage.listOfInventoryItems();
  console.log('Inventory Items:', listInventoryPage);
  expect(listInventoryPage).toEqual(inventoryPage.ItemNames);
});


