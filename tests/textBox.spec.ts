import { test } from "../fixtures/AccessJsonFile";
import { TextBoxPage } from "../pages/TextBoxPage";
import { TextBoxLocators } from "../locators/TextBoxLocators";
import { TextBoxTestData } from "../utils/testInterface";

let textBoxPage: TextBoxPage;
let data: TextBoxTestData;

test.beforeAll(async ({ getJsonData }) => {
  data = await getJsonData<TextBoxTestData>(TextBoxLocators.textBoxJson);
});

test.beforeEach(async ({ page }) => {
  textBoxPage = new TextBoxPage(page);
  await textBoxPage.landingTextBoxPage();
});

test("Typing the test data in the text field.", async () => {
  await textBoxPage.typeInTextBox(data);
});

test("Appending the text with the existing text.", async () => {
  await textBoxPage.appendText(data);
});

test("Validating whether the text is disabled or not.", async () => {
  await textBoxPage.isDisabled();
});

test("Clearing the existing text from the text area field.", async () => {
  await textBoxPage.clearText();
});

test("Type the Email ID in the text box field and press tab button.", async () => {
  await textBoxPage.typeMailIDPressTab(data);
});

test("Fill the about yourself text box.", async () => {
  await textBoxPage.aboutYourself(data);
});

test("Without giving input press/click on the enter button to extract the error message.", async () => {
  await textBoxPage.confirmErrorMessage(data);
});

test("Type your name and choose the third option.", async () => {
  await textBoxPage.selectValueFromDropDown(data);
});

test("Type your DOB and confirm date chosen.", async () => {
  await textBoxPage.selectDateOfBirth(data);
});

// test("Type your DOB and confirm date chosen.", async ({ page }) => {
//   const textBoxPage = new TextBoxPage(page);
//   await textBoxPage.typeNumberAndSpin(testData);
// });

// test("Type your DOB and confirm date chosen.", async ({ page }) => {
//   const textBoxPage = new TextBoxPage(page);
//   await textBoxPage.checkSliding(testData);
// });

test("Click and Confirm Keyboard appears.", async () => {
  await textBoxPage.oskHandling(data);
});

test("Type in Custom Toolbar.", async () => {
  await textBoxPage.typeCustomToolBar(data);
});
