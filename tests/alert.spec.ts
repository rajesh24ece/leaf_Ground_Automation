import { test } from "../fixtures/AccessJsonFile";
import { AlertPage } from "../pages/AlertPage";
import { AlertTestData } from "../utils/test-data.interface";
import { AlertLocators } from "../locators/AlertLocators";

let alertPage: AlertPage;
let data: AlertTestData;

test.beforeAll(async ({ getJsonData }) => {
  data = await getJsonData<AlertTestData>(AlertLocators.alertJson);
});

test.beforeEach(async ({ page }) => {
  alertPage = new AlertPage(page);
  await alertPage.landingPage();
});

test("Simple Alert - OK button.", async () => {
  await alertPage.simpleAlert(data);
});

test("Confirm Dialog - Click OK button.", async () => {
  await alertPage.simpleAlertConfirmClickOk(data);
});

test("Confirm Dialog - Click CANCEL button.", async () => {
  await alertPage.simpleAlertConfirmClickCancel(data);
});

test("Sweet Alert Simple - Click on DISMISS button.", async () => {
  await alertPage.sweetAlertSimple(data);
});

test("Alert Prompt - Empty message passed and clicked on CANCEL button.", async () => {
  await alertPage.alertPromptDialogEmpty(data);
});

test("Alert Prompt - With Message and clicked on OK button.", async () => {
  await alertPage.alertPromptDialogWithMessage(data);
});

test("Alert Prompt - Null Message and clicked on OK button.", async () => {
  await alertPage.alertPromptDialogWithNullMessage(data);
});

test("Sweet Alert Confirmation - Clicked on YES button.", async () => {
  await alertPage.sweetAlertConfirmationYes(data);
});

test("Sweet Alert Confirmation - Clicked on NO button.", async () => {
  await alertPage.sweetAlertConfirmationNo(data);
});

test("Sweet Modal Dialog - Opening the alert and clicked on CLOSE icon.", async () => {
  await alertPage.sweetModalDialog(data);
});
