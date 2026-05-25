import {test, expect, Locator, chromium} from "@playwright/test"

test("Browser context demo", async () =>
{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://testautomationpractice.blogspot.com/#");
    await  page.waitForTimeout(2000);
    
});

// Creating two pages to run parallelly

test.only("Browser context multiple page demo", async () =>
{
    const browser = await chromium.launch();
    const context = await browser.newContext();

    const page1 = await context.newPage();
    const page2 = await context.newPage();
    
    const pages = context.pages();
    console.log("The number of pages we have are:", pages.length);

    await page1.goto("https://www.selenium.dev/");
    await  page1.waitForTimeout(2000);
    await expect(page1).toHaveTitle("Selenium");

    await page2.goto("https://playwright.dev/");
    await  page2.waitForTimeout(2000);
    await expect(page2).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");
    
});
