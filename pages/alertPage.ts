import { Page, expect } from "@playwright/test";
import { Methods } from "../utils/methods";

export class AlertPage extends Methods {
  #page: Page;

  constructor(page: Page) {
    super();
    this.#page = page;
  }

  async handlingAlert() {
    await this.landingPage();
    await this.simpleAlert();
    await this.simpleAlertConfirmClickOk();
    await this.simpleAlertConfirmClickCancel();
    await this.sweetAlertSimple();
    await this.alertPromptDialogEmpty();
    await this.alertPromptDialogWithMessage();
    await this.alertPromptDialogWithNullMessage();
    await this.sweetAlertConfirmationYes();
    await this.sweetAlertConfirmationNo();
    await this.sweetModalDialog();
  }

  /**
   *
   */

  private async landingPage(): Promise<void> {
    await this.#page.goto(this.alertPage);
    await Methods.captureAndLog(
      this.#page,
      "Sucessfully landed in the alert page.",
    );
  }

  /**
   *
   */

  private async simpleAlert(): Promise<void> {
    await Methods.alertHandling(this.#page, this.accept);
    await this.#page.locator(this.simpleAlertButton).click();
    await Methods.captureAndLog(this.#page, "Clicked on simple alert button.");
    await Methods.assertText(
      this.#page,
      this.simpleAlertResult,
      this.simpleAlertResultText,
      true,
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
      "Clicked on simple alert confirm click OK button.",
    );
    await Methods.assertText(
      this.#page,
      this.simpleAlertConfirmResult,
      this.simpleAlertConfirmTextOk,
      true,
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
      "Clicked on simple alert confirm click CANCEL button.",
    );
    await Methods.assertText(
      this.#page,
      this.simpleAlertConfirmResult,
      this.simpleAlertConfirmTextCancel,
      true,
    );
  }

  /**
   *
   */

  private async sweetAlertSimple(): Promise<void> {
    await this.#page.locator(this.sweetAlertSimpleButton).click();
    await Methods.captureAndLog(
      this.#page,
      "Clicked on sweet simple alert button.",
    );
    await Methods.assertText(this.#page, this.sweetAlertSimplePopup, "", true);
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
    await Methods.loopClickWithByRole(this.#page, this.dismiss, this.button);
    await Methods.captureAndLog(this.#page, "Clicked on the dismiss button.");
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
      "Clicked on the sweet modal dialog button.",
    );

    await Methods.assertText(this.#page, this.sweetModalButtonPopup, "", true);

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
    await Methods.loopClickWithByRole(
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
      "Clicked on alert prompt dialog box as empty.",
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
    await this.#page.locator(this.alertPromptDialogButton).click();
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the prompt dialog box with the message.",
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
      "Clicked on the prompt dialog box with the null message.",
    );
    await Methods.assertText(
      this.#page,
      this.alertPromptDialogConfirmButton,
      this.alertPromptDialogNullText,
    );
  }

  private async sweetAlertConfirmationYes() {
    await Methods.loopClickWithByRole(this.#page, this.delete, this.button);
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the sweet alert confirmation box with the delete button.",
    );

    await Methods.assertText(this.#page, this.sweetAlertButton, "", true);

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
    await Methods.loopClickWithByRole(this.#page, this.yesText, this.button);
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the sweet alert confirmation box with the YES.",
    );
  }

  private async sweetAlertConfirmationNo() {
    await Methods.loopClickWithByRole(this.#page, this.delete, this.button);
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the sweet alert confirmation box with the delete button.",
    );
    await Methods.assertText(this.#page, this.sweetAlertButton, "", true);
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
    await Methods.loopClickWithByRole(this.#page, this.noText, this.button);
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the sweet alert confirmation box with the NO.",
    );
  }
}
