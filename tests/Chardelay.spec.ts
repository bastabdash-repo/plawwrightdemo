import{test,expect,Browser,Page,Locator,chromium} from '@playwright/test';

test('character delay typing', async () => {

    const browser: Browser = await chromium.launch({ headless: false, slowMo: 100, args: ['--start-maximized'] });

    const context = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto('https://www.flipkart.com/', { waitUntil: 'domcontentloaded' });



    await page.getByPlaceholder('Search for Products, Brands and More').pressSequentially('iphone', { delay: 200 });

       await page.waitForTimeout(5000);


});
