import { Page, expect, test } from "@playwright/test";
import { Methods, AlertTestData } from "../utils/methods";
import { AlertLocators } from "../locators/alertLocators";

export class AlertPage extends Methods {
  #page: Page;

  constructor(page: Page) {
    super();
    this.#page = page;
  }

  async landingPage(): Promise<void> {
    await this.#page.goto(AlertLocators.alertPage);
    await Methods.captureAndLog(
      this.#page,
      "Landed in the alert page successfully.",
    );
  }

  async simpleAlert(testData: AlertTestData): Promise<void> {
    await Methods.alertHandling(this.#page, this.accept);
    await this.#page.locator(AlertLocators.simpleAlertButton).click();

    await Methods.assertVisibleWithText(
      this.#page,
      AlertLocators.simpleAlertResult,
      testData.simpleAlertResultText,
    );
  }

  async simpleAlertConfirmClickOk(testData: AlertTestData): Promise<void> {
    await Methods.alertHandling(this.#page, this.accept);
    await this.#page.locator(AlertLocators.simpleAlertConfirmButton).click();
    await Methods.assertVisibleWithText(
      this.#page,
      AlertLocators.simpleAlertConfirmResult,
      testData.simpleAlertConfirmTextOk,
    );
  }

  async simpleAlertConfirmClickCancel(testData: AlertTestData): Promise<void> {
    await Methods.alertHandling(this.#page, this.dismiss);
    await this.#page.locator(AlertLocators.simpleAlertConfirmButton).click();
    await Methods.assertVisibleWithText(
      this.#page,
      AlertLocators.simpleAlertConfirmResult,
      testData.simpleAlertConfirmTextCancel,
    );
  }

  async sweetAlertSimple(testData: AlertTestData): Promise<void> {
    await this.#page.locator(AlertLocators.sweetAlertSimpleButton).click();
    await Methods.assertVisible(
      this.#page,
      AlertLocators.sweetAlertSimplePopup,
    );

    await Methods.assertText(
      this.#page,
      AlertLocators.sweetAlertSimplePopupTitle,
      this.dialogText,
    );
    await Methods.assertText(
      this.#page,
      AlertLocators.sweetAlertSimplePopupBody,
      testData.sweetAlertSimplePopupBodyText,
    );
    await Methods.clickMatchingByRole(this.#page, this.dismiss, this.button);
    const popupWindow = this.#page.locator(AlertLocators.sweetAlertSimplePopup);
    await expect(popupWindow).not.toBeVisible();
  }

  async sweetModalDialog(testData: AlertTestData): Promise<void> {
    await this.#page.locator(AlertLocators.sweetModalButton).click();
    await Methods.assertVisible(
      this.#page,
      AlertLocators.sweetModalButtonPopup,
    );
    await Methods.assertText(
      this.#page,
      AlertLocators.sweetModalTitle,
      testData.sweetModalPopUpText,
    );
    await Methods.assertText(
      this.#page,
      AlertLocators.sweetModalBody,
      testData.sweetModalBodyText,
    );
    await Methods.clickMatchingByRole(
      this.#page,
      AlertLocators.closeButton,
      this.button,
    );
  }

  async alertPromptDialogEmpty(testData: AlertTestData) {
    await Methods.alertHandling(this.#page, this.dismiss);
    await this.#page.locator(AlertLocators.alertPromptDialogButton).click();
    await Methods.assertText(
      this.#page,
      AlertLocators.alertPromptDialogConfirmButton,
      testData.alertPromptDialogEmptyText,
    );
  }

  async alertPromptDialogWithMessage(testData: AlertTestData) {
    await Methods.alertHandling(
      this.#page,
      this.accept,
      testData.typeNameDropValue,
    );
    await this.#page.locator(AlertLocators.alertPromptDialogButton).click();
    await Methods.assertText(
      this.#page,
      AlertLocators.alertPromptDialogConfirmButton,
      testData.alertPromptDialogGivenText,
    );
  }

  async alertPromptDialogWithNullMessage(testData: AlertTestData) {
    await Methods.alertHandling(this.#page, this.accept);
    await this.#page.locator(AlertLocators.alertPromptDialogButton).click();
    await Methods.assertText(
      this.#page,
      AlertLocators.alertPromptDialogConfirmButton,
      testData.alertPromptDialogNullText,
    );
  }

  async sweetAlertConfirmationYes(testData: AlertTestData) {
    await Methods.clickMatchingByRole(
      this.#page,
      AlertLocators.delete,
      this.button,
    );
    await Methods.assertVisible(this.#page, AlertLocators.sweetAlertButton);
    await Methods.assertText(
      this.#page,
      AlertLocators.sweetAlertTitle,
      AlertLocators.confirmationButton,
    );
    await Methods.assertText(
      this.#page,
      AlertLocators.sweetAlertMessage,
      testData.sweetAlertBody,
    );
    await Methods.clickMatchingByRole(
      this.#page,
      AlertLocators.yesText,
      this.button,
    );
  }

  async sweetAlertConfirmationNo(testData: AlertTestData) {
    await Methods.clickMatchingByRole(
      this.#page,
      AlertLocators.delete,
      this.button,
    );

    await Methods.assertVisible(this.#page, AlertLocators.sweetAlertButton);
    await Methods.assertText(
      this.#page,
      AlertLocators.sweetAlertTitle,
      AlertLocators.confirmationButton,
    );
    await Methods.assertText(
      this.#page,
      AlertLocators.sweetAlertMessage,
      testData.sweetAlertBody,
    );
    await Methods.clickMatchingByRole(
      this.#page,
      AlertLocators.noText,
      this.button,
    );
  }
}
