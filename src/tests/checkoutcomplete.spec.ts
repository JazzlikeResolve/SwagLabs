import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { validuser } from '../Data/Users';
import { ProductsPageLocators } from '../Locators/ProductsPage';
import { YourCartLocators } from '../Locators/YourCart';
import { CheckoutYourInfo } from '../Pages/CheckoutYourInfo';
import { ProductsPage } from '../Pages/ProductsPage';
import { YourCart } from '../Pages/YourCart';
import { CheckoutOverview } from '../Pages/CheckoutOverview';
import { CheckOutCompleteClass } from '../Pages/CheckOutComplete';

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
    const checkoutOverview = new CheckoutOverview(page);
    await checkoutOverview.clickFinishButton();
  });

  test('Verify Checkout Complete Title', async ({ page }) => {
    const completeCheckout = new CheckOutCompleteClass(page);
    await completeCheckout.checkoutCompleteTitle();
  });

  test('Thank you Message', async ({ page }) => {
    const completeCheckout = new CheckOutCompleteClass(page);
    await completeCheckout.thankYouMessage();
  });

  test('Back Home Button', async ({ page }) => {
    const completeCheckout = new CheckOutCompleteClass(page);
    await completeCheckout.backToProducts();
  });
});
