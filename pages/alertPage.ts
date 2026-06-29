import { Page, expect, test } from "@playwright/test";
import { AlertHelper } from "../utils/alertHelper";
import { AssertHelper } from "../utils/assertHelper";
import { ClickHelper } from "../utils/clickHelper";
import { AlertTestData } from "../utils/test-data.interface";
import { AlertLocators } from "../locators/alertLocators";
import { DialogActions, Roles } from "../utils/constants";
import { logger } from "../utils/logger";

export class AlertPage {
  readonly #page: Page;

  constructor(page: Page) {
    this.#page = page;
  }

  async landingPage(): Promise<void> {
    await this.#page.goto(AlertLocators.alertPage);
    logger.info("Landed in the alert page successfully.");
  }

  async simpleAlert(testData: AlertTestData): Promise<void> {
    await AlertHelper.alertHandling(this.#page, DialogActions.ACCEPT);
    await this.#page.locator(AlertLocators.simpleAlertButton).click();
    logger.info("Simple alert triggered and clicked on accept.");

    await AssertHelper.assertVisibleWithText(
      this.#page,
      AlertLocators.simpleAlertResult,
      testData.simpleAlertResultText,
    );
    logger.info("Verified the message available in the simple alert.");
  }

  async simpleAlertConfirmClickOk(testData: AlertTestData): Promise<void> {
    await AlertHelper.alertHandling(this.#page, DialogActions.ACCEPT);
    await this.#page.locator(AlertLocators.simpleAlertConfirmButton).click();
    logger.info("Simple alert triggered and clicked on OK.");
    await AssertHelper.assertVisibleWithText(
      this.#page,
      AlertLocators.simpleAlertConfirmResult,
      testData.simpleAlertConfirmTextOk,
    );
    logger.info(
      "Verified the message available in the simple alert when clicking on OK.",
    );
  }

  async simpleAlertConfirmClickCancel(testData: AlertTestData): Promise<void> {
    await AlertHelper.alertHandling(this.#page, DialogActions.DISMISS);
    await this.#page.locator(AlertLocators.simpleAlertConfirmButton).click();
    logger.info("Simple confirm alert triggered and clicked on dismiss.");
    await AssertHelper.assertVisibleWithText(
      this.#page,
      AlertLocators.simpleAlertConfirmResult,
      testData.simpleAlertConfirmTextCancel,
    );
  }

  async sweetAlertSimple(testData: AlertTestData): Promise<void> {
    await this.#page.locator(AlertLocators.sweetAlertSimpleButton).click();
    logger.info("Simple sweet alert triggered.");
    await AssertHelper.assertVisible(
      this.#page,
      AlertLocators.sweetAlertSimplePopup,
    );

    await AssertHelper.assertText(
      this.#page,
      AlertLocators.sweetAlertSimplePopupTitle,
      testData.dialogText,
    );
    await AssertHelper.assertText(
      this.#page,
      AlertLocators.sweetAlertSimplePopupBody,
      testData.sweetAlertSimplePopupBodyText,
    );
    await ClickHelper.clickMatchingByRole(
      this.#page,
      DialogActions.DISMISS,
      Roles.BUTTON,
    );
    const popupWindow = this.#page.locator(AlertLocators.sweetAlertSimplePopup);
    await expect(popupWindow).not.toBeVisible();
    logger.info("Negative assertion to validate the visibility.");
  }

  async sweetModalDialog(testData: AlertTestData): Promise<void> {
    await this.#page.locator(AlertLocators.sweetModalButton).click();
    logger.info("Clicked on button to trigger the sweet modal pop up.");
    await AssertHelper.assertVisible(
      this.#page,
      AlertLocators.sweetModalButtonPopup,
    );
    await AssertHelper.assertText(
      this.#page,
      AlertLocators.sweetModalTitle,
      testData.sweetModalPopUpText,
    );
    await AssertHelper.assertText(
      this.#page,
      AlertLocators.sweetModalBody,
      testData.sweetModalBodyText,
    );
    await ClickHelper.clickMatchingByRole(
      this.#page,
      AlertLocators.closeButton,
      Roles.BUTTON,
    );
  }

  async alertPromptDialogEmpty(testData: AlertTestData) {
    await AlertHelper.alertHandling(this.#page, DialogActions.DISMISS);
    await this.#page.locator(AlertLocators.alertPromptDialogButton).click();
    logger.info(
      "Clicked on button to trigger the alert and clicked on dismiss.",
    );
    await AssertHelper.assertText(
      this.#page,
      AlertLocators.alertPromptDialogConfirmButton,
      testData.alertPromptDialogEmptyText,
    );
  }

  async alertPromptDialogWithMessage(testData: AlertTestData) {
    await AlertHelper.alertHandling(
      this.#page,
      DialogActions.ACCEPT,
      testData.typeNameDropValue,
    );
    await this.#page.locator(AlertLocators.alertPromptDialogButton).click();
    logger.info(
      "Clicked on button to trigger the alert and clicked on accept with the message.",
    );
    await AssertHelper.assertText(
      this.#page,
      AlertLocators.alertPromptDialogConfirmButton,
      testData.alertPromptDialogGivenText,
    );
  }

  async alertPromptDialogWithNullMessage(testData: AlertTestData) {
    await AlertHelper.alertHandling(this.#page, DialogActions.ACCEPT);
    await this.#page.locator(AlertLocators.alertPromptDialogButton).click();
    logger.info(
      "Clicked on button to trigger the alert and clicked on accept without the message.",
    );
    await AssertHelper.assertText(
      this.#page,
      AlertLocators.alertPromptDialogConfirmButton,
      testData.alertPromptDialogNullText,
    );
  }

  async sweetAlertConfirmationYes(testData: AlertTestData) {
    await ClickHelper.clickMatchingByRole(
      this.#page,
      AlertLocators.delete,
      Roles.BUTTON,
    );
    logger.info(
      "Clicked on button to trigger the alert and clicked on YES button.",
    );
    await AssertHelper.assertVisible(
      this.#page,
      AlertLocators.sweetAlertButton,
    );
    await AssertHelper.assertText(
      this.#page,
      AlertLocators.sweetAlertTitle,
      AlertLocators.confirmationButton,
    );
    await AssertHelper.assertText(
      this.#page,
      AlertLocators.sweetAlertMessage,
      testData.sweetAlertBody,
    );
    await ClickHelper.clickMatchingByRole(
      this.#page,
      AlertLocators.yesText,
      Roles.BUTTON,
    );
  }

  async sweetAlertConfirmationNo(testData: AlertTestData) {
    await ClickHelper.clickMatchingByRole(
      this.#page,
      AlertLocators.delete,
      Roles.BUTTON,
    );
    logger.info(
      "Clicked on button to trigger the alert and clicked on NO button.",
    );
    await AssertHelper.assertVisible(
      this.#page,
      AlertLocators.sweetAlertButton,
    );
    await AssertHelper.assertText(
      this.#page,
      AlertLocators.sweetAlertTitle,
      AlertLocators.confirmationButton,
    );
    await AssertHelper.assertText(
      this.#page,
      AlertLocators.sweetAlertMessage,
      testData.sweetAlertBody,
    );
    await ClickHelper.clickMatchingByRole(
      this.#page,
      AlertLocators.noText,
      Roles.BUTTON,
    );
  }
}
