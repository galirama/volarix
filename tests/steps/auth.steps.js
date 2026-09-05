const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I navigate to the VolariX login page', async function () {
  await this.page.goto('http://localhost:8080/login.html');
});

When('I click the {string} button', async function (buttonText) {
  await this.page.locator(`button:has-text("${buttonText}")`).click();
});

When('I sign in with an authorized email and password', async function () {
  await this.page.fill('#loginEmail', 'owner@volarix.test');
  await this.page.fill('#loginPass', 'test-password');
  await this.page.click('#loginBtn');
});

Then('I should see private access sign-in', async function () {
  await expect(this.page.getByText('Private access')).toBeVisible();
  await expect(this.page.locator('#loginForm')).toBeVisible();
});

Then('the demo login path should be absent', async function () {
  await expect(this.page.getByText('Try Live Demo')).toHaveCount(0);
  await expect(this.page.getByText('Create account')).toHaveCount(0);
});

Then('I should be redirected to the main app dashboard', async function () {
  await this.page.waitForURL('**/app.html*');
  expect(this.page.url()).toContain('app.html');
});

Then('the sidebar should contain a {string} navigation item', async function (itemText) {
  const locator = this.page.locator(`.nav-item:has-text("${itemText}")`);
  await locator.waitFor({ state: 'attached' });
  expect(await locator.count()).toBeGreaterThan(0);
});
