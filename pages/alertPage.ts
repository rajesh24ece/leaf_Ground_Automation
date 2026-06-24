import { Page, expect, test } from "@playwright/test";
import { Methods } from "../utils/methods";
import { AlertTestData } from "../utils/test-data.interface";
import { AlertLocators } from "../locators/alertLocators";
import { DialogActions, Roles } from "../utils/constants";

export class AlertPage extends Methods {
  readonly #page: Page;

  constructor(page: Page) {
    super();
    this.#page = page;
  }

  async landingPage(): Promise<void> {
    await this.#page.goto(AlertLocators.alertPage);
  }

  async simpleAlert(testData: AlertTestData): Promise<void> {
    await Methods.alertHandling(this.#page, DialogActions.ACCEPT);
    await this.#page.locator(AlertLocators.simpleAlertButton).click();

    await Methods.assertVisibleWithText(
      this.#page,
      AlertLocators.simpleAlertResult,
      testData.simpleAlertResultText,
    );
  }

  async simpleAlertConfirmClickOk(testData: AlertTestData): Promise<void> {
    await Methods.alertHandling(this.#page, DialogActions.ACCEPT);
    await this.#page.locator(AlertLocators.simpleAlertConfirmButton).click();
    await Methods.assertVisibleWithText(
      this.#page,
      AlertLocators.simpleAlertConfirmResult,
      testData.simpleAlertConfirmTextOk,
    );
  }

  async simpleAlertConfirmClickCancel(testData: AlertTestData): Promise<void> {
    await Methods.alertHandling(this.#page, DialogActions.DISMISS);
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
      testData.dialogText,
    );
    await Methods.assertText(
      this.#page,
      AlertLocators.sweetAlertSimplePopupBody,
      testData.sweetAlertSimplePopupBodyText,
    );
    await Methods.clickMatchingByRole(
      this.#page,
      DialogActions.DISMISS,
      Roles.BUTTON,
    );
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
      Roles.BUTTON,
    );
  }

  async alertPromptDialogEmpty(testData: AlertTestData) {
    await Methods.alertHandling(this.#page, DialogActions.DISMISS);
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
      DialogActions.ACCEPT,
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
    await Methods.alertHandling(this.#page, DialogActions.ACCEPT);
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
      Roles.BUTTON,
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
      Roles.BUTTON,
    );
  }

  async sweetAlertConfirmationNo(testData: AlertTestData) {
    await Methods.clickMatchingByRole(
      this.#page,
      AlertLocators.delete,
      Roles.BUTTON,
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
      Roles.BUTTON,
    );
  }
}
