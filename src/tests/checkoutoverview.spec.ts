import { test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { validuser } from '../Data/Users';
import { ProductsPage } from '../Pages/ProductsPage';
import { ProductsPageLocators } from '../Locators/ProductsPage';
import { YourCart } from '../Pages/YourCart';
import { YourCartLocators } from '../Locators/YourCart';
import { CheckoutYourInfo } from '../Pages/CheckoutYourInfo';
import { CheckoutOverview } from '../Pages/CheckoutOverview';
import { expect } from '@playwright/test';

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
    const yourCart = new YourCart(page);

    await yourCart.selectAllItemsQuantity();
    await productsPage.page
      .locator(ProductsPageLocators.shoppingCartButton)
      .click();

    await yourCart.page.locator(YourCartLocators.checkOutButton).click();
    const checkoutYourInfo = new CheckoutYourInfo(page);
    await checkoutYourInfo.validLoginInfo('Adnan', 'Samson', '71400');
  });

  test('Verify Title for Checkout: Overview', async ({ page }) => {
    const checkoutOverview = new CheckoutOverview(page);
    const openingTitle = await checkoutOverview.verifyCheckOutOverviewTitle();
    await checkoutOverview.verifyCheckOutOverviewTitle();
  });

  test('Verify Payment Information Title', async ({ page }) => {
    const checkoutOverview = new CheckoutOverview(page);
    const paymentTitle = checkoutOverview.paymentInformationTitle();
    await checkoutOverview.paymentInformationTitle();
  });

  test('Verify shipping Information Title ', async ({ page }) => {
    const checkoutOverview = new CheckoutOverview(page);
    const shippingInformationTitle =
      checkoutOverview.shippingInformationTitle();
    await checkoutOverview.shippingInformationTitle();
  });

  test('Verify Total Information Title', async ({ page }) => {
    const checkoutOverview = new CheckoutOverview(page);
    const priceTotalTitle = checkoutOverview.priceTotalTitle();
    await checkoutOverview.priceTotalTitle();
  });

  test('Verify Total Amounts', async ({ page }) => {
    const checkoutOverview = new CheckoutOverview(page);
    await checkoutOverview.verifyTotal();
  });
});
