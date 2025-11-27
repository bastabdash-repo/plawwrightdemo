import { test, chromium, Locator } from '@playwright/test';
import { Console } from 'console';

test('Basic Auth Test', async ({ }, testInfo) => {


    const browser = await chromium.launch({
        headless: false, slowMo: 100, args: ['--start-maximized'], channel: 'chrome'
    });


    const context = await browser.newContext({});
    const page = await context.newPage();
    console.log('Navigating...');
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register', { waitUntil: 'domcontentloaded' });

    const Res_img: Locator = await page.locator('css=input#input-firstname');

    const Img_CHECK = await Res_img.isEnabled();

    console.log(Img_CHECK);

    await Res_img.fill('Naveen');

    await page.getByRole('link', { name: 'Address Book' }).click();

    await page.screenshot({ path: 'RegisterPage.png', fullPage: true });

    //  new Promise((resolve) => setTimeout(resolve, 10000));



    await page.waitForTimeout(5000);


});