import {test, expect, Locator} from "@playwright/test"

test("Auto suggest Dropdowns", async ({page}) =>
{
    await page.goto("https://opensource-demo.orangehrmlive.com");
    await page.waitForTimeout(3000);
    
// Login function.
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.locator("button[type='submit']").click();
    await page.waitForTimeout(3000);

// Assertion.
    const heading: Locator = page.getByRole("heading", {name: 'Dashboard'});
    await expect(heading).toBeVisible();

// PIM employee list.
    await page.getByText("PIM").click(); 
    const verifyText: Locator = page.getByRole("link", {name: 'Employee List'});
    await expect(verifyText).toBeVisible();

// Selecting Employee status dropdown in the form.
    const details: Locator = page.locator("form i");
    await details.nth(0).click();
    await page.waitForTimeout(2000);

    const options: Locator = page.locator("[role='option'] span");
    const count: number = await options.count();
    console.log(`The Employee Status dropdown has: ${count} values`);

    for(let i=0; i<count; i++)
    {
        console.log("The values are:", await options.nth(i).innerText());
    }

// Selecting option from the dropdown in 2 ways using index or with a condition in for loop.
// First way
    await options.nth(3).click();
    await page.waitForTimeout(2000);
// Second way
    await details.nth(0).click();
    for(let i=0; i<count; i++)
    {
        const text: string = await options.nth(i).innerText();
        if(text === "Full-Time Permanent")
        {
            await options.nth(i).click();
            break;
        }
    }
    await page.waitForTimeout(2000);

// Selecting Job Title dropdown in the form
    await details.nth(2).click();
    await page.waitForTimeout(2000);

    const options2: Locator = page.locator("[role='option'] span");
    const count2: number = await options2.count();
    console.log(`The Job title dropdown has: ${count2} values`);

    for(let i=0; i<count2; i++)
    {
        console.log("The values are:", await options2.nth(i).innerText());
    }

    await options2.nth(13).click();
    await page.waitForTimeout(2000);

    await details.nth(2).click();
    for(let i=0; i<count2; i++)
    {
        const text: string = await options2.nth(i).innerText();
        if(text === "QA Engineer")
        {
            await options2.nth(i).click();
            break;
        }
    }

    await page.waitForTimeout(3000);
});