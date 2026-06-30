import { logger } from "./Logger";
import { Page } from "@playwright/test";
import * as fs from "fs";

export class ScreenshotHelper {
  public static async captureAndLog(page: Page, name: string): Promise<void> {
    try {
      if (!fs.existsSync("screenshots")) {
        fs.mkdirSync("screenshots", { recursive: true });
      }
      const screenshotPath = `screenshots/${name}-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      logger.info(`📸 Screenshot captured: ${screenshotPath}`);
    } catch (error) {
      logger.error(`❌ Screenshot failed for "${name}": ${error}`); // ✅ don't let screenshot failure break test
    }
  }
}
