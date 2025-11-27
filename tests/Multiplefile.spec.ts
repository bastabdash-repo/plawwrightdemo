import { test, expect, Locator, Page, Browser, chromium } from '@playwright/test';

test('Multiple file uplaod test', async () => {

    const browser: Browser = await chromium.launch({ headless: false, slowMo: 100, args: ['--start-maximized'] });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php', { waitUntil: 'domcontentloaded' });

    await page.waitForTimeout(5000);

    await expect(page.locator('#filesToUpload')).toBeVisible();

    //upload multiple files

    await page.locator('#filesToUpload').setInputFiles(["/Users/rider/Desktop/Screenshot.png","/Users/rider/.Trash/Screenshot1.png"]);



    await page.waitForTimeout(5000);

    //deselect all files

    await page.locator('#filesToUpload').setInputFiles([]);

    await page.waitForTimeout(5000);







});

