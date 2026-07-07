import { Page, Locator } from "@playwright/test";
import { ErrorUtils } from "../utils/errorUtils";
import { ClickHelper } from "./clickHelper";
import { AssertionHelper } from "../helpers/assertionHelper";

type AriaRole = Parameters<Page["getByRole"]>[0];

export class DropdownHelper {
  static async clickDropdownHandling(page: Page, elementLocator: string, value: string, role: AriaRole): Promise<void> {
    try {
      const dropdown = page.locator(elementLocator);
      await ClickHelper.click(dropdown);
      await dropdown.waitFor({ state: "visible", timeout: 15000 });

      // wait for the panel to actually expand (covers case #1: click didn't register)
      await page.waitForTimeout(300); // let the open-animation start
      const isExpanded = await dropdown.getAttribute("aria-expanded").catch(() => null);
      if (isExpanded === "false") {
        // dropdown didn't open — retry the click once
        await ClickHelper.click(dropdown);
      }

      // wait for ANY option to attach first — proves the listbox rendered at all
      const anyOption = page.getByRole(role).first();
      await anyOption.waitFor({ state: "attached", timeout: 15000 });

      const option = page.getByRole(role, { name: value }).first();

      // covers case #2: virtualized list — scroll it into view before checking visibility
      await option.scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
      await option.waitFor({ state: "visible", timeout: 15000 });
      await option.click();

      await AssertionHelper.assertText(dropdown, value);
    } catch (error) {
      // extra diagnostics on failure — tells us exactly what state the page was in
      const optionCount = await page
        .getByRole(role)
        .count()
        .catch(() => -1);
      const allOptionTexts = await page
        .getByRole(role)
        .allTextContents()
        .catch(() => []);
      ErrorUtils.handleError(`❌ Unable to select "${value}". Found ${optionCount} options: [${allOptionTexts.join(", ")}]`, error);
    }
  }

  /**
   *
   * @param locator
   * @param text
   */

  static async selectByText(locator: Locator, text: string): Promise<void> {
    try {
      await locator.selectOption({ label: text });
    } catch (error) {
      ErrorUtils.handleError(`❌ Unable to select "${text}"`, error);
    }
  }

  /**
   *
   * @param locator
   * @param value
   */

  static async selectByValue(locator: Locator, value: string): Promise<void> {
    try {
      await locator.selectOption({ value });
    } catch (error) {
      ErrorUtils.handleError(`❌ Unable to select value "${value}"`, error);
    }
  }

  /**
   *
   * @param locator
   * @param index
   */

  static async selectByIndex(locator: Locator, index: number): Promise<void> {
    try {
      await locator.selectOption({ index });
    } catch (error) {
      ErrorUtils.handleError(`❌ Unable to select index "${index}"`, error);
    }
  }

  /**
   *
   * @param locator
   * @param values
   */

  static async selectMultiple(locator: Locator, values: string[]): Promise<void> {
    try {
      await locator.selectOption(values);
    } catch (error) {
      ErrorUtils.handleError("❌ Unable to select multiple options", error);
    }
  }

  /**
   *
   * @param locator
   * @returns
   */

  static async getSelectedText(locator: Locator): Promise<string> {
    try {
      return (await locator.locator("option:checked").textContent()) ?? "";
    } catch (error) {
      return ErrorUtils.handleError("Unable to get selected option", error);
    }
  }

  /**
   * Get selected value
   */
  static async getSelectedValue(locator: Locator): Promise<string> {
    try {
      return await locator.inputValue();
    } catch (error) {
      return ErrorUtils.handleError("Unable to get selected value", error);
    }
  }

  /**
   * Get all dropdown option texts
   */
  static async getAllOptions(locator: Locator): Promise<string[]> {
    try {
      return await locator.locator("option").evaluateAll((options) => options.map((option) => option.textContent?.trim() ?? ""));
    } catch (error) {
      return ErrorUtils.handleError("Unable to get dropdown options", error);
    }
  }

  /**
   * Verify selected text
   */
  static async assertSelectedText(locator: Locator, expected: string): Promise<void> {
    const actual = await this.getSelectedText(locator);
    await AssertionHelper.assertEquals(actual, expected);
  }

  /**
   * Get option count
   */
  static async getOptionCount(locator: Locator): Promise<number> {
    try {
      return await locator.locator("option").count();
    } catch (error) {
      return ErrorUtils.handleError("Unable to get option count", error);
    }
  }

  /**
   * Check whether dropdown contains option
   */
  static async containsOption(locator: Locator, text: string): Promise<boolean> {
    const options = await this.getAllOptions(locator);
    return options.includes(text);
  }

  /**
   * Select custom dropdown option
   */
  static async selectCustomOption(dropdown: Locator, option: Locator): Promise<void> {
    try {
      await dropdown.click();
      await option.click();
    } catch (error) {
      ErrorUtils.handleError("Unable to select custom dropdown option", error);
    }
  }

  /**
   * Search and select option
   */
  static async searchAndSelect(searchBox: Locator, option: Locator, text: string): Promise<void> {
    try {
      await searchBox.fill(text);
      await option.click();
    } catch (error) {
      ErrorUtils.handleError("Unable to search and select option", error);
    }
  }

  /**
   * Deselect all (multi-select)
   */
  static async clearSelection(locator: Locator): Promise<void> {
    try {
      await locator.selectOption([]);
    } catch (error) {
      ErrorUtils.handleError("Unable to clear dropdown selection", error);
    }
  }
}
