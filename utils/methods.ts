import { Page, expect } from "@playwright/test";
import { DialogAction } from "./constants";
import * as fs from "fs";
import * as path from "path";

type AriaRole = Parameters<Page["getByRole"]>[0];

export class Methods {
  public static async captureAndLog(page: Page, name: string): Promise<void> {
    const screenshotPath = `screenshots/${name}-${Date.now()}.png`;

    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    console.log(`📸 Screenshot captured: ${screenshotPath}`);
  }

  /**
   *
   * @param page
   * @param locator
   * @param roleType
   */

  static async clickMatchingByRole(
    page: Page,
    locator: string,
    roleType: AriaRole,
  ): Promise<void> {
    const elements = page.getByRole(roleType, { name: locator });
    const count = await elements.count();
    for (let i = 0; i < count; i++) {
      await elements.nth(i).click();
      console.log(`✅ Clicked [${roleType}] "${locator}".`);
    }
  }

  /**
   *
   * @param page
   * @param action
   * @param text
   */

  static async alertHandling(
    page: Page,
    action: DialogAction,
    text?: string,
  ): Promise<void> {
    page.once("dialog", async (dialog) => {
      console.log(dialog.message());
      if (action === "accept") {
        await dialog.accept(text ?? "");
      } else {
        await dialog.dismiss();
      }
    });
  }

  /**
   *
   * @param page
   * @param locator
   * @param actualText
   * @param isVisible
   */

  static async assertVisible(page: Page, locator: string): Promise<void> {
    const alertText = page.locator(locator);
    await expect(alertText).toBeVisible();
  }

  /**
   *
   * @param page
   * @param locator
   * @param actualText
   * @param isVisible
   */

  static async assertText(
    page: Page,
    locator: string,
    actualText: string,
  ): Promise<void> {
    const alertText = page.locator(locator);
    await expect(alertText).toHaveText(actualText);
  }

  /**
   *
   * @param page
   * @param locator
   * @param expectedText
   */

  static async assertVisibleWithText(
    page: Page,
    locator: string,
    expectedText: string,
  ): Promise<void> {
    await Methods.assertVisible(page, locator);
    await Methods.assertText(page, locator, expectedText);
  }

  /**
   *
   * @param page
   * @param locator
   * @param value
   * @param role
   */

  static async clickDropdownHandling(
    page: Page,
    locator: string,
    value: string,
    role: AriaRole,
  ): Promise<void> {
    const dropdownClick = page.locator(locator);
    await dropdownClick.click();
    await Methods.clickMatchingByRole(page, value, role);
    await expect(dropdownClick).toHaveText(value);
  }

  /**
   *
   * @param fileLocation
   * @returns
   */

  static async accessJsonData<T>(filePath: string): Promise<T> {
    const data = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(data) as T;
  }

  static async accessJsonArrayData<T>(fileLocation: string): Promise<T[]> {
    const rawData = fs.readFileSync(
      path.resolve(__dirname, fileLocation),
      "utf-8",
    );

    return JSON.parse(rawData) as T[];
  }
}
