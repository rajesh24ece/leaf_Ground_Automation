import { Page, expect, test } from "@playwright/test";
import { Methods, AlertTestData } from "../utils/methods";
import { AlertLocators } from "../locators/alertLocators";

export class AlertPage extends Methods {
  #page: Page;

  constructor(page: Page) {
    super();
    this.#page = page;
  }

  async handlingAlert() {
    let testData: AlertTestData;

    await test.step("Read test data from json file.", async () => {
      testData = await Methods.accessJsonData(AlertLocators.alertJson);
    });

    await test.step("Landing on Alert Page", async () => {
      await this.landingPage();
    });

    await test.step("Simple Alert - OK button", async () => {
      await this.simpleAlert(testData);
    });

    await test.step("Confirm Dialog - Click OK button", async () => {
      await this.simpleAlertConfirmClickOk(testData);
    });

    await test.step("Confirm Dialog - Click CANCEL button", async () => {
      await this.simpleAlertConfirmClickCancel(testData);
    });

    await test.step("Sweet Alert Simple - Click on DISMISS button", async () => {
      await this.sweetAlertSimple(testData);
    });

    await test.step("Alert Prompt - Empty message passed and clicked on CANCEL button.", async () => {
      await this.alertPromptDialogEmpty(testData);
    });

    await test.step("Alert Prompt - With Message and clicked on OK button.", async () => {
      await this.alertPromptDialogWithMessage(testData);
    });

    await test.step("Alert Prompt - Null Message and clicked on OK button.", async () => {
      await this.alertPromptDialogWithNullMessage(testData);
    });

    await test.step("Sweet Alert Confirmation - Clicked on YES button.", async () => {
      await this.sweetAlertConfirmationYes(testData);
    });

    await test.step("Sweet Alert Confirmation - Clicked on NO button.", async () => {
      await this.sweetAlertConfirmationNo(testData);
    });

    await test.step("Sweet Modal Dialog - Opening the alert and clicked on CLOSE icon.", async () => {
      await this.sweetModalDialog(testData);
    });
  }

  private async landingPage(): Promise<void> {
    await this.#page.goto(AlertLocators.alertPage);
    await Methods.captureAndLog(
      this.#page,
      "Landed in the alert page successfully.",
    );
  }

  private async simpleAlert(testData: AlertTestData): Promise<void> {
    await Methods.alertHandling(this.#page, this.accept);
    await this.#page.locator(AlertLocators.simpleAlertButton).click();
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the Alert (Simple Dialog) button.",
    );
    await Methods.assertVisibleWithText(
      this.#page,
      AlertLocators.simpleAlertResult,
      testData.simpleAlertResultText,
    );
  }

  private async simpleAlertConfirmClickOk(
    testData: AlertTestData,
  ): Promise<void> {
    await Methods.alertHandling(this.#page, this.accept);
    await this.#page.locator(AlertLocators.simpleAlertConfirmButton).click();
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the Alert (Confirm Dialog) button and clicked OK button in the alert.",
    );
    await Methods.assertVisibleWithText(
      this.#page,
      AlertLocators.simpleAlertConfirmResult,
      testData.simpleAlertConfirmTextOk,
    );
  }

  private async simpleAlertConfirmClickCancel(
    testData: AlertTestData,
  ): Promise<void> {
    await Methods.alertHandling(this.#page, this.dismiss);
    await this.#page.locator(AlertLocators.simpleAlertConfirmButton).click();
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the Alert (Confirm Dialog) button and clicked CANCEL button in the alert.",
    );
    await Methods.assertVisibleWithText(
      this.#page,
      AlertLocators.simpleAlertConfirmResult,
      testData.simpleAlertConfirmTextCancel,
    );
  }

  private async sweetAlertSimple(testData: AlertTestData): Promise<void> {
    await this.#page.locator(AlertLocators.sweetAlertSimpleButton).click();
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the Sweet Alert (Simple Dialog) button to open the sweet alert window.",
    );

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

  private async sweetModalDialog(testData: AlertTestData): Promise<void> {
    await this.#page.locator(AlertLocators.sweetModalButton).click();
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the Sweet Modal Dialog button to open the sweet alert window.",
    );
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
    await Methods.captureAndLog(this.#page, "Clicked on the close button.");
  }

  private async alertPromptDialogEmpty(testData: AlertTestData) {
    await Methods.alertHandling(this.#page, this.dismiss);
    await this.#page.locator(AlertLocators.alertPromptDialogButton).click();
    await Methods.captureAndLog(
      this.#page,
      "Clicked on button Alert (Prompt Dialog) to trigger the alert.",
    );
    await Methods.assertText(
      this.#page,
      AlertLocators.alertPromptDialogConfirmButton,
      testData.alertPromptDialogEmptyText,
    );
  }

  private async alertPromptDialogWithMessage(testData: AlertTestData) {
    await Methods.alertHandling(
      this.#page,
      this.accept,
      testData.typeNameDropValue,
    );
    await this.#page.locator(AlertLocators.alertPromptDialogButton).click();
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the Alert (Prompt Dialog) and sending the message in the alert.",
    );
    await Methods.assertText(
      this.#page,
      AlertLocators.alertPromptDialogConfirmButton,
      testData.alertPromptDialogGivenText,
    );
  }

  private async alertPromptDialogWithNullMessage(testData: AlertTestData) {
    await Methods.alertHandling(this.#page, this.accept);
    await this.#page.locator(AlertLocators.alertPromptDialogButton).click();
    await Methods.captureAndLog(
      this.#page,
      "Alert prompt dialog and passing it with null message.",
    );
    await Methods.assertText(
      this.#page,
      AlertLocators.alertPromptDialogConfirmButton,
      testData.alertPromptDialogNullText,
    );
  }

  private async sweetAlertConfirmationYes(testData: AlertTestData) {
    await Methods.clickMatchingByRole(
      this.#page,
      AlertLocators.delete,
      this.button,
    );
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the Sweet Alert (Confirmation) delete button to bring the sweet alert.",
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

  private async sweetAlertConfirmationNo(testData: AlertTestData) {
    await Methods.clickMatchingByRole(
      this.#page,
      AlertLocators.delete,
      this.button,
    );
    await Methods.captureAndLog(
      this.#page,
      "Clicked on the Sweet Alert (Confirmation) delete button to bring the sweet alert.",
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
