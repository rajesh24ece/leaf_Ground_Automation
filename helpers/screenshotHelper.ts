import { Page, TestInfo } from "@playwright/test";
import * as fs from "fs";
import { logger } from "../utils/logger";

export class ScreenshotHelper {
  static async captureAndAttach(page: Page, testInfo: TestInfo, name: string): Promise<void> {
    fs.mkdirSync("screenshots", { recursive: true });

    // Wait 1 second before taking the screenshot
    await page.waitForTimeout(1000);

    const screenshotPath = `screenshots/${name}-${Date.now()}.png`;

    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    await testInfo.attach(name, {
      path: screenshotPath,
      contentType: "image/png",
    });

    logger.info(`📸 Screenshot attached: ${screenshotPath}`);
  }
}
