import { Page, expect, test } from "@playwright/test";
import { Methods } from "../utils/methods";

export class AlertPage extends Methods {
  #page: Page;

  constructor(page: Page) {
    super();
    this.#page = page;
  }

  async handlingAlert() {
    await test.step("Landing on Alert Page", async () => {
      await this.landingPage();
    });

    await test.step("Simple Alert - OK button", async () => {
      await this.simpleAlert();
    });

    await test.step("Confirm Dialog - Click OK button", async () => {
      await this.simpleAlertConfirmClickOk();
    });

    await test.step("Confirm Dialog - Click CANCEL button", async () => {
      await this.simpleAlertConfirmClickCancel();
    });

    await test.step("Sweet Alert Simple - Click on DISMISS button", async () => {
      await this.sweetAlertSimple();
    });

    await test.step("Alert Prompt - Empty message passed and clicked on CANCEL button.", async () => {
      await this.alertPromptDialogEmpty();
    });

    await test.step("Alert Prompt - With Message and clicked on OK button.", async () => {
      await this.alertPromptDialogWithMessage();
    });

    await test.step("Alert Prompt - Null Message and clicked on OK button.", async () => {
      await this.alertPromptDialogWithNullMessage();
    });

    await test.step("Sweet Alert Confirmation - Clicked on YES button.", async () => {
      await this.sweetAlertConfirmationYes();
    });

    await test.step("Sweet Alert Confirmation - Clicked on NO button.", async () => {
      await this.sweetAlertConfirmationNo();
    });

    await test.step("Sweet Modal Dialog - Opening the alert and clicked on CLOSE icon.", async () => {
      await this.sweetModalDialog();
    });
  }

  /**
   *
   */

  private async landingPage(): Promise<void> {
    await this.#page.goto(this.alertPage);
    await Methods.captureAndLog(
      this.#page,
      "Landed in the alert page successfully.",
    );
  }

  /**
   *
   */

  private async simpleAlert(): Promise<void> {
    await Methods.alertHandling(this.#page, this.accept);
    await this.#page.locator(this.simpleAlertButton).click();
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the Alert (Simple Dialog) button.",
    );
    await Methods.assertVisibleWithText(
      this.#page,
      this.simpleAlertResult,
      this.simpleAlertResultText,
    );
  }

  /**
   *
   */

  private async simpleAlertConfirmClickOk(): Promise<void> {
    await Methods.alertHandling(this.#page, this.accept);
    await this.#page.locator(this.simpleAlertConfirmButton).click();
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the Alert (Confirm Dialog) button and clicked OK button in the alert.",
    );
    await Methods.assertVisibleWithText(
      this.#page,
      this.simpleAlertConfirmResult,
      this.simpleAlertConfirmTextOk,
    );
  }

  /**
   *
   */

  private async simpleAlertConfirmClickCancel(): Promise<void> {
    await Methods.alertHandling(this.#page, this.dismiss);
    await this.#page.locator(this.simpleAlertConfirmButton).click();
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the Alert (Confirm Dialog) button and clicked CANCEL button in the alert.",
    );
    await Methods.assertVisibleWithText(
      this.#page,
      this.simpleAlertConfirmResult,
      this.simpleAlertConfirmTextCancel,
    );
  }

  /**
   *
   */

  private async sweetAlertSimple(): Promise<void> {
    await this.#page.locator(this.sweetAlertSimpleButton).click();
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the Sweet Alert (Simple Dialog) button to open the sweet alert window.",
    );

    await Methods.assertVisible(this.#page, this.sweetAlertSimplePopup);

    await Methods.assertText(
      this.#page,
      this.sweetAlertSimplePopupTitle,
      this.dialogText,
    );
    await Methods.assertText(
      this.#page,
      this.sweetAlertSimplePopupBody,
      this.sweetAlertSimplePopupBodyText,
    );
    await Methods.clickMatchingByRole(this.#page, this.dismiss, this.button);
    const popupWindow = this.#page.locator(this.sweetAlertSimplePopup);
    await expect(popupWindow).not.toBeVisible();
  }

  /**
   *
   */

  private async sweetModalDialog(): Promise<void> {
    await this.#page.locator(this.sweetModalButton).click();
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the Sweet Modal Dialog button to open the sweet alert window.",
    );
    await Methods.assertVisible(this.#page, this.sweetModalButtonPopup);
    await Methods.assertText(
      this.#page,
      this.sweetModalTitle,
      this.sweetModalPopUpText,
    );
    await Methods.assertText(
      this.#page,
      this.sweetModalBody,
      this.sweetModalBodyText,
    );
    await Methods.clickMatchingByRole(
      this.#page,
      this.closeButton,
      this.button,
    );
    await Methods.captureAndLog(this.#page, "Clicked on the close button.");
  }

  private async alertPromptDialogEmpty() {
    await Methods.alertHandling(this.#page, this.dismiss);
    await this.#page.locator(this.alertPromptDialogButton).click();
    await Methods.captureAndLog(
      this.#page,
      "Clicked on button Alert (Prompt Dialog) to trigger the alert.",
    );
    await Methods.assertText(
      this.#page,
      this.alertPromptDialogConfirmButton,
      this.alertPromptDialogEmptyText,
    );
  }

  private async alertPromptDialogWithMessage() {
    await Methods.alertHandling(
      this.#page,
      this.accept,
      this.typeNameDropValue,
    );
    await Methods.alertHandling(
      this.#page,
      this.accept,
      this.typeNameDropValue,
    );
    await this.#page.locator(this.alertPromptDialogButton).click();
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the Alert (Prompt Dialog) and sending the message in the alert.",
    );
    await Methods.assertText(
      this.#page,
      this.alertPromptDialogConfirmButton,
      this.alertPromptDialogGivenText,
    );
  }

  private async alertPromptDialogWithNullMessage() {
    await Methods.alertHandling(this.#page, this.accept);
    await this.#page.locator(this.alertPromptDialogButton).click();
    await Methods.captureAndLog(
      this.#page,
      "Alert prompt dialog and passing it with null message.",
    );
    await Methods.assertText(
      this.#page,
      this.alertPromptDialogConfirmButton,
      this.alertPromptDialogNullText,
    );
  }

  private async sweetAlertConfirmationYes() {
    await Methods.clickMatchingByRole(this.#page, this.delete, this.button);
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the Sweet Alert (Confirmation) delete button to bring the sweet alert.",
    );
    await Methods.assertVisible(this.#page, this.sweetAlertButton);
    await Methods.assertText(
      this.#page,
      this.sweetAlertTitle,
      this.confirmationButton,
    );
    await Methods.assertText(
      this.#page,
      this.sweetAlertMessage,
      this.sweetAlertBody,
    );
    await Methods.clickMatchingByRole(this.#page, this.yesText, this.button);
  }

  private async sweetAlertConfirmationNo() {
    await Methods.clickMatchingByRole(this.#page, this.delete, this.button);
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the Sweet Alert (Confirmation) delete button to bring the sweet alert.",
    );
    await Methods.assertVisible(this.#page, this.sweetAlertButton);
    await Methods.assertText(
      this.#page,
      this.sweetAlertTitle,
      this.confirmationButton,
    );
    await Methods.assertText(
      this.#page,
      this.sweetAlertMessage,
      this.sweetAlertBody,
    );
    await Methods.clickMatchingByRole(this.#page, this.noText, this.button);
  }
}
