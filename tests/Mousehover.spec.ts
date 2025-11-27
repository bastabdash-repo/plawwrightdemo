import{test,expect,Browser,Page,Locator,chromium} from '@playwright/test'

test('Mouse Hover Tes',async() =>{
const browser: Browser = await chromium.launch({headless :false, slowMo:100, args:['--start-maximized']})

const context = await browser.newContext();
const page = await context.newPage();

await page.goto('https://www.spicejet.com/',{waitUntil:'domcontentloaded'});

await page.waitForTimeout(10000);


await page.getByText('Add-ons').first().hover();
await page.getByText('Taxi').first().click();


await page.waitForTimeout(10000);

await page.screenshot({path:'Mousehover.png', fullPage:true});
    

});
