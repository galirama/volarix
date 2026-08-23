const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I navigate to the VolariX login page', async function () {
  await this.page.goto('http://localhost:8080/login.html');
});

When('I click the {string} button', async function (buttonText) {
  // Try to find a button containing the exact text
  await this.page.locator(`button:has-text("${buttonText}")`).click();
});

Then('I should be redirected to the main app dashboard', async function () {
  // Wait for page load or URL change
  await this.page.waitForURL('**/app.html*');
  expect(this.page.url()).toContain('app.html');
});

Then('the sidebar should contain a {string} navigation item', async function (itemText) {
  // Wait for the specific text in the sidebar nav items
  const locator = this.page.locator(`.nav-item:has-text("${itemText}")`);
  await locator.waitFor({ state: 'attached' });
  expect(await locator.count()).toBeGreaterThan(0);
});
