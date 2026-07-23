import { Page, TestInfo } from "@playwright/test";
import * as fs from "fs";
import { logger } from "../utils/logger";

export class ScreenshotHelper {
  static async captureAndAttach(page: Page, testInfo: TestInfo, name: string): Promise<void> {
    fs.mkdirSync("screenshots", { recursive: true });

    // Wait for in-flight CSS/JS animations and transitions to finish so the
    // screenshot captures a settled UI state, instead of guessing a fixed delay.
    await page
      .waitForFunction(() => document.getAnimations().every((a) => a.playState === "finished"), { timeout: 3000 })
      .catch(() => {
        // Something is still animating after 3s (e.g. a looping spinner) —
        // don't block the screenshot indefinitely, just proceed and capture
        // whatever the current state is.
        logger.warn("⚠️ Animations still in progress after 3s wait; capturing screenshot anyway");
      });

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
