import {test, expect, Locator} from "@playwright/test"

test("Verify and Read Dynamic Table", async ({page}) =>
{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table: Locator = page.locator("table#taskTable tbody");
    await  expect(table).toBeVisible();

// Get all rows in a table and select a row with Chrome value.

    const rows: Locator[] = await table.locator("tr").all();
    expect(rows).toHaveLength(4);

// Verifying CPU Load of Chrome process.

    for(let rowData of rows)
    {
        const Name: string = await rowData.locator("td").nth(0).innerText();
        console.log(Name);

        if(Name === "Chrome")
        {
            // 1. CSS type condition to applu with the Locator. - selector:has-text('')
            // const cpuLoad = await rowData.locator("td:has-text('%')").innerText(); 

            // 2. Playwright type condition to apply with the Locator. - selector, {hasText:''}
            const cpuLoad = await rowData.locator("td", {hasText:'%'}).innerText();
            console.log("The Cpu percentile of Chrome is:", cpuLoad);

            const expectedChromecpu: string = await page.locator("strong.chrome-cpu").innerText();
            expect(expectedChromecpu).toEqual(cpuLoad);
            break;
        } 
    }

// Verifying Memory Size of Firefox process.

     for(let rowData of rows)
    {
        const Name: string = await rowData.locator("td").nth(0).innerText();
        console.log(Name);

        if(Name === "Firefox")
        {
            const memorySize = await rowData.locator("td", {hasText:/MB$/}).innerText();
            console.log("The Memory Size of Firefox is:", memorySize);

            const expectedFirefoxMemory: string = await page.locator("strong.firefox-memory").innerText();
            expect(expectedFirefoxMemory).toEqual(memorySize);
            break;
        } 
    }

// Verifying Network Speed of Chrome process.

     for(let rowData of rows)
    {
        const Name: string = await rowData.locator("td").nth(0).innerText();
        console.log(Name);

        if(Name === "Chrome")
        {
            const networkSpeed = await rowData.locator("td:has-text('Mbps')").innerText();
            console.log("The Network Speed of Chrome is:", networkSpeed);

            const expectedChromeNetwork: string = await page.locator("strong.chrome-network").innerText();
            expect(expectedChromeNetwork).toEqual(networkSpeed);
            break;
        } 
    }

// Verifying Disk Space of Firefox process.

    for(let rowData of rows)
    {
        const Name: String = await rowData.locator("td").nth(0).innerText();
        console.log(Name);

        if(Name === "Firefox")
        {
            const diskSpace = await rowData.locator("td:has-text('MB/s')").innerText();
            console.log("The Disk Space of Firefox process is:", diskSpace);

            const expectedFirefoxDisk = await page.locator("strong.firefox-disk").innerText();
            expect(expectedFirefoxDisk).toBe(diskSpace);
            break;
        }
    }

    await page.waitForTimeout(3000);

});