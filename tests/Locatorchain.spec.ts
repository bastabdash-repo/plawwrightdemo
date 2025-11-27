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
    await page.goto('https://www.orangehrm.com/en/30-day-free-trial', { waitUntil: 'domcontentloaded' });



   // await page.locator('form#Form_getForm >> #Form_getForm_Name').fill('Naveen');



   const recaptchaFrame = page.frameLocator('iframe[title="reCAPTCHA"]').locator('.recaptcha-checkbox-border').click();


    await page.locator('form#Form_getForm >> text = Get Your Free Trial').click();


   await page.waitForTimeout(5000);
    //Screenshot
    await page.screenshot({ path: 'RegisterPage.png', fullPage: true });


    //Timout Syntax
    //  new Promise((resolve) => setTimeout(resolve, 10000));
    await page.waitForTimeout(5000);


});