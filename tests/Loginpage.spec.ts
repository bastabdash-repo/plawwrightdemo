import { test, expect, Browser, Page, Locator, BrowserContext, chromium } from '@playwright/test';
test('Login Page', async () => {


  const [browser1, browser2]: Browser[] = await Promise.all([chromium.launch({ headless: false, slowMo: 100 }), chromium.launch({ headless: false, slowMo: 100 })]);
  const [newuserContext1, newuserContext2]: BrowserContext[] = await Promise.all([browser1.newContext(), browser2.newContext()]);
  const [page1, page2]: Page[] = await Promise.all([newuserContext1.newPage(), newuserContext2.newPage()]);


  const PerformanceLogin = async (page: Page, email: string, pass: string, screenshot: string) => {
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login', { waitUntil: 'load' });
    const emailid: Locator = await page.locator('#input-email');
    const password: Locator = await page.locator('#input-password');
    const login: Locator = await page.locator("[value='Login']");

    await page.waitForSelector('#input-email', { state: 'visible' });
    await emailid.fill(email);
    await password.fill(pass);
    await login.click();

    await page.waitForLoadState('networkidle');
    const title = await page.title();
    console.log('The titel of the page is ' + title);
    expect(title).toContain('My Account');

    await page.click('text=Edit your account information', { timeout: 60000 });
    //take screen
    await page.screenshot({ path: screenshot, fullPage: true });



  };

  // Run both logins in parallel
  try {
    await Promise.all([
      PerformanceLogin(page1, 'Akash.mishra@gmail.com', '123456789', 'login_akash.png'),
      PerformanceLogin(page2, 'bastab.dash@gmail.com', '234567890', 'login_bastab.png')
    ]);
  } catch (err) {
    console.error('Login failed:', err);
  } finally {
    await Promise.all([browser1.close(), browser2.close()]);
  }

}); 