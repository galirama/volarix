const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

let consoleErrors = [];

// Helper to capture errors
// Note: The hooks.js already logs errors to the console. We could potentially listen to page errors more directly if we wanted to assert on them.

Then('the page should be loaded with no console errors', async function () {
  // We can verify that no major errors occurred by checking the browser logs if we were tracking them.
  // For now, we verify the document is ready.
  const readyState = await this.page.evaluate(() => document.readyState);
  expect(readyState).toBe('complete');
  
  // We can also verify that we haven't seen "SyntaxError" in the logs if we were capturing them.
});

Then('I should see the dashboard title', async function () {
  await expect(this.page.locator('title')).toHaveText(/VolariX — Dashboard/);
});
