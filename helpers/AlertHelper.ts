import { Page } from "@playwright/test";
import { logger } from "../utils/Logger";
import { DialogAction } from "../utils/Constants";
import { TextConstants } from "../utils/CommonText";

export class AlertHelper {
  static async alertHandling(page: Page, action: DialogAction, text?: string): Promise<void> {
    page.once("dialog", async (dialog) => {
      logger.info(`This is the message available in the alert. "${dialog.message()}"`);
      if (action === TextConstants.accept) {
        await dialog.accept(text ?? "");
      } else {
        await dialog.dismiss();
      }
    });
  }
}
