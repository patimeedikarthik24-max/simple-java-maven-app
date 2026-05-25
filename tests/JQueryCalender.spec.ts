import {test, expect, Locator} from "@playwright/test"

test(" Handling JQuery Calender dates", async({page}) =>
{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.waitForTimeout(2000);

    const dateInput: Locator = page.locator("#datepicker");
    expect(dateInput).toBeVisible();

    // dateInput.fill("05/06/2026");   //Here we can use directly fill method if the element have Input tag.

    let targetYear: string = "2000";
    let targetMonth: string = "August";
    let targetDate: string = "24";

    await dateInput.click();

    while(true)
    {
        const currentMonth: string = await page.locator(".ui-datepicker-month").innerText();
        const currentYear: string = await page.locator(".ui-datepicker-year").innerText();

        if(targetMonth === currentMonth && targetYear === currentYear)
        {
            break;
        }
        else
        {
            if(parseInt(targetYear) > parseInt(currentYear))
            {
                const nextButton: Locator = page.locator(".ui-datepicker-next");    //For selecting future dates clicking next button in calender.
                await nextButton.click();
            }
            else
            {
                const prevButton: Locator = page.locator(".ui-datepicker-prev");    //For selecting past dates clicking previous button in calender.
                await prevButton.click();
            }
        }

    }

    const allDate: Locator[] = await page.locator(".ui-datepicker-calendar td").all();
    for(let date of allDate)
    {
        const currentDate: string = await date.innerText();
        if(currentDate === targetDate)
        {
            await date.click();
            break;
        }
    }

    const expectedDateText: string = "08/24/2000";
    await expect(dateInput).toHaveValue(expectedDateText);

    await page.waitForTimeout(3000);

});