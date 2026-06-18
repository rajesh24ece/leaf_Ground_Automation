import { Page, expect } from "@playwright/test";
import { Locators, DialogAction } from "./locators";
import * as fs from "fs";
import * as path from "path";

type AriaRole = Parameters<Page["getByRole"]>[0];

export interface TextBoxTestData {
  typeName: string;
  typeNewName: string;
  mailID: string;
  appendCountry: string;
  aboutYourselfText: string;
  errorMessageText: string;
  dobYear: string;
  dobDate: string;
  monthInText: string;
  fullDate: string;
  typeNameDropValue: string;
  typeNameDropValueDisplay: string;
  courses: string[];
  india: string;
  chennai: string;
  tamil: string;
  customToolBarValue: string;
}

export interface DropdownTestData {
  playwrightText: string;
  india: string;
  chennai: string;
  tamil: string;
  rendu: string;
  courses: string[];
}

export interface AlertTestData {
  simpleAlertResultText: string;
  simpleAlertConfirmTextOk: string;
  simpleAlertConfirmTextCancel: string;
  sweetAlertSimplePopupBodyText: string;
  sweetModalPopUpText: string;
  sweetModalBodyText: string;
  alertPromptDialogEmptyText: string;
  alertPromptDialogGivenText: string;
  alertPromptDialogNullText: string;
  sweetAlertBody: string;
  typeNameDropValue: string;
}

export interface TableTestData {
  ProductName: string;
  Description: string;
  Category: string;
  Price: number;
  Quantity: number;
}

export class Methods extends Locators {
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

  protected static async clickMatchingByRole(
    page: Page,
    locator: string,
    roleType: AriaRole,
  ): Promise<void> {
    const elements = page.getByRole(roleType, { name: locator });
    const count = await elements.count();
    for (let i = 0; i < count; i++) {
      await elements.nth(i).click();
      console.log(`✅ Clicked [${roleType}] "${locator}".`);
      await Methods.captureAndLog(page, `${locator}_click_${i}`);
    }
  }

  /**
   *
   * @param page
   * @param action
   * @param text
   */

  protected static async alertHandling(
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

  protected static async assertVisible(
    page: Page,
    locator: string,
  ): Promise<void> {
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

  protected static async assertText(
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

  protected static async assertVisibleWithText(
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

  protected static async clickDropdownHandling(
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

  protected static async accessJsonData<T>(fileLocation: string): Promise<T> {
    const rawData = fs.readFileSync(
      path.resolve(__dirname, fileLocation),
      "utf-8",
    );
    return JSON.parse(rawData) as T;
  }

  protected static async accessJsonArrayData<T>(
    fileLocation: string,
  ): Promise<T[]> {
    const rawData = fs.readFileSync(
      path.resolve(__dirname, fileLocation),
      "utf-8",
    );

    return JSON.parse(rawData) as T[];
  }
}
