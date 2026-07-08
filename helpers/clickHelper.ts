import { Locator, Page } from "@playwright/test";
import { ErrorUtils } from "../utils/errorUtils";

type AriaRole = Parameters<Page["getByRole"]>[0];

export class ClickHelper {
  /** Clicks the given element. */
  static async click(locator: Locator): Promise<void> {
    try {
      await locator.click();
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click the element "${locator}".`, error);
    }
  }

  /** Double-clicks the given element. */
  static async doubleClick(locator: Locator): Promise<void> {
    try {
      await locator.dblclick();
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to double-click the element "${locator}".`, error);
    }
  }

  /** Right-clicks the given element (opens context menu). */
  static async rightClick(locator: Locator): Promise<void> {
    try {
      await locator.click({ button: "right" });
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to right-click the element "${locator}".`, error);
    }
  }

  /** Clicks the given element using the middle mouse button. */
  static async middleClick(locator: Locator): Promise<void> {
    try {
      await locator.click({ button: "middle" });
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to middle-click the element "${locator}".`, error);
    }
  }

  /** Clicks the element bypassing actionability checks (visibility, enabled state, etc.). */
  static async forceClick(locator: Locator): Promise<void> {
    try {
      await locator.click({ force: true });
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to force-click the element "${locator}".`, error);
    }
  }

  /** Clicks the first element matching the locator, when the locator resolves to multiple elements. */
  static async clickFirst(locator: Locator): Promise<void> {
    try {
      await locator.first().click();
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click the first matching element "${locator}".`, error);
    }
  }

  /** Clicks the last element matching the locator, when the locator resolves to multiple elements. */
  static async clickLast(locator: Locator): Promise<void> {
    try {
      await locator.last().click();
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click the last matching element "${locator}".`, error);
    }
  }

  /**
   * Clicks the element at the given zero-based index among matches.
   * @param locator - locator that resolves to multiple elements
   * @param index - zero-based index of the element to click
   */
  static async clickNth(locator: Locator, index: number): Promise<void> {
    try {
      await locator.nth(index).click();
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click the specified element "${locator}".`, error);
    }
  }

  /**
   * Filters the locator by visible text and clicks the first match.
   * @param locator - locator that resolves to multiple elements
   * @param text - text used to filter the matching element
   */
  static async clickByText(locator: Locator, text: string): Promise<void> {
    try {
      await locator.filter({ hasText: text }).click();
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click "${text}".`, error);
    }
  }

  /** Clicks every element matching the locator, one after another. */
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

  /** Clicks the element only if it is currently visible; no-ops otherwise. */
  static async clickIfVisible(locator: Locator): Promise<void> {
    try {
      if (await locator.isVisible()) {
        await locator.click();
      }
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed while clicking the visible element "${locator}".`, error);
    }
  }

  /** Clicks the element only if it is currently enabled; no-ops otherwise. */
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
   * Clicks the element the specified number of times in quick succession.
   * @param locator - element to click
   * @param clickCount - number of clicks to perform
   */
  static async clickMultiple(locator: Locator, clickCount: number): Promise<void> {
    try {
      await locator.click({ clickCount });
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click the element multiple times "${locator}".`, error);
    }
  }

  /**
   * Clicks the element after holding the mouse down for the given delay.
   * @param locator - element to click
   * @param delay - delay in milliseconds between mousedown and mouseup
   */
  static async clickWithDelay(locator: Locator, delay: number): Promise<void> {
    try {
      await locator.click({ delay });
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click the element with delay "${locator}".`, error);
    }
  }

  /**
   * Clicks the element at a specific pixel offset within its bounding box.
   * @param locator - element to click
   * @param x - horizontal offset from the element's top-left corner
   * @param y - vertical offset from the element's top-left corner
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
   * Clicks the element while holding down a keyboard modifier.
   * @param locator - element to click
   * @param modifier - keyboard modifier to hold during the click
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
   * Finds an element by ARIA role and accessible name, then clicks the first match.
   * @param page - page to search within
   * @param role - ARIA role to locate (e.g. "button", "link")
   * @param name - accessible name of the target element
   */
  static async clickByRole(page: Page, role: AriaRole, name: string): Promise<void> {
    try {
      await page.getByRole(role, { name }).first().click();
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click the element "${name}" by role.`, error);
    }
  }

  /**
   * Finds all elements by ARIA role and accessible name, then clicks each one in turn.
   * @param page - page to search within
   * @param role - ARIA role to locate (e.g. "checkbox", "menuitem")
   * @param name - accessible name of the target elements
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
   * Clicks the element and waits for the resulting page navigation to complete.
   * @param page - page expected to navigate
   * @param locator - element to click
   */
  static async clickAndWaitForNavigation(page: Page, locator: Locator): Promise<void> {
    try {
      await Promise.all([page.waitForNavigation(), locator.click()]);
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed during click and navigation "${locator}" .`, error);
    }
  }

  /**
   * Clicks the element and waits for a new browser tab/page to open (e.g. target="_blank" links).
   * @param page - page/context the click originates from
   * @param locator - element to click
   * @returns the newly opened Page, after its initial load state settles
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
   * Clicks the element and waits for a matching network response.
   * @param page - page to watch for the response
   * @param locator - element to click
   * @param url - URL string or pattern to match the expected response against
   */
  static async clickAndWaitForResponse(page: Page, locator: Locator, url: string | RegExp): Promise<void> {
    try {
      await Promise.all([page.waitForResponse(url), locator.click()]);
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed while waiting for the expected response "${locator}".`, error);
    }
  }

  /**
   * Clicks an element resolved from a dynamically-built selector string.
   * @param page - page to search within
   * @param locator - selector string used to locate the element at runtime
   */
  static async clickDynamicLocator(page: Page, locator: string): Promise<void> {
    try {
      await page.locator(locator).click();
    } catch (error) {
      ErrorUtils.handleError(`❌ Failed to click locator: ${locator}`, error);
    }
  }
}
