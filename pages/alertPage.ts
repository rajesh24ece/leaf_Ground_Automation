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

  private async landingPage(): Promise<void> {
    await this.#page.goto(this.alertPage);
  }

  private async simpleAlert(): Promise<void> {
    await Methods.alertHandling(this.#page, this.accept);
    await this.#page.locator(this.simpleAlertButton).click();
    await Methods.assertText(
      this.#page,
      this.simpleAlertResult,
      this.simpleAlertResultText,
      true,
    );
  }

  private async simpleAlertConfirmClickOk(): Promise<void> {
    await Methods.alertHandling(this.#page, this.accept);
    await this.#page.locator(this.simpleAlertConfirmButton).click();
    await Methods.assertText(
      this.#page,
      this.simpleAlertConfirmResult,
      this.simpleAlertConfirmTextOk,
      true,
    );
  }

  private async simpleAlertConfirmClickCancel(): Promise<void> {
    await Methods.alertHandling(this.#page, this.dismiss);
    await this.#page.locator(this.simpleAlertConfirmButton).click();
    await Methods.assertText(
      this.#page,
      this.simpleAlertConfirmResult,
      this.simpleAlertConfirmTextCancel,
      true,
    );
  }

  private async sweetAlertSimple(): Promise<void> {
    await this.#page.locator(this.sweetAlertSimpleButton).click();
    const popupWindow = this.#page.locator(this.sweetAlertSimplePopup);
    await expect(popupWindow).toBeVisible();
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
    await expect(popupWindow).not.toBeVisible();
  }

  private async sweetModalDialog(): Promise<void> {
    await this.#page.locator(this.sweetModalButton).click();
    const popupWindow = this.#page.locator(this.sweetModalButtonPopup);
    await expect(popupWindow).toBeVisible();
    const popupTitle = this.#page.locator(this.sweetModalTitle);
    await expect(popupTitle).toHaveText(this.sweetModalPopUpText);
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
  }

  private async alertPromptDialogEmpty() {
    await Methods.alertHandling(this.#page, this.dismiss);
    await this.#page.locator(this.alertPromptDialogButton).click();
    await Methods.assertText(
      this.#page,
      this.alertPromptDialogConfirmButton,
      this.alertPromptDialogEmptyText,
    );
  }

  private async alertPromptDialogWithMessage() {
    await Methods.alertHandling(this.#page, this.accept, "Rajesh");
    await this.#page.locator(this.alertPromptDialogButton).click();
    await Methods.assertText(
      this.#page,
      this.alertPromptDialogConfirmButton,
      this.alertPromptDialogGivenText,
    );
  }

  private async alertPromptDialogWithNullMessage() {
    await Methods.alertHandling(this.#page, this.accept);
    await this.#page.locator(this.alertPromptDialogButton).click();
    await Methods.assertText(
      this.#page,
      this.alertPromptDialogConfirmButton,
      this.alertPromptDialogNullText,
    );
  }

  private async sweetAlertConfirmationYes() {
    await Methods.loopClickWithByRole(this.#page, this.delete, this.button);
    const popup = this.#page.locator(this.sweetAlertButton);
    await expect(popup).toBeVisible();
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
  }

  private async sweetAlertConfirmationNo() {
    await Methods.loopClickWithByRole(this.#page, this.delete, this.button);
    const popup = this.#page.locator(this.sweetAlertButton);
    await expect(popup).toBeVisible();
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
  }
}
