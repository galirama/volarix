const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I navigate to the VolariX app dashboard', async function () {
  // Directly load the app page by bypassing login (which requires localStorage auth normally,
  // but since we simulate auth via simple localStorage check in app.html, let's inject it)
  await this.page.goto('http://localhost:8080/login.html');
  await this.page.evaluate(() => {
    sessionStorage.setItem('volarix_auth', JSON.stringify({
      user: { email: 'demo@volarix.com', name: 'Demo User', plan: 'free' },
      loginTime: Date.now(),
      expires: Date.now() + 8 * 60 * 60 * 1000
    }));
  });
  await this.page.goto('http://localhost:8080/app.html');
  await this.page.waitForSelector('.sidebar');
});

When('I click on the {string} tab', async function (tabName) {
  const locator = this.page.locator(`.nav-item:has-text("${tabName}")`);
  await locator.waitFor({ state: 'attached' });
  await locator.click({ force: true });
});

Then('the {string} should be visible', async function (cardTitle) {
  const locator = this.page.locator(`.card-title:has-text("${cardTitle}")`);
  await locator.waitFor({ state: 'visible' });
  expect(await locator.isVisible()).toBe(true);
});

When('I click the {string} preset button', async function (buttonText) {
  const locator = this.page.locator(`button:has-text("${buttonText}")`);
  await locator.click();
});

Then('the screener table should update its rows', async function () {
  // Wait a moment for rendering
  await this.page.waitForTimeout(500);
  const rows = await this.page.locator('#chkTableBody tr').count();
  expect(rows).toBeGreaterThan(0);
});

Then('the results count should reflect the filter applied', async function () {
  const resultsCountText = await this.page.locator('#chkResultsCount').innerText();
  expect(resultsCountText).toMatch(/\d+ stocks scored/);
});
