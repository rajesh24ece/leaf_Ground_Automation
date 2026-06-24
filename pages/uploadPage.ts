import { Page, test, expect } from "@playwright/test";
import { Methods } from "../utils/methods";
import { UploadTestData } from "../utils/test-data.interface";
import { UploadLocators } from "../locators/uploadLocators";
import path from "path";
import fs from "fs";

export class UploadPage extends Methods {
  #page: Page;

  constructor(page: Page) {
    super();
    this.#page = page;
  }

  async handlingUpload() {
    let testData!: UploadTestData;

    await test.step("Read test data from json file.", async () => {
      testData = await Methods.accessJsonData(UploadLocators.uploadJson);
    });

    await test.step("Successfully landed in the upload and download page.", async () => {
      await this.landingPage();
    });

    await this.fileUploadOne();
    await this.fileUploadTwo();
    await this.fileDownload(testData);
  }

  async landingPage(): Promise<void> {
    await this.#page.goto(UploadLocators.pageUrl);
    await this.#page.waitForLoadState();
  }

  async fileUploadOne(): Promise<void> {
    const filepath = path.resolve(__dirname, UploadLocators.uploadOne);
    await this.#page.setInputFiles(UploadLocators.uploadOneLocator, filepath);
  }

  async fileUploadTwo(): Promise<void> {
    const filepath = path.resolve(__dirname, UploadLocators.uploadTwo);
    await this.#page.setInputFiles(UploadLocators.uploadTwoLocator, filepath);
    await this.#page.getByRole("button", { name: " Upload" }).click();
  }

  async fileDownload(testData: UploadTestData): Promise<void> {
    const downloadPromise = this.#page.waitForEvent("download");
    await this.#page.getByRole("button", { name: "Download" }).click();
    const download = await downloadPromise;
    console.log(download.suggestedFilename());
    expect(download.suggestedFilename()).toBe(testData.fileName);
    const savePath = path.join("downloads", testData.fileName);
    await download.saveAs(savePath);
    expect(fs.existsSync(savePath)).toBeTruthy();
  }
}
