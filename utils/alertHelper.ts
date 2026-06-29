import { Page } from "@playwright/test";
import { logger } from "./logger";
import { DialogAction } from "./constants";

export class AlertHelper {
  static async alertHandling(
    page: Page,
    action: DialogAction,
    text?: string,
  ): Promise<void> {
    page.once("dialog", async (dialog) => {
      logger.info(
        `This is the message available in the alert. "${dialog.message()}"`,
      );
      if (action === "accept") {
        await dialog.accept(text ?? "");
      } else {
        await dialog.dismiss();
      }
    });
  }
}
