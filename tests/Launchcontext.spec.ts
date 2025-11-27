import { test, chromium, Locator } from '@playwright/test';
import { Console } from 'console';


test('Basic Auth Test', async ({ }, testInfo) => {


    // const browser = await chromium.launch({
    //     headless: false, slowMo: 100, args: ['--start-maximized'], channel: 'chrome'
    // });


    // const context = await browser.newContext({});

    const browser = await chromium.launchPersistentContext('./session', {
        headless: false, slowMo: 100, args: ['--start-maximized'], channel: 'chrome'
    });


    const pages = browser.pages();

    const page = pages[0];
    //const page = await browser.newPage();


    console.log('Navigating... to link ');
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register', { waitUntil: 'domcontentloaded' });


    //Locator test 
    const Res_img: Locator = await page.locator('css=input#input-firstname');
    const Img_CHECK = await Res_img.isEnabled();
    console.log(Img_CHECK);

    //Enter text in the locator
    await Res_img.fill('Naveen');
    await page.getByRole('link', { name: 'Address Book' }).click();

    //Screenshot
    await page.screenshot({ path: 'RegisterPage.png', fullPage: true });


    //Timout Syntax
    //  new Promise((resolve) => setTimeout(resolve, 10000));
    await page.waitForTimeout(5000);
    //hello wordl


});