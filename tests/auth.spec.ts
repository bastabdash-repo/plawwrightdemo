import { test, chromium } from '@playwright/test';

test('Basic Auth Test', async ({ }, testInfo) => {
    testInfo.setTimeout(60000); // 60s timeout

    const browser = await chromium.launch({
        headless: false,
        slowMo: 100,
        args: ['--start-maximized']
    });

  
    const context = await browser.newContext({
        
    });

    const page = await context.newPage();

    console.log('Navigating...');
    await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth', { waitUntil: 'domcontentloaded' });
    console.log('Navigation done ✅');

    await page.screenshot({ path: 'Basic_Auth.png', fullPage: true });

    await page.waitForTimeout(3000);
    await browser.close();
});
