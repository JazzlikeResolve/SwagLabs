import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { invalidUsers, validuser } from '../Data/Users';

test.beforeEach('Opening SauceLabs homepage', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo('https://www.saucedemo.com/');
});

test('Verifying Login Logo is showing', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.verifyLoginLogo();
});

test.describe('Login Credentials Tests', () => {
  test('should allow a user to log in with valid credentials', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      validuser.standard.username,
      validuser.standard.password
    );
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });
});

Object.values(invalidUsers).forEach((user) => {
  //object value declared before test
  test(`${user.username} should show error`, async ({ page }) => {
    //test
    const invalidLogin = new LoginPage(page);
    await invalidLogin.login(user.username, user.password);
    const errorText = await invalidLogin.loginErrorMessage();
    console.log(`For ${user.username}: "${errorText}"`);

    if (user.username === 'locked_out_user') {
      expect(errorText).toBe(
        'Epic sadface: Sorry, this user has been locked out.'
      );
    } else if (user.username === 'noUsername') {
      console.log('Epic sadface: Username is required');
    } else if (user.username === 'noUsername') {
      console.log('Epic sadface: Username is required');
    } else if (user.username === 'no_password') {
      console.log('Epic sadface: Password is required');
    }
  });
});
