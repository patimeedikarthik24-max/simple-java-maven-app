import {test, expect, Locator, chromium} from "@playwright/test"

test("Handling Tabs Demo", async () =>
{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const parentPage = await context.newPage();

    await parentPage.goto("https://testautomationpractice.blogspot.com/#");
    await  parentPage.waitForTimeout(2000);

    const tab: Locator = parentPage.getByRole("button", {name: 'New Tab'});

    const childPage = await Promise.all([context.waitForEvent("page"), tab.click()]);

// Switching between pages and get their titles.

    const pages = context.pages();
    console.log("The number of pages opened are:", pages.length);

    console.log("Title of parent page is:", await pages[0].title());
    console.log("Title of child page is:", await pages[1].title());

    
});