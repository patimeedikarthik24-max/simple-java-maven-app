import {test, expect, Locator} from "@playwright/test"

test("Handling Popup windows Demo", async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://testautomationpractice.blogspot.com/#");

    const popUp: Locator = page.getByRole("button", {name: 'Popup Windows'});

    await Promise.all([page.waitForEvent("popup"), popUp.click()]);

    const allPopUpWindows = context.pages();
    console.log("The number of pages opened are:", allPopUpWindows.length);

});