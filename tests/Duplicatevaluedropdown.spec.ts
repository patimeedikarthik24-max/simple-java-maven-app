import {test, expect, Locator} from "@playwright/test"

test("Verify duplicate dropdowns", async ({page}) =>
{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.waitForTimeout(2000);

    const dropsownvalues: Locator = page.locator("#colors>option");
    console.log("This dropdown have:", await dropsownvalues.count());
    await expect(dropsownvalues).toHaveCount(7);

    const originalcolors = (await dropsownvalues.allTextContents()).map(text => text.trim());
    console.log("The values of colors dropdown are:", originalcolors);

    const myset = new Set<string>();
    const duplicatecolors: string[] = [];

    for(const color of originalcolors)
    {
        if(myset.has(color))
        {
            duplicatecolors.push(color);
        }
        else
        {
            myset.add(color)
        }
    }
    console.log("The number of duplicate values contained in colors dropdown are:", duplicatecolors.length);
    console.log("The duplicate values of colors are:", duplicatecolors);

    await page.waitForTimeout(3000);

});