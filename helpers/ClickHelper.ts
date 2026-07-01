import { Locator, Page } from "@playwright/test";
import { logger } from "../utils/Logger";
import { ErrorUtils } from "../utils/ErrorUtils";

type AriaRole = Parameters<Page["getByRole"]>[0];

export class ClickHelper {
  static async click(locator: Locator): Promise<void> {
    try {
      await locator.click();
      logger.info("Successfully clicked the element.");
    } catch (error) {
      ErrorUtils.handleError("Failed to click the element.", error);
    }
  }

  static async doubleClick(locator: Locator): Promise<void> {
    try {
      await locator.dblclick();
      logger.info("Successfully double-clicked the element.");
    } catch (error) {
      ErrorUtils.handleError("Failed to double-click the element.", error);
    }
  }

  static async rightClick(locator: Locator): Promise<void> {
    try {
      await locator.click({ button: "right" });
      logger.info("Successfully right-clicked the element.");
    } catch (error) {
      ErrorUtils.handleError("Failed to right-click the element.", error);
    }
  }

  static async middleClick(locator: Locator): Promise<void> {
    try {
      await locator.click({ button: "middle" });
      logger.info("Successfully middle-clicked the element.");
    } catch (error) {
      ErrorUtils.handleError("Failed to middle-click the element.", error);
    }
  }

  static async forceClick(locator: Locator): Promise<void> {
    try {
      await locator.click({ force: true });
      logger.info("Successfully force-clicked the element.");
    } catch (error) {
      ErrorUtils.handleError("Failed to force-click the element.", error);
    }
  }

  static async clickFirst(locator: Locator): Promise<void> {
    try {
      await locator.first().click();
      logger.info("Successfully clicked the first matching element.");
    } catch (error) {
      ErrorUtils.handleError("Failed to click the first matching element.", error);
    }
  }

  static async clickLast(locator: Locator): Promise<void> {
    try {
      await locator.last().click();
      logger.info("Successfully clicked the last matching element.");
    } catch (error) {
      ErrorUtils.handleError("Failed to click the last matching element.", error);
    }
  }

  static async clickNth(locator: Locator, index: number): Promise<void> {
    try {
      await locator.nth(index).click();
      logger.info("Successfully clicked the specified element.");
    } catch (error) {
      ErrorUtils.handleError("Failed to click the specified element.", error);
    }
  }

  static async clickByText(locator: Locator, text: string): Promise<void> {
    try {
      await locator.filter({ hasText: text }).click();
      logger.info(`Successfully clicked '${text}'.`);
    } catch (error) {
      ErrorUtils.handleError(`Failed to click '${text}'.`, error);
    }
  }

  static async clickAll(locator: Locator): Promise<void> {
    try {
      const count = await locator.count();

      for (let i = 0; i < count; i++) {
        await locator.nth(i).click();
      }

      logger.info("Successfully clicked all matching elements.");
    } catch (error) {
      ErrorUtils.handleError("Failed to click all matching elements.", error);
    }
  }

  static async clickIfVisible(locator: Locator): Promise<void> {
    try {
      if (await locator.isVisible()) {
        await locator.click();
        logger.info("Successfully clicked the visible element.");
      } else {
        logger.info("Element is not visible. Click skipped.");
      }
    } catch (error) {
      ErrorUtils.handleError("Failed while clicking the visible element.", error);
    }
  }

  static async clickIfEnabled(locator: Locator): Promise<void> {
    try {
      if (await locator.isEnabled()) {
        await locator.click();
        logger.info("Successfully clicked the enabled element.");
      } else {
        logger.info("Element is disabled. Click skipped.");
      }
    } catch (error) {
      ErrorUtils.handleError("Failed while clicking the enabled element.", error);
    }
  }

  static async clickMultiple(locator: Locator, clickCount: number): Promise<void> {
    try {
      await locator.click({ clickCount });
      logger.info("Successfully clicked the element multiple times.");
    } catch (error) {
      ErrorUtils.handleError("Failed to click the element multiple times.", error);
    }
  }

  static async clickWithDelay(locator: Locator, delay: number): Promise<void> {
    try {
      await locator.click({ delay });
      logger.info("Successfully clicked the element with delay.");
    } catch (error) {
      ErrorUtils.handleError("Failed to click the element with delay.", error);
    }
  }

  static async clickAtPosition(locator: Locator, x: number, y: number): Promise<void> {
    try {
      await locator.click({
        position: { x, y },
      });

      logger.info("Successfully clicked the element at the specified position.");
    } catch (error) {
      ErrorUtils.handleError("Failed to click the element at the specified position.", error);
    }
  }

  static async clickWithModifier(locator: Locator, modifier: "Alt" | "Control" | "Meta" | "Shift"): Promise<void> {
    try {
      await locator.click({
        modifiers: [modifier],
      });

      logger.info("Successfully clicked the element with keyboard modifier.");
    } catch (error) {
      ErrorUtils.handleError("Failed to click the element with keyboard modifier.", error);
    }
  }

  static async clickByRole(page: Page, role: AriaRole, name: string): Promise<void> {
    try {
      await page.getByRole(role, { name }).first().click();
      logger.info("Successfully clicked the element by role.");
    } catch (error) {
      ErrorUtils.handleError("Failed to click the element by role.", error);
    }
  }

  static async clickAllByRole(page: Page, role: AriaRole, name: string): Promise<void> {
    try {
      const elements = page.getByRole(role, { name });
      const count = await elements.count();
      for (let i = 0; i < count; i++) {
        await elements.nth(i).click();
      }
      logger.info("Successfully clicked all matching role elements.");
    } catch (error) {
      ErrorUtils.handleError("Failed to click all matching role elements.", error);
    }
  }

  static async clickAndWaitForNavigation(page: Page, locator: Locator): Promise<void> {
    try {
      await Promise.all([page.waitForNavigation(), locator.click()]);

      logger.info("Successfully clicked the element and waited for navigation.");
    } catch (error) {
      ErrorUtils.handleError("Failed during click and navigation.", error);
    }
  }

  static async clickAndWaitForNewPage(page: Page, locator: Locator): Promise<Page> {
    try {
      const [newPage] = await Promise.all([page.context().waitForEvent("page"), locator.click()]);

      await newPage.waitForLoadState();

      logger.info("Successfully clicked the element and captured the new page.");

      return newPage;
    } catch (error) {
      ErrorUtils.handleError("Failed to open the new page.", error);
    }
  }

  static async clickAndWaitForResponse(page: Page, locator: Locator, url: string | RegExp): Promise<void> {
    try {
      await Promise.all([page.waitForResponse(url), locator.click()]);

      logger.info("Successfully clicked the element and received the expected response.");
    } catch (error) {
      ErrorUtils.handleError("Failed while waiting for the expected response.", error);
    }
  }
}
