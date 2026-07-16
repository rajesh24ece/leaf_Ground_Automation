import { test } from "../fixtures/accessJsonFile";
import { TextBoxPage } from "../pages/textBoxPage";
import { TextBoxLocators } from "../locators/textBoxLocators";

let textBoxPage: TextBoxPage;

test.beforeEach(async ({ page }) => {
  textBoxPage = new TextBoxPage(page);
  await textBoxPage.landingTextBoxPage();
});

test("Typing the test data in the text field", async () => {
  await textBoxPage.typeInTextBox();
});

test("Appending the text with sthe existing text", async () => {
  await textBoxPage.appendText();
});

test("Validating whether the text is disabled or not", async () => {
  await textBoxPage.isDisabled();
});

test("Clearing the existing text from the text area field", async () => {
  await textBoxPage.clearText();
});

test("Type the Email ID in the text box field and press tab button", async () => {
  await textBoxPage.typeMailIDPressTab();
});

test("Fill the about yourself text box", async () => {
  await textBoxPage.aboutYourself();
});

test("Without giving input press/click on the enter button to extract the error message", async () => {
  await textBoxPage.confirmErrorMessage();
});

test("Type your name and choose the third option", async () => {
  await textBoxPage.selectValueFromDropDown();
});

test("Type your DOB and confirm date chosen.", async () => {
  await textBoxPage.selectDateOfBirth();
});

test("Type number and spin.", async () => {
  await textBoxPage.typeNumberAndSpin();
});

test("Check sliding range.", async () => {
  await textBoxPage.checkSlidingByNumber();
});

test("Click and Confirm Keyboard appears.", async () => {
  await textBoxPage.oskHandling();
});

test("Type in Custom Toolbar.", async () => {
  await textBoxPage.typeCustomToolBar();
});
