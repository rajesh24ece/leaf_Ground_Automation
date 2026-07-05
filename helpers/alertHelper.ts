import { Page } from "@playwright/test";
import { logger } from "../utils/logger";
import { DialogAction } from "../utils/constants";
import { TextConstants } from "../utils/commonText";

export class AlertHelper {
  static async alertHandling(page: Page, action: DialogAction, text?: string): Promise<void> {
    page.once("dialog", async (dialog) => {
      logger.info(`✅ Alert Message: "${dialog.message()}"`);
      if (action === TextConstants.accept) {
        await dialog.accept(text ?? "");
      } else {
        await dialog.dismiss();
      }
    });
  }
}
