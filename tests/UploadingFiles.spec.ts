import {test, expect, Locator} from "@playwright/test"

test("Uploading the Files", async ({page}) =>
{
    await page.goto("https://testautomationpractice.blogspot.com/#");
    await page.waitForTimeout(2000);

    const singleUpload: Locator = page.locator("#singleFileInput");

    await singleUpload.setInputFiles("Upload_Files/Text_1.txt");
    await page.getByRole("button", {name: 'Upload Single File'}).click();

    const validateSingleFileStatus: string = await page.locator("#singleFileStatus").innerText();
    expect(validateSingleFileStatus).toContain("Text_1.txt");
    console.log("The Single File is uploaded Successfully...\n And Details are :", validateSingleFileStatus);

    await page.waitForTimeout(2000);

    const multiUpload: Locator = page.locator("#multipleFilesInput");

    await multiUpload.setInputFiles(["Upload_Files/Test_PDF_1.pdf","Upload_Files/Test_PDF_2.pdf"]);
    await page.getByRole("button", {name: 'Upload Multiple Files'}).click();

    const validateMultiFileStatus: string = await page.locator("#multipleFilesStatus").innerText();
    expect(validateMultiFileStatus).toContain("Test_PDF_1.pdf");
    expect(validateMultiFileStatus).toContain("Test_PDF_2.pdf");
    console.log("The Multiple Files are uploaded Successfully...\n And Details are :", validateMultiFileStatus);

    await page.waitForTimeout(5000);

});