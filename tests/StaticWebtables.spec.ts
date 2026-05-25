import {test, expect, Locator} from "@playwright/test"

test("Handling Static Web tables", async ({page}) =>
{
    await page.goto("https://testautomationpractice.blogspot.com/");
    
    const table: Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

// 1. Count and return the number of Rows present in the table.

    const rows: Locator = table.locator("tr");
    await expect(rows).toHaveCount(7);          // Approach 1 in assertion

    const rowcount: number = await rows.count();
    console.log(`The Booktable have ${rowcount} rows.`);
    expect(rowcount).toBe(7);                  // Approach 2 in assertion

// 2. Count and return the number of Columns/Headers present in the table.

    const columns: Locator = rows.locator("th");
    await expect(columns).toHaveCount(4);

    const colcount: number = await columns.count();
    console.log(`The Booktable have ${colcount} columns/headers.`);
    expect(colcount).toBe(4);

// 3. Read and return all the data from a single row in the table.

    const data: Locator = rows.nth(4).locator("td");
    const rowdata: string[] = await data.allInnerTexts();
    console.log("The data from 5th row in the table is:", rowdata);
    await expect(data).toHaveText([ 'Master In Selenium', 'Mukesh', 'Selenium', '3000' ]);

    for(let text of rowdata)
    {
        console.log(text);
    }

// 4. Read and return all data from every row in the table.

    const allData: Locator[] = await rows.all();

    console.log("Printing only Header data.");

    for(let headertext of allData)       // Printing only Header data.
    {
        const header: string[] = await headertext.locator("th").allInnerTexts();
        if(header != null)
        {
            console.log(header);
            break;
        }
    }

    console.log("Printing every data in the table Excluding Header row.");

    for(let rowtext of allData.slice(1))           // Printing every data in the table Excluding Header row.
    {
        const tableData: string[] = await rowtext.locator("td").allInnerTexts();
        console.log(tableData);
        // console.log(tableData.join("\t"));
    }

// 5. Print all books published by Amit.

    const AmitBooks: string[] = [];

    for(let row of allData.slice(1))
    {
        const rowvalues: string[] = await row.locator("td").allInnerTexts();
        const author = rowvalues[1];
        const books = rowvalues[0];
        
        if(author === "Amit")
        {
            console.log(`${author} : \t ${books}`);
            AmitBooks.push(books);
        }
    }
    expect(AmitBooks).toHaveLength(2);

// 6. Calculate the total price of books and print it.

    let TotalPrice = 0;
    for(let row of allData.slice(1))
    {
        const rowvalues: string[] = await row.locator("td").allInnerTexts();
        const price = rowvalues[3];
        TotalPrice = TotalPrice + parseInt(price);
    }
    console.log("The total price of books in the table is:", TotalPrice);

    expect(TotalPrice).toBe(7100);

    await page.waitForTimeout(3000);
});