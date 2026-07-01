import { Page, test, expect } from "@playwright/test";
import { NavigationHelper } from "../helpers/NavigationHelper";
import { ClickHelper } from "../helpers/ClickHelper";
import { UploadTestData } from "../utils/Test-data.interface";
import { UploadLocators } from "../locators/UploadLocators";
import path from "path";
import fs from "fs";
import { logger } from "../utils/Logger";
import { Roles } from "../utils/Constants";
import { AssertionHelper } from "../helpers/AssertionHelper";

export class UploadPage {
  #page: Page;

  constructor(page: Page) {
    this.#page = page;
  }

  async landingPage(): Promise<void> {
    await NavigationHelper.navigateToPage(this.#page, UploadLocators.pageUrl);
  }

  async fileUploadOne(): Promise<void> {
    const filepath = path.resolve(__dirname, UploadLocators.uploadOne);
    await this.#page.setInputFiles(UploadLocators.uploadOneLocator, filepath);
  }

  async fileUploadTwo(): Promise<void> {
    const filepath = path.resolve(__dirname, UploadLocators.uploadTwo);
    await this.#page.setInputFiles(UploadLocators.uploadTwoLocator, filepath);
    await ClickHelper.clickByRole(this.#page, Roles.BUTTON, UploadLocators.uploadButton);
  }

  async fileDownload(testData: UploadTestData): Promise<void> {
    const downloadPromise = this.#page.waitForEvent("download");
    await ClickHelper.clickByRole(this.#page, Roles.BUTTON, UploadLocators.downloadButton);
    const download = await downloadPromise;
    logger.info(download.suggestedFilename());
    await AssertionHelper.assertToBe(download.suggestedFilename(), testData.fileName);
    const savePath = path.join("downloads", testData.fileName);
    await download.saveAs(savePath);
    await AssertionHelper.assertToBeTruthy(fs.existsSync(savePath));
  }
}
