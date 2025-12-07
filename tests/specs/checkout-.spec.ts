import { CartPage } from '../pages/cart-page.ts';
import { InventoryPage } from '../pages/inventory-page.ts';
import { LoginPage } from '../pages/login-page.ts';
import { Users } from '../data/users.ts';
import { test, expect } from '@playwright/test';
import { CheckOutPageYourInfo } from '../pages/checkout-page-your-info.ts';
import { url } from 'inspector';
import { userInfo } from '../data/user-info.ts';
import { CheckoutPageStepTwo } from '../pages/checkout-page-step-two.ts';

let inventoryPage: InventoryPage;
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(Users.standard.username, Users.standard.password);
});

test('CheckoutProcess(Vajla)', async ({ page }) => {
  inventoryPage = new InventoryPage(page);

  // 1. Add items
  await inventoryPage.addSauceLabsBackpacktoCart();
  await inventoryPage.addTshirtFleeceJakcetBikeLight();

  // 2. Click cart button - USE PROMISE.ALL
  await Promise.all([
    page.locator('.shopping_cart_link').click(), //locator was the issue,correct Locator
    page.waitForURL('https://www.saucedemo.com/cart.html'),
  ]);

  // 3. Now use CartPage
  const cartPage = new CartPage(page);
  const cartCount = await cartPage.getCartCount();
  const cartList = await cartPage.listOfCartItems();

  console.log(`Cart count: ${cartCount}`);
  console.log('Cart items:', cartList);

  // Should be 4 items total
  expect(cartCount).toBe(4);
  //list of items that should match
  expect(cartList).toEqual(cartPage.CartItems);
  expect(cartList[0]).toContain('Sauce Labs Backpack');
  expect(cartList[1]).toContain('Sauce Labs Bolt T-Shirt');

  await cartPage.checkOut();
  const checkoutPage = new CheckOutPageYourInfo(page);

  await checkoutPage.checkOutInfo(
    userInfo.myName.firstName,
    userInfo.myName.lastName,
    userInfo.myName.zipPostCode
  );
  await checkoutPage.continueButtonClick();
  const checkoutPageStepTwo = new CheckoutPageStepTwo(page);
  await checkoutPageStepTwo.cancelButtonClick();
});

test('CheckoutProcess(Kiameta)', async ({ page }) => {
  inventoryPage = new InventoryPage(page);

  // 1. Add items
  await inventoryPage.addSauceLabsBackpacktoCart();
  await inventoryPage.addTshirtFleeceJakcetBikeLight();

  // 2. Click cart button - USE PROMISE.ALL
  await Promise.all([
    page.locator('.shopping_cart_link').click(), //locator was the issue,correct Locator
    page.waitForURL('https://www.saucedemo.com/cart.html'),
  ]);

  // 3. Now use CartPage
  const cartPage = new CartPage(page);
  const cartCount = await cartPage.getCartCount();
  const cartList = await cartPage.listOfCartItems();

  console.log(`Cart count: ${cartCount}`);
  console.log('Cart items:', cartList);

  // Should be 4 items total
  expect(cartCount).toBe(4);
  //list of items that should match
  expect(cartList).toEqual(cartPage.CartItems);
  expect(cartList[0]).toContain('Sauce Labs Backpack');
  expect(cartList[1]).toContain('Sauce Labs Bolt T-Shirt');

  await cartPage.checkOut();
  const checkoutPage = new CheckOutPageYourInfo(page);

  await checkoutPage.checkOutInfo(
    userInfo.herName.firstName,
    userInfo.herName.lastName,
    userInfo.herName.zipPostCode
  );
  await checkoutPage.continueButtonClick();
  const checkoutPageStepTwo = new CheckoutPageStepTwo(page);
  await checkoutPageStepTwo.cancelButtonClick();
});

test('CheckoutProcess(Mujo)', async ({ page }) => {
  inventoryPage = new InventoryPage(page);

  // 1. Add items
  await inventoryPage.addSauceLabsBackpacktoCart();
  await inventoryPage.addTshirtFleeceJakcetBikeLight();

  // 2. Click cart button - USE PROMISE.ALL
  await Promise.all([
    page.locator('.shopping_cart_link').click(), //locator was the issue,correct Locator
    page.waitForURL('https://www.saucedemo.com/cart.html'),
  ]);

  // 3. Now use CartPage
  const cartPage = new CartPage(page);
  const cartCount = await cartPage.getCartCount();
  const cartList = await cartPage.listOfCartItems();

  console.log(`Cart count: ${cartCount}`);
  console.log('Cart items:', cartList);

  // Should be 4 items total
  expect(cartCount).toBe(4);
  //list of items that should match
  expect(cartList).toEqual(cartPage.CartItems);
  expect(cartList[0]).toContain('Sauce Labs Backpack');
  expect(cartList[1]).toContain('Sauce Labs Bolt T-Shirt');

  await cartPage.checkOut();
  const checkoutPage = new CheckOutPageYourInfo(page);

  await checkoutPage.checkOutInfo(
    userInfo.parentsName.firstName,
    userInfo.parentsName.lastName,
    userInfo.parentsName.zipPostCode
  );
  await checkoutPage.continueButtonClick();
  const checkoutPageStepTwo = new CheckoutPageStepTwo(page);
  await checkoutPageStepTwo.cancelButtonClick();
});

test('add all of the inventory items', async ({ page }) => {
  // Get all inventory items
  const allItems = page.locator('.inventory_item');
  const itemCount = await allItems.count();
  console.log(`Found ${itemCount} inventory items`);

  for (let i = 0; i < itemCount; i++) {
    const item = allItems.nth(i);
    await item.locator('button').click();
  }
  //await page.pause();
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toBeVisible();
  await expect(cartBadge).toHaveText(itemCount.toString()); //item count is listed above in the count code
  await inventoryPage.clickShoppingCartButton();
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
});