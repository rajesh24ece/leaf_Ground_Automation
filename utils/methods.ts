import { Page, expect } from "@playwright/test";
import { Locators, DialogAction } from "./locators";

type AriaRole = Parameters<Page["getByRole"]>[0];

export class Methods extends Locators {
  // Capture Screenshot With Logs
  public static async captureAndLog(page: Page, name: string): Promise<void> {
    const screenshotPath = `screenshots/${name}-${Date.now()}.png`;

    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    console.log(`📸 Screenshot captured: ${screenshotPath}`);
  }

  protected static async loopClickWithByRole(
    page: Page,
    locator: string,
    roleType: AriaRole,
  ): Promise<void> {
    const elements = page.getByRole(roleType, { name: locator });
    const count = await elements.count();
    for (let i = 0; i < count; i++) {
      await elements.nth(i).click();
      console.log(`✅ Clicked [${roleType}] "${locator}" — index ${i}`);
      await Methods.captureAndLog(page, `${locator}_click_${i}`);
    }
  }

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

  protected static async assertText(
    page: Page,
    locator: string,
    actualText?: string,
    isVisible?: boolean,
  ): Promise<void> {
    const alertText = page.locator(locator);
    if (isVisible) {
      await expect(alertText).toBeVisible();
    }
    if (actualText) {
      await expect(alertText).toHaveText(actualText);
    }
  }
}
