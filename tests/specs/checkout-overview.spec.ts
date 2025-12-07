import { CartPage } from '../pages/cart-page.ts';
import { InventoryPage } from '../pages/inventory-page.ts';
import { LoginPage } from '../pages/login-page.ts';
import { Users } from '../data/users.ts';
import { test, expect } from '@playwright/test';
import { CheckOutPageYourInfo } from '../pages/checkout-page-your-info.ts';
import { userInfo } from '../data/user-info.ts';

let inventoryPage: InventoryPage;
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  await loginPage.navigate();
  await loginPage.login(Users.standard.username, Users.standard.password);
});

test('CheckoutProcess(Vajla)', async ({ page }) => {
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

  // 6. Continue to overview
  await page.locator('[data-test="continue"]').click();
  await expect(page).toHaveURL(
    'https://www.saucedemo.com/checkout-step-two.html'
  );

  // 7. Finish checkout
  await page.locator('[data-test="finish"]').click({ force: true });

  // 8. Verify complete page
  await expect(page).toHaveURL(
    'https://www.saucedemo.com/checkout-complete.html'
  );

  console.log('Checkout completed successfully!');
});

test('checkout form left empty error', async ({ page }) => {
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
  await page.locator('[data-test="continue"]').click();
  await page.pause();
  await page.locator('[data-test="error"]');
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');

});
