import {test, expect, Locator} from "@playwright/test"

test("Handling Keyboard Actions", async ({page}) =>
{
    await page.goto("https://testautomationpractice.blogspot.com/#");
    await page.waitForTimeout(2000);

    const input1: Locator = page.locator("#input1");

// 1) Focus or Click on input1 textbox.

    await input1.focus();               // OR 
    //await input1.click();                

// 2) Enter the text into input1 textbox.

    await page.keyboard.type("Welcome to Playwright testing.");        // OR

    // await page.keyboard.insertText("Welcome Playwright testing.");

// 3) Select the entire text from input1 textbox with Ctrl + A.

    await page.keyboard.press("Control+A");

// 4) Copy the entire text with Ctrl + C

    await page.keyboard.press("Control+C");

// 5) Press tab - 2 times to go to input2 textbox.

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

// 6) Paste the text with Ctrl + V in input2 textbox.

    await page.keyboard.press("Control+V");

// 7) Press tab - 2 times to go to input3 textbox.

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

// 8) Paste the text with Ctrl + V in input3 textbox.

    await page.keyboard.press("Control+V");

    await page.waitForTimeout(5000);

});