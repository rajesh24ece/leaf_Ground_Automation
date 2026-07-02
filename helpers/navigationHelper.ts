import { logger } from "../utils/Logger";
import { Page } from "@playwright/test";
import { ErrorUtils } from "../utils/ErrorUtils";

export class NavigationHelper {
  static async navigateToPage(page: Page, url: string): Promise<void> {
    try {
      await page.goto(url);
      await page.waitForLoadState("networkidle");
      logger.info(`Navigated to ${url}`);
    } catch (error: unknown) {
      ErrorUtils.handleError(`Failed to navigate to ${url}`, error);
    }
  }

  static async navigateBack(page: Page): Promise<void> {
    try {
      await page.goBack();
      await page.waitForLoadState("networkidle");
      logger.info(`Navigated back to the previous page`);
    } catch (error: unknown) {
      ErrorUtils.handleError(`Failed to navigate back`, error);
    }
  }

  static async navigateForward(page: Page): Promise<void> {
    try {
      await page.goForward();
      await page.waitForLoadState("networkidle");
      logger.info(`Navigated forward to the next page`);
    } catch (error: unknown) {
      ErrorUtils.handleError(`Failed to navigate forward`, error);
    }
  }

  static async refreshPage(page: Page): Promise<void> {
    try {
      await page.reload();
      await page.waitForLoadState("networkidle");
      logger.info(`Page refreshed successfully`);
    } catch (error: unknown) {
      ErrorUtils.handleError(`Failed to refresh the page`, error);
    }
  }
}
