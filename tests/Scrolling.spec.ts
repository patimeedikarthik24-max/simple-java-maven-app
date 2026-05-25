import {test, expect, Locator} from "@playwright/test"

test("Handling Scrolling action", async ({page}) =>
{
    test.slow();  // Sets timeout for single test. Easy way to triple the default timeout i.e.30sec(30000 ms)
    await page.goto("https://infinite-scroll.com/demo/full-page/");
    await page.waitForTimeout(2000);

    let previousHeight: number = 0;

    while(true)
    {   
        // Scrolls into the page.

        await page.evaluate(() =>
        {
            window.scrollTo(0, document.body.scrollHeight);
        });

// Waits for the page to load to continue the scroll.
        await page.waitForTimeout(2000);

        const currentHeight = await page.evaluate(() =>
        {
            return document.body.scrollHeight;
        });

        console.log("Previous height of page is:", previousHeight);
        console.log("Current height of page is:", currentHeight);
        
        if(currentHeight === previousHeight)
        {
            break;
        }
        previousHeight = currentHeight;

    }

    console.log("Reached the end of the page...");

    const headings: Locator = page.locator("div.article-feed h2");
    console.log("The heading of articles is:", await headings.allInnerTexts());
    console.log("Number of titles this article have:", await  headings.count());

    const validateText: Locator = page.locator(".infinite-scroll-last");
    await expect(validateText).toHaveText("End of content");
    await expect(headings).toHaveCount(15);

});