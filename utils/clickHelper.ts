import { Page, expect } from "@playwright/test";
import { logger } from "./logger";
import { RoleActions } from "./constants";

type AriaRole = Parameters<Page["getByRole"]>[0];

export class ClickHelper {
  static async clickMatchingByRole(
    page: Page,
    locator: string,
    roleType: AriaRole,
  ): Promise<void> {
    const element = page.getByRole(roleType, { name: locator }).first();
    await expect(element).toBeVisible();
    await element.click();
    logger.info(`Clicked [${roleType}] "${locator}".`);
  }
}
