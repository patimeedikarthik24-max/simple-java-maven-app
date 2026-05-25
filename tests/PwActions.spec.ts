import {test, expect, Locator} from "@playwright/test";

test("Verify Input text box", async ({page}) =>
{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.waitForTimeout(2000);

//Used XOR(,) operator in css selector, so either one selector can be true for element to be returned.
    const inputNameBox: Locator = page.locator("[id='name'], [placeholder='Enter Name']"); 
    await expect(inputNameBox).toBeVisible();
    await expect(inputNameBox).toBeEnabled();
    const maxNameLen: string | null = await inputNameBox.getAttribute("maxlength");
    console.log("Max length of name should be:", maxNameLen);
    expect(maxNameLen).toBe("15");

    await inputNameBox.fill("Luffy");

/* inputValue() method returns the string that was entered into the textbox element.
Here textContent() method cannot be used the as dynamically entered text is not visible in the dom html page. */
    console.log("Name is:", await inputNameBox.inputValue());
    await page.waitForTimeout(2000);

//Used XAND operator in css selector, so both selectors should be true for element to be returned.
   const inputEmailBox: Locator = page.locator("[id='email'][placeholder='Enter EMail']");
   await expect(inputEmailBox).toBeVisible();
   await expect(inputEmailBox).toBeEnabled();
   const maxEmailLen: string | null = await inputEmailBox.getAttribute("maxlength");
   console.log("Max length of email should be:", maxEmailLen);
   expect(maxEmailLen).toBe("25");

   await inputEmailBox.fill("PirateLuffy56@gmail.com");
   console.log("Email is:", await inputEmailBox.inputValue());
   await page.waitForTimeout(3000);

});

test("Verify Radio Buttons", async ({page}) =>
{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.waitForTimeout(2000);

    const maleRadioButton: Locator = page.locator("#male");
    await expect(maleRadioButton).toBeVisible();
    await expect(maleRadioButton).toBeEnabled();
    expect(await maleRadioButton.isChecked()).toBe(false);

    await maleRadioButton.check();
    expect(await maleRadioButton.isChecked()).toBe(true);
    await expect(maleRadioButton).toBeChecked(); //preferable assertion method

    await page.waitForTimeout(3000);

});

test.only("Verify Checkboxes", async ({page}) =>
{

    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.waitForTimeout(2000);

//1. Select specific checkbox using getByLabel() method-----------------------------------------------------
    /* const sundayCheckBox: Locator = page.getByLabel("Sunday");
    await expect(sundayCheckBox).toBeVisible();
    await expect(sundayCheckBox).toBeEnabled();

    await sundayCheckBox.check();
    await expect(sundayCheckBox).toBeChecked(); */

//2. Select all checkboxes---------------------------------------------------------------------------------
    const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const checkBoxes: Locator[] = days.map(index => page.getByLabel(index));
    expect(checkBoxes.length).toBe(7);

    for(const checkbox of checkBoxes)
    {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }

// 3. To Uncheck either starting desired checkboxes or last desired checkboxes by using slice() method----------

    for(const checkbox of checkBoxes.slice(0, 2))
    {
        await checkbox.uncheck();  // This will uncheck first 2 checkboxes, which were previously selected checkboxes from above loop.
        await expect(checkbox).not.toBeChecked();
    }
    await page.waitForTimeout(2000);

    for(const checkbox of checkBoxes.slice(-2)) // Here we use -2 so to uncheck 2 checkboxes from bottom of array.
    {
        await checkbox.uncheck();  // This will uncheck last 2 checkboxes, which were previously selected checkboxes from above loop.
        await expect(checkbox).not.toBeChecked();
    }
    await page.waitForTimeout(2000);

// 4. Condition to check the unchecked boxes and vice versa-------------------------------------------------
    for(const checkbox of checkBoxes)
    {
        if(await checkbox.isChecked())
        {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        }
        else
        {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }
    await page.waitForTimeout(2000);
    
// 5. To select checkboxes randomly based on indexes-------------------------------------------------------
    const indexes: number[] = [2, 4];
    for(const i of indexes)
    {
        await checkBoxes[i].check();
        await expect(checkBoxes[i]).toBeChecked();
    }

    await page.waitForTimeout(3000);

});