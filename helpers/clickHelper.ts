import { Locator, Page } from "@playwright/test";
import { ErrorUtils } from "../utils/errorUtils";

type AriaRole = Parameters<Page["getByRole"]>[0];

export class ClickHelper {
  static async click(locator: Locator): Promise<void> {
    try {
      await locator.click();
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click the element "${locator}".`, error);
    }
  }

  /**
   *
   * @param locator
   */

  static async doubleClick(locator: Locator): Promise<void> {
    try {
      await locator.dblclick();
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to double-click the element "${locator}".`, error);
    }
  }

  /**
   *
   * @param locator
   */

  static async rightClick(locator: Locator): Promise<void> {
    try {
      await locator.click({ button: "right" });
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to right-click the element "${locator}".`, error);
    }
  }

  /**
   *
   * @param locator
   */

  static async middleClick(locator: Locator): Promise<void> {
    try {
      await locator.click({ button: "middle" });
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to middle-click the element "${locator}".`, error);
    }
  }

  /**
   *
   * @param locator
   */

  static async forceClick(locator: Locator): Promise<void> {
    try {
      await locator.click({ force: true });
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to force-click the element "${locator}".`, error);
    }
  }

  /**
   *
   * @param locator
   */

  static async clickFirst(locator: Locator): Promise<void> {
    try {
      await locator.first().click();
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click the first matching element "${locator}".`, error);
    }
  }

  /**
   *
   * @param locator
   */

  static async clickLast(locator: Locator): Promise<void> {
    try {
      await locator.last().click();
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click the last matching element "${locator}".`, error);
    }
  }

  /**
   *
   * @param locator
   * @param index
   */

  static async clickNth(locator: Locator, index: number): Promise<void> {
    try {
      await locator.nth(index).click();
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click the specified element "${locator}".`, error);
    }
  }

  /**
   *
   * @param locator
   * @param text
   */

  static async clickByText(locator: Locator, text: string): Promise<void> {
    try {
      await locator.filter({ hasText: text }).click();
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click "${text}".`, error);
    }
  }

  /**
   *
   * @param locator
   */

  static async clickAll(locator: Locator): Promise<void> {
    try {
      const count = await locator.count();
      for (let i = 0; i < count; i++) {
        await locator.nth(i).click();
      }
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click all matching elements "${locator}".`, error);
    }
  }

  /**
   *
   * @param locator
   */

  static async clickIfVisible(locator: Locator): Promise<void> {
    try {
      if (await locator.isVisible()) {
        await locator.click();
      }
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed while clicking the visible element "${locator}".`, error);
    }
  }

  /**
   *
   * @param locator
   */

  static async clickIfEnabled(locator: Locator): Promise<void> {
    try {
      if (await locator.isEnabled()) {
        await locator.click();
      }
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed while clicking the enabled element "${locator}".`, error);
    }
  }

  /**
   *
   * @param locator
   * @param clickCount
   */

  static async clickMultiple(locator: Locator, clickCount: number): Promise<void> {
    try {
      await locator.click({ clickCount });
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click the element multiple times "${locator}".`, error);
    }
  }

  /**
   *
   * @param locator
   * @param delay
   */

  static async clickWithDelay(locator: Locator, delay: number): Promise<void> {
    try {
      await locator.click({ delay });
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click the element with delay "${locator}".`, error);
    }
  }

  /**
   *
   * @param locator
   * @param x
   * @param y
   */

  static async clickAtPosition(locator: Locator, x: number, y: number): Promise<void> {
    try {
      await locator.click({
        position: { x, y },
      });
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click the element at the specified position "${locator}".`, error);
    }
  }

  /**
   *
   * @param locator
   * @param modifier
   */

  static async clickWithModifier(locator: Locator, modifier: "Alt" | "Control" | "Meta" | "Shift"): Promise<void> {
    try {
      await locator.click({
        modifiers: [modifier],
      });
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click the element with keyboard modifier "${locator}".`, error);
    }
  }

  /**
   *
   * @param page
   * @param role
   * @param name
   */

  static async clickByRole(page: Page, role: AriaRole, name: string): Promise<void> {
    try {
      await page.getByRole(role, { name }).first().click();
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click the element "${name}" by role.`, error);
    }
  }

  /**
   *
   * @param page
   * @param role
   * @param name
   */

  static async clickAllByRole(page: Page, role: AriaRole, name: string): Promise<void> {
    try {
      const elements = page.getByRole(role, { name });
      const count = await elements.count();
      for (let i = 0; i < count; i++) {
        await elements.nth(i).click();
      }
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click all matching role elements "${name}".`, error);
    }
  }

  /**
   *
   * @param page
   * @param locator
   */

  static async clickAndWaitForNavigation(page: Page, locator: Locator): Promise<void> {
    try {
      await Promise.all([page.waitForNavigation(), locator.click()]);
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed during click and navigation "${locator}" .`, error);
    }
  }

  /**
   *
   * @param page
   * @param locator
   * @returns
   */

  static async clickAndWaitForNewPage(page: Page, locator: Locator): Promise<Page> {
    try {
      const [newPage] = await Promise.all([page.context().waitForEvent("page"), locator.click()]);
      await newPage.waitForLoadState();
      return newPage;
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to open the new page "${locator}" .`, error);
    }
  }

  /**
   *
   * @param page
   * @param locator
   * @param url
   */

  static async clickAndWaitForResponse(page: Page, locator: Locator, url: string | RegExp): Promise<void> {
    try {
      await Promise.all([page.waitForResponse(url), locator.click()]);
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed while waiting for the expected response "${locator}".`, error);
    }
  }

  /**
   *
   * @param page
   * @param locator
   */

  static async clickDynamicLocator(page: Page, locator: string): Promise<void> {
    try {
      await page.locator(locator).click();
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click locator: ${locator}`, error);
    }
  }
}
