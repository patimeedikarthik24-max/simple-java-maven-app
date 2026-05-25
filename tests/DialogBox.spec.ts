import {test, expect, Locator} from "@playwright/test"

test("Handling Simple Alert Dialog box", async ({page}) =>
{
    await page.goto("https://testautomationpractice.blogspot.com/#");
    await page.waitForTimeout(1000);

    const simpleAlert: Locator = page.getByRole("button",{name: 'Simple Alert'});

    page.on("dialog", async (dialog) =>
    {
        await dialog.accept();

        const typeOfdailog: string = dialog.type();
        console.log("This dialog box is a type of:", typeOfdailog);
        expect(typeOfdailog).toContain("alert");

        const text: string = dialog.message();
        console.log("This dialog box contains the following message:", text);
        expect(text).toContain("I am an alert box!");

    });

    await simpleAlert.click();

    await page.waitForTimeout(3000);

});

test("Handling Confirmation Alert Dialog box", async ({page}) =>
{
    await page.goto("https://testautomationpractice.blogspot.com/#");
    await page.waitForTimeout(1000);

    const confirmAlert: Locator = page.getByRole("button",{name: 'Confirmation Alert'});

    page.on("dialog", async (dialog) =>
    {
        // await dialog.accept();  

        await dialog.dismiss(); // For clicking on cancelling button of the alert box

        const typeOfdailog: string = dialog.type();
        console.log("This dialog box is a type of:", typeOfdailog);
        expect(typeOfdailog).toContain("confirm");

        const text: string = dialog.message();
        console.log("This dialog box contains the following message:", text);
        expect(text).toContain("Press a button!");
        
    });

    await confirmAlert.click();

    const validate: Locator = page.locator("#demo");
    const text: string = await validate.innerText();

    // console.log("After accepting the alert box:", text);
    console.log("After cancelling the alert box:", text);

    expect(validate).toHaveText(text);

    await page.waitForTimeout(3000);

});

test.only("Handling Prompt Alert Dialog box", async ({page}) =>
{
    await page.goto("https://testautomationpractice.blogspot.com/#");
    await page.waitForTimeout(1000);

    const promptAlert: Locator = page.getByRole("button",{name: 'Prompt Alert'});

    page.on("dialog", async (dialog) =>
    {
        const typeOfdailog: string = dialog.type();
        console.log("This dialog box is a type of:", typeOfdailog);
        expect(typeOfdailog).toContain("prompt");

        const text: string = dialog.message();
        console.log("This dialog box contains the following message:", text);
        expect(text).toContain("Please enter your name:");

        const textBoxValue: string = dialog.defaultValue();
        console.log("The default value of the text box in alert is:", textBoxValue);
        expect(textBoxValue).toContain("Harry Potter");

        await dialog.accept("Monkey.D Luffy");  

        // await dialog.dismiss(); 
        
    });

    await promptAlert.click();
    
    const validate: Locator = page.locator("#demo");
    const text: string = await validate.innerText();

    // console.log("After accepting the alert box:", text);
    console.log("After cancelling the alert box:", text);

    await expect(validate).toHaveText(text);

    await page.waitForTimeout(3000);

});