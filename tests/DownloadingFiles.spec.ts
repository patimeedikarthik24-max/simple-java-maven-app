import {test, expect, Locator} from "@playwright/test"
import fs from "fs"

test("Downloading the Files", async ({page}) =>
{
    await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
    await page.waitForTimeout(2000);

    await page.locator("#inputText").fill("Welcome!");
    await page.locator("#generateTxt").click();

    const [download] = await Promise.all([page.waitForEvent("download"), page.locator("#txtDownloadLink").click()])

    const downloadPath = "Downloads/TestFile_1.txt";
    await download.saveAs(downloadPath);

    const fileExists = fs.existsSync(downloadPath);
    expect(fileExists).toBeTruthy();

    if(fileExists)
    {
        fs.unlinkSync(downloadPath);
    }

    await page.waitForTimeout(5000);

});