import {test, expect, Locator} from "@playwright/test"

// Single selector option single dorpdown box---------------------------------------------------------------------
test("single selector option singledropdown", async({page}) =>
{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.waitForTimeout(2000);

    const countryDropdown: Locator = page.locator("#country");
    await countryDropdown.selectOption("Japan");                 // Selecting option through text.
    await page.waitForTimeout(2000);             
    await countryDropdown.selectOption({value: 'usa'});          //Selecting the  option through value attribute.
    await page.waitForTimeout(2000);        
    await countryDropdown.selectOption({index: 9});              //Selecting the option through Index number.
    await page.waitForTimeout(2000);           
    await countryDropdown.selectOption({label: 'France'});       //Selecting the option through label attribute.

// Assertions on dropdowns
    const countries: Locator = page.locator("#country>option");
    console.log(await countries.allTextContents());           // Before trimming the white spaces

    const countryvalues: string[] = (await countries.allTextContents()).map(text => text.trim());
    const len = countryvalues.length;

    console.log(`The dropdown contains ${len} values.`);
    console.log("After trimming the space:", countryvalues);

    expect(countries).toHaveCount(len);
    expect(countryvalues).toContain("Germany");

    for(const options of countryvalues)
    {
        console.log(options);
    }

    await page.waitForTimeout(3000);

});

// Multiple selector option in multiselect dropsown box----------------------------------------------------
test.only("Multiple selector option multidropdown", async({page}) =>
{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.waitForTimeout(2000);

    const countryDropdown: Locator = page.locator("#animals");
    await countryDropdown.selectOption(['Dog', 'Lion', 'Cat']);   // Selecting option through text.
    await page.waitForTimeout(2000);             
    await countryDropdown.selectOption([{value: 'giraffe'}, {value: 'zebra'}]);          //Selecting the option through value attribute.
    await page.waitForTimeout(2000);        
    await countryDropdown.selectOption([{index: 8}, {index: 5}]);              //Selecting the option through Index number.
    await page.waitForTimeout(2000);           
    await countryDropdown.selectOption([{label: 'Cheetah'}, {label: 'Rabbit'}]);       //Selecting the option through label attribute.

// Assertions on dropdowns
    const animals: Locator = page.locator("#animals>option");
    console.log(await animals.allTextContents());           // Before trimming the white spaces

    const multianivalues: string[] = (await animals.allTextContents()).map(text => text.trim());
    const len1 = multianivalues.length;

    console.log(`The dropdown contains ${len1} values.`);
    console.log("After trimming the space:", multianivalues);

    expect(animals).toHaveCount(len1);
    expect(multianivalues).toContain("Deer");

    for(const options of multianivalues)
    {
        console.log(options);
    }

    await page.waitForTimeout(3000);

});

