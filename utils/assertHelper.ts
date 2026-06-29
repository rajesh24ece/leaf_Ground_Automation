import { Page, expect } from "@playwright/test";
import { logger } from "./logger";

export class AssertHelper {
  static async assertVisible(page: Page, locator: string): Promise<void> {
    const element = page.locator(locator); // ✅ generic name
    await expect(element).toBeVisible();
    logger.info(`Asserted element "${locator}" is visible.`);
  }

  static async assertText(
    page: Page,
    locator: string,
    expectedText: string, // ✅ renamed from actualText
  ): Promise<void> {
    const element = page.locator(locator); // ✅ renamed from alertText
    await expect(element).toHaveText(expectedText);
    logger.info(`Asserted element "${locator}" has text "${expectedText}".`);
  }

  static async assertVisibleWithText(
    page: Page,
    locator: string,
    expectedText: string,
  ): Promise<void> {
    await AssertHelper.assertVisible(page, locator);
    await AssertHelper.assertText(page, locator, expectedText);
    logger.info(
      `Asserted element "${locator}" is visible with text "${expectedText}".`,
    );
  }
}
