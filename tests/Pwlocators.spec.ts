import {test, expect, Locator, chromium} from '@playwright/test'

test("Verify Locators", async ({page}) =>
{
    await page.goto("https://www.saucedemo.com/");

    await page.getByPlaceholder("Username").fill("standard_user");

    await page.getByTestId("password").fill("secret_sauce");

    await page.getByRole("button", {name: 'Login'}).click();

    let logo: Locator = page.getByText("Swag Labs");
    console.log("Page title is:",await logo.textContent());

    await expect(logo).toBeVisible();

    let header: Locator = page.getByText("Products");
    console.log("Page content header is:",await header.textContent());

    await expect(header).toHaveText("Products");

    let img: Locator = page.getByAltText("Sauce Labs Backpack");

    await expect(img).toHaveAttribute('class', 'inventory_item_img');

    let cost = await page.getAttribute(".inventory_item_price", "data-test");

    const price = await page.textContent('.inventory_item_price');

    console.log("Price of the backpack is:", price);

    await page.waitForTimeout(3000);

    await page.getByRole("button", {name: 'Open Menu'}).click();

    await page.getByRole("link", {name: 'Logout'}).click();

    await page.waitForTimeout(3000);
    
})
