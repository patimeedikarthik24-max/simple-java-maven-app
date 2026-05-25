import {test, expect, Locator, FrameLocator} from "@playwright/test"

test("Handling Frames", async ({page}) =>
{
    await page.goto("https://ui.vision/demo/webtest/frames/");
    await page.waitForTimeout(1000);

    const frames = page.frames();
    console.log("Number of frames are:", frames.length);

// Approach 1 to enter frame using page.frame({url:" "})

    // const frame1 = page.frame({url: "https://ui.vision/demo/webtest/frames/frame_1.html"}); 

// Approach 2 to enter frame using page.frameLocator(any selector or css)

    const frame1 = page.frameLocator("[src='frame_1.html']");

    const validateText: Locator = frame1.getByText("Frame Test Page");
    expect(validateText).toHaveText("Frame Test Page");

    if(frame1)
    {
        await frame1.locator("[name='mytext1']").fill("Karthik");   // Approach 1 in giving the input.

        // await frame1.fill("[name='mytext1']", "Karthik");        // Aprroach 2 in giving the input.
    }
    else
    {
        console.log("Frame1 does not exist.");
    }
    
    await page.waitForTimeout(5000);

});