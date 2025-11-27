import { test, expect, chromium } from '@playwright/test';


test('Drop down list test',async()=>{

const browser = await chromium.launch({headless:false,slowMo:100,args:['--start-maximized'],channel : 'chrome'});
const context = await browser.newContext();
const page = await context.newPage();

await page.goto('https://www.magupdate.co.uk/reader-enquiry/PATI/254',{waitUntil:'domcontentloaded'});

const dropdown = 'css=select#Contact_CountryCode';

//await page.selectOption(dropdown,'AG');

//await page.selectOption(dropdown,{index:4});

await page.selectOption(dropdown,{label:'India'});

await page.waitForTimeout(5000);

await page.screenshot({path : 'Dropdown.png',fullPage : true})

});



