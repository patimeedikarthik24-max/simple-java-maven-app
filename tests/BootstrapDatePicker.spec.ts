import {test, expect, Locator, Page} from "@playwright/test"

async function selectDatePicker(isDiffMonth: boolean, checkInDate: string, checkInMonth: string, checkInYear: string,
    checkOutDate: string, checkOutMonth: string, checkOutYear: string, page: Page)
{
    if(isDiffMonth)
    {
        while(true)
        {
            // ChecK-IN
            const inDatePicker: string = await page.locator(".d7bd90e008 h3").nth(0).innerText();
            const currentInMonth: string =  inDatePicker.split(" ")[0];
            const currentInYear: string = inDatePicker.split(" ")[1];

            // Check-Out
            const outDatePicker: string = await page.locator(".d7bd90e008 h3").nth(1).innerText();
            const currentOutMonth: string =  outDatePicker.split(" ")[0];
            const currentOutYear: string = outDatePicker.split(" ")[1];

            const checkInMatches: boolean = currentInMonth === checkInMonth && currentInYear === checkInYear;
            const checkOutMatches: boolean = currentOutMonth === checkOutMonth && currentOutYear === checkOutYear;

            if(checkInMatches && checkOutMatches)
            {
                break;
            }
            await page.getByRole("button", { name: "Next month" }).click()
        }  

        // Selecting Check-In date and Check-Out date in different months.
        const allInDate: Locator[] = await page.locator("table[class='b8fcb0c66a']").nth(0).locator("td").all();
        const allOutDate: Locator[] = await page.locator("table[class='b8fcb0c66a']").nth(1).locator("td").all();

        for(let date of allInDate)      // Check-In date Selection.
        {
            const inDateText: string = await date.innerText();
            if(checkInDate === inDateText)
            {
                await date.click();     
                break;
            }
        }   

        for(let date of allOutDate)      // Check-Out date selection.
        {
            const outDateText: string = await date.innerText();
            if(checkOutDate === outDateText)
            {
                await date.click();
                break;
            }
        }
    }
    else
    {
        while(true)
        {
            const DatePicker: string = await page.locator(".d7bd90e008 h3").nth(0).innerText();
            const currentInMonth: string =  DatePicker.split(" ")[0];
            const currentInYear: string = DatePicker.split(" ")[1];

            if(checkInMonth === currentInMonth && checkInYear === currentInYear)
            {
                break;
            }
            await page.getByRole("button", { name: "Next month" }).click()
        }

        // Selecting Check-In date and Check-Out date in same month.
        const allDates: Locator[] = await page.locator("table[class='b8fcb0c66a']").nth(0).locator("td").all();

        for(let date of allDates)      // Check-In date Selection.
        {
            const inDateText: string = await date.innerText();
            if(checkInDate === inDateText)
            {
                await date.click();     
                break;
            }
        }   

        for(let date of allDates)      // Check-Out date selection.
        {
            const outDateText: string = await date.innerText();
            if(checkOutDate === outDateText)
            {
                await date.click();
                break;
            }
        }
    }
}


test("Bootstrap Date picker", async ({page}) =>
{
    await  page.goto("https://www.booking.com/");
    await page.waitForTimeout(3000);

    const datePicker: Locator = page.locator("[data-testid='searchbox-dates-container']");
    await expect(datePicker).toBeVisible();

    await datePicker.click();

    // Calling the function.

    await selectDatePicker(false, "24", "August", "2026", "29", "August", "2026", page);

    //Validation after selecting the dates.
    const selectedInDate: Locator = page.locator("span[data-testid='date-display-field-start']");
    const selectedOutDate: Locator = page.locator("span[data-testid='date-display-field-end']");

    const afterSelectInDate: string = await selectedInDate.innerText();
    console.log("Checked-In Week-day and date is:", afterSelectInDate);

    const afterSelectOutDate: string = await selectedOutDate.innerText();
    console.log("Checked-Out week-day and date is:", afterSelectOutDate);

    await expect(selectedInDate).toContainText(afterSelectInDate);
    await expect(selectedOutDate).toContainText(afterSelectOutDate);

    await page.waitForTimeout(5000);

});