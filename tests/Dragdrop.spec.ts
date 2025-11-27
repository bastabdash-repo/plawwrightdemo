import { test, expect, Browser, Page, Locator, chromium } from '@playwright/test'
import { argon2Sync } from 'crypto';


test('Mouse Drag Drop', async () => {

    const browser: Browser = await chromium.launch({ headless: false, slowMo: 100, args: ['--start-maximized'] });

    const context = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto('https://jqueryui.com/droppable/', { waitUntil: 'domcontentloaded' });

    await page.waitForTimeout(5000);

    // await page.screenshot({path:'DragDrop1.png', fullPage:true});

    //await page.locator('#draggable').dragTo(page.locator('#droppable'));


    const frame = page.frameLocator('.demo-frame');
    const draggable = frame.locator('#draggable');
    const droppable = frame.locator('#droppable');

    const draggableBox = await draggable.boundingBox();
    const droppableBox = await droppable.boundingBox();

    if (draggableBox && droppableBox) {
        await page.mouse.move(
            draggableBox.x + draggableBox.width / 2,
            draggableBox.y + draggableBox.height / 2
        );
        await page.mouse.down();
        await page.mouse.move(
            droppableBox.x + droppableBox.width / 2,
            droppableBox.y + droppableBox.height / 2
        );
        await page.mouse.up();
    }


    // const frame = page.frameLocator('.demo-frame');
    // await frame.locator('#draggable').dragTo(frame.locator('#droppable'));




    await page.waitForTimeout(15000);
    await page.screenshot({ path: 'DragDrop2.png', fullPage: true });

});