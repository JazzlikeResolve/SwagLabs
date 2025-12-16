import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { invalidUsers, validuser } from '../Data/Users';
import { ProductsPage } from '../Pages/ProductsPage';
import { YourCart } from '../Pages/YourCart';
import { YourCartLocators } from '../Locators/YourCart';
import { CheckoutYourInfo } from '../Pages/CheckoutYourInfo';
import { ProductsPageLocators } from '../Locators/ProductsPage';
import { users } from '../Data/CheckoutInfo';

test.describe('Checkout Information Your Info', () => {
  test.beforeEach('Opening SauceLabs homepage', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login(
      validuser.standard.username,
      validuser.standard.password
    );
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    const productsPage = new ProductsPage(page);
    await productsPage.page
      .locator(ProductsPageLocators.shoppingCartButton)
      .click();
    const yourCart = new YourCart(page);
    await yourCart.page.locator(YourCartLocators.checkOutButton).click();
  });

  test('Verify the Checkout Information Title ', async ({ page }) => {
    const checkoutYourInfo = new CheckoutYourInfo(page);
    await checkoutYourInfo.checkOutYourInformationTitle();
  });

  //for loop to run through the user data
  for (const info of users.valid) {
    test(`Valid checkout info: ${info.firstName} ${info.lastName}`, async ({
      page,
    }) => {
      const checkoutYourInfo = new CheckoutYourInfo(page);
      await checkoutYourInfo.validLoginInfo(
        info.firstName,
        info.lastName,
        info.postalCode
      );
      await expect(page).toHaveURL(
        'https://www.saucedemo.com/checkout-step-two.html'
      );
    });
  }

  for (const info of users.invalid) {
    test(`Invalid checkout info: ${info.firstName}, ${info.lastName}`, async ({
      page,
    }) => {
      const checkoutYourInfo = new CheckoutYourInfo(page);
      await checkoutYourInfo.invalidLoginInfo(
        info.firstName,
        info.lastName,
        info.postalCode
      );
    });
  }
});
