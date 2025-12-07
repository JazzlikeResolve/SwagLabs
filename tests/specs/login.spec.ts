import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page'; 
import { Users } from '../data/users';

test('Open Login Page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.verifyPageUrl();
  await expect(page).not.toHaveURL('error');
  await expect(page).toHaveTitle('Swag Labs');
});

test('Error Message Locked', async ({ page }) => {
  const errorMessage = new LoginPage(page);
  await errorMessage.navigate();
  // inserting users and password from users test data management//
  await errorMessage.login(Users.locked.username, Users.locked.password);
  await errorMessage.getLoginErrorLocked();
});

test('Performance Glitch No Password', async ({ page }) => {
  const errorMessage = new LoginPage(page);
  await errorMessage.navigate();
  // inserting users and password from users test data management //
  await errorMessage.login(
    Users.performance_glitch_user_no_pw.username,
    Users.performance_glitch_user_no_pw.password
  );
  await errorMessage.getLoginErrorVisual_userNoPW();
});

test('Error No Username', async ({ page }) => {
  const errorMessage = new LoginPage(page);
  await errorMessage.navigate();
  // inserting users and password from users test data management//
  await errorMessage.login(
    Users.noUsername.username,
    Users.noUsername.password
  );
  await errorMessage.getLoginErrorNoUsername();
});

test('Invalid Username and Password', async ({ page }) => {
  const errorMessage = new LoginPage(page);
  await errorMessage.navigate();
  // inserting users and password from users test data management//
  await errorMessage.login(
    Users.invalidUser_and_Password.username,
    Users.invalidUser_and_Password.password
  );
  await errorMessage.getInvalidUserNameAndPassword();
});

test('Positive Test-Happy Path', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.verifyPageUrl();
  await loginPage.login(Users.standard.username, Users.standard.password);
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});
