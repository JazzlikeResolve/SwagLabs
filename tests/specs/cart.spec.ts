import { CartPage } from '../pages/cart-page';
import { InventoryPage } from '../pages/inventory-page';
import { LoginPage } from '../pages/login-page';
import { Users } from '../data/users';
import { test, expect } from '@playwright/test';

let inventoryPage: InventoryPage;
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(Users.standard.username, Users.standard.password);
});

test('Add items and verify cart', async ({ page }) => {
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
});
