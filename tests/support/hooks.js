const { BeforeAll, AfterAll, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

setDefaultTimeout(60 * 1000);

let browser;
let server;
const supabaseStub = fs.readFileSync(path.join(__dirname, 'supabase-stub.browser.js'), 'utf8');

BeforeAll(async function () {
  server = spawn('npx', ['http-server', 'app', '-p', '8080'], {
    stdio: 'ignore'
  });

  await new Promise(resolve => setTimeout(resolve, 2000));

  browser = await chromium.launch({ headless: true });
});

AfterAll(async function () {
  if (browser) await browser.close();
  if (server) server.kill();
});

Before(async function () {
  this.context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  await this.context.route(/cdn\.jsdelivr\.net\/npm\/@supabase\/supabase-js@2/, async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: supabaseStub
    });
  });
  await this.context.addInitScript(() => {
    if (!window.VOLARIX_SUPABASE_CONFIG) {
      window.VOLARIX_SUPABASE_CONFIG = {
        url: 'https://auth-test.supabase.co',
        publishableKey: 'sb_publishable_test'
      };
    }
  });
  this.page = await this.context.newPage();
  this.page.on('console', msg => console.log('Browser log:', msg.text()));
  this.page.on('pageerror', error => console.log('Browser error:', error));
});

After(async function () {
  await this.page.close();
  await this.context.close();
});
