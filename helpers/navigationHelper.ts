import { logger } from "../utils/logger";
import { Page } from "@playwright/test";
import { ErrorUtils } from "../utils/errorUtils";

export class NavigationHelper {
  static async navigateToPage(page: Page, url: string): Promise<void> {
    try {
      await page.goto(url);
      await page.waitForLoadState("networkidle");
      logger.info(`✅ Navigated to: ${page.url()}`);
    } catch (error: unknown) {
      ErrorUtils.handleError(`❌ Failed to navigate to "${page.url()}"`, error);
    }
  }

  static async navigateBack(page: Page): Promise<void> {
    try {
      await page.goBack();
      await page.waitForLoadState("networkidle");
      logger.info(`✅ Navigated back to the previous page "${page.url()}"`);
    } catch (error: unknown) {
      ErrorUtils.handleError(`❌ Failed to navigate back "${page.url()}"`, error);
    }
  }

  static async navigateForward(page: Page): Promise<void> {
    try {
      await page.goForward();
      await page.waitForLoadState("networkidle");
      logger.info(`✅ Navigated forward to the next page "${page.url()}"`);
    } catch (error: unknown) {
      ErrorUtils.handleError(`❌ Failed to navigate forward "${page.url()}"`, error);
    }
  }

  static async refreshPage(page: Page): Promise<void> {
    try {
      await page.reload();
      await page.waitForLoadState("networkidle");
      logger.info(`✅ Page refreshed successfully and landed in "${page.url()}"`);
    } catch (error: unknown) {
      ErrorUtils.handleError(`❌ Failed to refresh the page "${page.url()}"`, error);
    }
  }
}
