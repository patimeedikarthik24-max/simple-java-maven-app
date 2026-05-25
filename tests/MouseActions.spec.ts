import {test, expect, Locator} from "@playwright/test"

test("Handling Mouse Actions", async ({page}) =>
{
    await page.goto("https://testautomationpractice.blogspot.com/#");
    await page.waitForTimeout(1000);

    const mouseHover: Locator = page.getByRole("button", {name: 'Point Me'});
    await mouseHover.hover();                   // Hovering to mouseHover element.

    const laptop: Locator = page.locator("div[class='dropdown-content'] a:nth-child(2)");
    await laptop.hover();                       

    await  laptop.click({button: 'right'});     // Right clicking on the laptop element.

    // doubling clicking on the button using mouse actions.
    const doubleClickbtn = page.getByRole("button", {name: 'Copy Text'});
    await doubleClickbtn.dblclick();

    const validate: Locator = page.locator("#field2");
    expect(validate).toHaveValue("Hello World!");

    await page.waitForTimeout(3000);    

});

test.only("Handling Mouse Drag and Drop Action", async ({page}) =>
{
    await page.goto("https://demo.guru99.com/test/drag_drop.html");
    await page.waitForTimeout(1000);

    const bank: Locator = page.locator(".block14");
    const dbAmount: Locator = page.locator("#fourth").nth(0);

    const sales: Locator = page.locator(".block15");
    const crAmount: Locator = page.locator("#fourth").nth(1);

    const debitAccount: Locator = page.locator(".field14");
    const debitAmount: Locator = page.locator("#amt7");

    const creditAccount: Locator = page.locator(".field15");
    const creditAmount: Locator = page.locator("#amt8");

    // Approach 1: we can drag adn drop elements manually.

    await bank.hover();
    await page.mouse.down();        // This method will click on element. 
    await debitAccount.hover();
    await page.mouse.up();          // This method will release the click function on element

// Approach 2: we can Drag adn Drop elements using dragTo() method, without using down() & up() methods.

    await dbAmount.dragTo(debitAmount);

    await sales.dragTo(creditAccount);

    await crAmount.dragTo(creditAmount);

    const validate: Locator = page.locator(".table4_result");
    
    expect(validate).toHaveText("Perfect!");

    await page.waitForTimeout(3000);

});