import { Page, expect } from "@playwright/test";
import { logger } from "../utils/Logger";
import { ClickHelper } from "./ClickHelper";
import { AssertionHelper } from "../helpers/AssertionHelper";

type AriaRole = Parameters<Page["getByRole"]>[0];

export class DropdownHelper {
  static async clickDropdownHandling(page: Page, locator: string, value: string, role: AriaRole): Promise<void> {
    const dropdown = page.locator(locator);
    await ClickHelper.click(dropdown);
    await ClickHelper.clickByRole(page, role, value);
    await AssertionHelper.assertText(dropdown, value);
  }

  static async selectByValue(page: Page, locator: string, value: string): Promise<void> {
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
