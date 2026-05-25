import {test, expect} from '@playwright/test'

test("Verify title", async ({page})=>
{
    await page.goto("https://www.saucedemo.com/");

    let name = await page.title();

    console.log("Title :", name);

    await expect(page).toHaveTitle("Swag Labs");

})