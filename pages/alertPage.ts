import { Page } from "@playwright/test";
import { AlertHelper } from "../helpers/alertHelper";
import { NavigationHelper } from "../helpers/navigationHelper";
import { AssertionHelper } from "../helpers/assertionHelper";
import { ClickHelper } from "../helpers/clickHelper";
import { AlertTestData } from "../interface/uiInterface";
import { AlertLocators } from "../locators/alertLocators";
import { DialogActions, Roles } from "../utils/constants";
import { logger } from "../utils/logger";

export class AlertPage {
  readonly #page: Page;

  constructor(page: Page) {
    this.#page = page;
  }

  async landingPage(): Promise<void> {
    await NavigationHelper.navigateToPage(this.#page, AlertLocators.alertPage);
  }

  async simpleAlert(testData: AlertTestData): Promise<void> {
    await AlertHelper.alertHandling(this.#page, DialogActions.ACCEPT);
    await ClickHelper.click(this.#page.locator(AlertLocators.simpleAlertButton));
    logger.info("✅ Clicked: Simple alert button.");
    await AssertionHelper.assertVisible(this.#page.locator(AlertLocators.simpleAlertResult));
    await AssertionHelper.assertTextMatches(this.#page.locator(AlertLocators.simpleAlertResult), testData.simpleAlertResultText);
  }

  async simpleAlertConfirmClickOk(testData: AlertTestData): Promise<void> {
    await AlertHelper.alertHandling(this.#page, DialogActions.ACCEPT);
    await ClickHelper.click(this.#page.locator(AlertLocators.simpleAlertConfirmButton));
    logger.info("✅ Clicked: Simple alert confirm button in alert clicked OK.");
    await AssertionHelper.assertVisible(this.#page.locator(AlertLocators.simpleAlertConfirmResult));
    await AssertionHelper.assertTextMatches(this.#page.locator(AlertLocators.simpleAlertConfirmResult), testData.simpleAlertConfirmTextOk);
  }

  async simpleAlertConfirmClickCancel(testData: AlertTestData): Promise<void> {
    await AlertHelper.alertHandling(this.#page, DialogActions.DISMISS);
    await ClickHelper.click(this.#page.locator(AlertLocators.simpleAlertConfirmButton));
    logger.info("✅ Clicked: Simple alert confirm button in alert clicked DISMSS.");
    await AssertionHelper.assertVisible(this.#page.locator(AlertLocators.simpleAlertConfirmResult));
    await AssertionHelper.assertTextMatches(this.#page.locator(AlertLocators.simpleAlertConfirmResult), testData.simpleAlertConfirmTextCancel);
  }

  async sweetAlertSimple(testData: AlertTestData): Promise<void> {
    await ClickHelper.click(this.#page.locator(AlertLocators.sweetAlertSimpleButton));
    logger.info("✅ Clicked: Simple sweet alert button.");
    await AssertionHelper.assertVisible(this.#page.locator(AlertLocators.sweetAlertSimplePopup));
    await AssertionHelper.assertText(this.#page.locator(AlertLocators.sweetAlertSimplePopupTitle), testData.dialogText);
    await AssertionHelper.assertText(this.#page.locator(AlertLocators.sweetAlertSimplePopupBody), testData.sweetAlertSimplePopupBodyText);
    await ClickHelper.clickByRole(this.#page, Roles.BUTTON, DialogActions.DISMISS);
    logger.info("✅ Clicked: Simple sweet alert closed by clicking DISMISS.");
    const popupWindow = this.#page.locator(AlertLocators.sweetAlertSimplePopup);
    await AssertionHelper.assertNotVisible(popupWindow);
  }

  async sweetModalDialog(testData: AlertTestData): Promise<void> {
    await ClickHelper.click(this.#page.locator(AlertLocators.sweetModalButton));
    logger.info("✅ Clicked: Sweet modal alert button.");
    await AssertionHelper.assertVisible(this.#page.locator(AlertLocators.sweetModalButtonPopup));
    await AssertionHelper.assertText(this.#page.locator(AlertLocators.sweetModalTitle), testData.sweetModalPopUpText);
    await AssertionHelper.assertText(this.#page.locator(AlertLocators.sweetModalBody), testData.sweetModalBodyText);
    await ClickHelper.clickByRole(this.#page, Roles.BUTTON, AlertLocators.closeButton);
    logger.info("✅ Clicked: Sweet modal alert closed by clicking CLOSE.");
  }

  async alertPromptDialogEmpty(testData: AlertTestData) {
    await AlertHelper.alertHandling(this.#page, DialogActions.DISMISS);
    await ClickHelper.click(this.#page.locator(AlertLocators.alertPromptDialogButton));
    logger.info("✅ Clicked: Prompt modal dialog passing an empty data.");
    await AssertionHelper.assertText(this.#page.locator(AlertLocators.alertPromptDialogConfirmButton), testData.alertPromptDialogEmptyText);
  }

  async alertPromptDialogWithMessage(testData: AlertTestData) {
    await AlertHelper.alertHandling(this.#page, DialogActions.ACCEPT, testData.typeNameDropValue);
    await ClickHelper.click(this.#page.locator(AlertLocators.alertPromptDialogButton));
    logger.info("✅ vClicked: Prompt modal dialog passing data.");
    await AssertionHelper.assertText(this.#page.locator(AlertLocators.alertPromptDialogConfirmButton), testData.alertPromptDialogGivenText);
  }

  async alertPromptDialogWithNullMessage(testData: AlertTestData) {
    await AlertHelper.alertHandling(this.#page, DialogActions.ACCEPT);
    await ClickHelper.click(this.#page.locator(AlertLocators.alertPromptDialogButton));
    logger.info("✅ vClicked: Prompt modal dialog passing null data.");
    await AssertionHelper.assertText(this.#page.locator(AlertLocators.alertPromptDialogConfirmButton), testData.alertPromptDialogNullText);
  }

  async sweetAlertConfirmationYes(testData: AlertTestData) {
    await ClickHelper.clickByRole(this.#page, Roles.BUTTON, AlertLocators.delete);
    logger.info("Clicked: Prompt modal dialog passing data.");
    await AssertionHelper.assertVisible(this.#page.locator(AlertLocators.sweetAlertButton));
    await AssertionHelper.assertText(this.#page.locator(AlertLocators.sweetAlertTitle), AlertLocators.confirmationButton);
    await AssertionHelper.assertText(this.#page.locator(AlertLocators.sweetAlertMessage), testData.sweetAlertBody);
    await ClickHelper.clickByRole(this.#page, Roles.BUTTON, AlertLocators.yesText);
    logger.info("✅ Clicked: Prompt modal dialog passing data.");
  }

  async sweetAlertConfirmationNo(testData: AlertTestData) {
    await ClickHelper.clickByRole(this.#page, Roles.BUTTON, AlertLocators.delete);
    logger.info("Clicked: Sweet confirmation alert button.");
    await AssertionHelper.assertVisible(this.#page.locator(AlertLocators.sweetAlertButton));
    await AssertionHelper.assertText(this.#page.locator(AlertLocators.sweetAlertTitle), AlertLocators.confirmationButton);
    await AssertionHelper.assertText(this.#page.locator(AlertLocators.sweetAlertMessage), testData.sweetAlertBody);
    await ClickHelper.clickByRole(this.#page, Roles.BUTTON, AlertLocators.noText);
    logger.info("✅ Clicked: Sweet confirmation alert clicking NO.");
  }
}
