import {test, expect, Locator} from "@playwright/test"

test("Verify Pagination of the table", async ({page}) =>
{
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    await page.waitForTimeout(2000);

    const table: Locator = page.locator("table#example tbody");
    await expect(table).toBeVisible();

    let hasMoreRows: boolean = true;

    while(hasMoreRows)
    {
        const rows: Locator[] = await table.locator("tr").all();
        for(let rowsData of rows)
        {
            console.log(await rowsData.innerText());
        }
// we can identify the button(next) in 3 ways using CSS selector
        // 1. button[aria-label='Next']
        // 2. button[aria-controls='example']:has-text('›')
        // 3. button[aria-controls='example']:nth-child(9)

        const nextButton: Locator = page.getByRole("link", {name: 'Next'});
        const isDisabled: string | null = await nextButton.getAttribute("class");

        if(isDisabled?.includes("disabled"))
        {
            hasMoreRows = false;
        }
        else
        {
            await nextButton.click();
        }     
    }

    await page.waitForTimeout(3000);

});

test("Vertify Entries per page Dropdown and count the rows", async ({page}) =>
{
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    await page.waitForTimeout(2000);

    const table: Locator = page.locator("table#example tbody");
    await expect(table).toBeVisible();

    const entriesPerPageDropdown: Locator = page.locator("select[aria-controls='example']");
    entriesPerPageDropdown.selectOption({value: '25'});
    await page.waitForTimeout(3000);

    const verifyrows: Locator = table.locator("tr");
    const count = await verifyrows.count();
    console.log(`The table contains ${count} rows`);
    expect(verifyrows).toHaveCount(25);

    await page.waitForTimeout(3000);

});

test.only("Vertify Search box fpr specific data", async ({page}) =>
{
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    await page.waitForTimeout(2000);

    const search: Locator = page.getByRole("searchbox", {name: 'search'});
    await search.fill("Fiona Green");

    const rows: Locator[] = await page.locator("table#example tbody tr").all();

    if(rows.length >= 1)
    {
        let matchFound: boolean = false;
        for(let row of rows)
        {
            const data: String = await row.innerText();
            if(data.includes("Fiona Green"))
            {
                console.log("FOUND - Record exists in the Table.");
                matchFound = true;
                break;
            }
        }
        expect(matchFound).toBeTruthy();
    }
    else
    {
        console.log("NOT FOUND - Records does not exist on following search.");
    }

    await page.waitForTimeout(3000);

});


