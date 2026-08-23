const { BeforeAll, AfterAll, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { spawn } = require('child_process');

setDefaultTimeout(60 * 1000);

let browser;
let server;

BeforeAll(async function () {
  // Start the local static server
  server = spawn('npx', ['http-server', 'app', '-p', '8080'], {
    stdio: 'ignore'
  });
  
  // Wait a moment for server to start
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Launch playwright
  browser = await chromium.launch({ headless: true });
});

AfterAll(async function () {
  if (browser) await browser.close();
  if (server) server.kill();
});

Before(async function () {
  this.context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  this.page = await this.context.newPage();
  this.page.on('console', msg => console.log('Browser log:', msg.text()));
  this.page.on('pageerror', error => console.log('Browser error:', error));
});

After(async function () {
  await this.page.close();
  await this.context.close();
});
