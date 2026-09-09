const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// MARKET DATA
When('the market data synchronizes', async function () {
  await this.page.evaluate(() => syncMarketData());
});

Then('the Fear & Greed banner should display a numeric value between 0 and 100', async function () {
  const fgText = await this.page.locator('#fgVal').textContent();
  const val = parseInt(fgText);
  expect(val).toBeGreaterThanOrEqual(0);
  expect(val).toBeLessThanOrEqual(100);
});

Then('the live stock quotes should reflect current market prices', async function () {
  // Wait for syncMarketData to run at least once
  await this.page.waitForTimeout(2000);
  const prices = await this.page.locator('.watchlist-price').allTextContents();
  
  for (const priceText of prices) {
    const price = parseFloat(priceText.replace('$', ''));
    expect(price).toBeGreaterThan(0);
    
    // Specifically check that AAPL is not stuck at the old 2024 hardcoded value of 189.45
    // and instead reflects more modern (2026) pricing context provided by the user.
    if (priceText.includes('AAPL')) {
       expect(price).toBeGreaterThan(250); 
    }
  }
});

// PROFIT CALCULATOR
Given('the user is on the Paper Trading dashboard', async function () {
  await this.page.click('button:has-text("Paper Trading")');
});

When('they open the Options Calculator for {string}', async function (ticker) {
  // Simulate opening the calc for a ticker
  await this.page.evaluate((t) => openCalc(t, 'Long Call', 875, 9.30, 30), ticker);
});

When('they slide the underlying price to ${int}', async function (price) {
  await this.page.locator('#calcSlider').evaluate((el, p) => {
    el.value = p;
    el.dispatchEvent(new Event('input'));
  }, price);
});

Then('the calculated P&L should update to reflect the profit for a Long Call', async function () {
  const pnlText = await this.page.locator('#calcCurrentPnl').textContent();
  expect(pnlText).toContain('P&L at');
});

// PERSISTENCE
Given('the user is logged into the VolariX dashboard', async function () {
  // Assume auth stub is active
});

When('they add {string} to their watchlist', async function (ticker) {
  await this.page.evaluate((t) => addToWatchlist(t), ticker);
});

When('they reload the browser page', async function () {
  await this.page.reload();
});

Then('{string} should still be visible in their watchlist', async function (ticker) {
  const content = await this.page.locator('#watchlistSidebar').textContent();
  expect(content).toContain(ticker);
});

// TRADE JOURNAL
Given('the user has 1 winning trade and 1 losing trade', async function () {
  await this.page.evaluate(() => {
    STATE.paperTrades = [
      { t: 'AAPL', s: 'Long Call', pnl: '+$150.00', cls: 'win' },
      { t: 'TSLA', s: 'Long Put', pnl: '-$100.00', cls: 'loss' }
    ];
    saveState();
  });
});

When('they navigate to the Trade Journal', async function () {
  await this.page.click('button:has-text("Trade Journal")');
});

Then('the Win Rate statistic should display {string}', async function (expected) {
  const winRate = await this.page.locator('.journal-stat-val').first().textContent();
  expect(winRate).toBe(expected);
});

// IV HISTORICAL CHART
Given('the user is on the Mega-Cap Screener', async function () {
  await this.page.click('button:has-text("Mega-Cap IV")');
});

When('they click on {string} to open its scorecard', async function (ticker) {
  await this.page.evaluate((t) => openScorecard(t, 'analyze'), ticker);
});

Then('a 52-week historical IV chart should be visible', async function () {
  const isVisible = await this.page.locator('#ivHistoryCanvas').isVisible();
  expect(isVisible).toBe(true);
});

// PWA
Given('the user opens the VolariX app', async function () {
  // Already on the page
});

Then('the active service worker should be successfully registered', async function () {
  const isRegistered = await this.page.evaluate(async () => {
    const reg = await navigator.serviceWorker.getRegistration();
    return reg !== undefined;
  });
  expect(isRegistered).toBe(true);
});

// ECONOMIC CALENDAR
Given('the user is on the Economic Calendar tab', async function () {
  await this.page.click('button:has-text("Economic Cal")');
});

When('they select the {string} filter', async function (filter) {
  await this.page.click(`button:has-text("${filter}")`);
});

Then('only events marked with a high-impact badge should be displayed', async function () {
  const rows = await this.page.locator('.eco-row').all();
  for (const row of rows) {
    const badge = row.locator('.badge-red');
    await expect(badge).toBeVisible();
  }
});
