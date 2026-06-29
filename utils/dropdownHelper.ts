import { Page, expect } from "@playwright/test";
import { logger } from "./logger";
import { ClickHelper } from "../utils/clickHelper";

type AriaRole = Parameters<Page["getByRole"]>[0];

export class DropdownHelper {
  static async clickDropdownHandling(
    page: Page,
    locator: string,
    value: string,
    role: AriaRole,
  ): Promise<void> {
    const dropdown = page.locator(locator); // ✅ renamed
    await dropdown.click();
    logger.info(`Clicked dropdown "${locator}".`); // ✅ log added

    await ClickHelper.clickMatchingByRole(page, value, role);

    await expect(dropdown).toHaveText(value);
    logger.info(`Selected "${value}" from dropdown "${locator}".`); // ✅ log added
  }

  // ✅ Add more dropdown methods here to justify the class
  static async selectByValue(
    page: Page,
    locator: string,
    value: string,
  ): Promise<void> {
    const dropdown = page.locator(locator);
    await dropdown.selectOption({ value });
    logger.info(`Selected option by value "${value}" from "${locator}".`);
  }

  static async getSelectedValue(page: Page, locator: string): Promise<string> {
    const dropdown = page.locator(locator);
    const value = await dropdown.inputValue();
    logger.info(`Got selected value "${value}" from "${locator}".`);
    return value;
  }
}
