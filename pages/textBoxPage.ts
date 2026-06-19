import { expect, Page, test } from "@playwright/test";
import { Methods, TextBoxTestData } from "../utils/methods";
import { TextBoxLocators } from "../locators/textBoxLocators";

export class TextBox extends Methods {
  #page: Page;

  constructor(page: Page) {
    super();
    this.#page = page;
  }

  async handlingTextBox() {
    let testData: TextBoxTestData;

    await test.step("Read test data from json file.", async () => {
      testData = await Methods.accessJsonData(TextBoxLocators.textBoxJson);
    });

    await test.step("Landing in the text box page", async () => {
      await this.landingTextBoxPage();
    });

    await test.step("Typing the test data in the text field.", async () => {
      await this.typeInTextBox(testData);
    });

    await test.step("Appending the text with the existing text.", async () => {
      await this.appendText(testData);
    });

    await test.step("Landing in the text box page", async () => {
      await this.isDisabled();
    });

    await test.step("Landing in the text box page", async () => {
      await this.clearText();
    });

    await test.step("Landing in the text box page", async () => {
      await this.typeMailIDPressTab(testData);
    });

    await test.step("Landing in the text box page", async () => {
      await this.aboutYourself(testData);
    });

    await test.step("Landing in the text box page", async () => {
      await this.confirmErrorMessage(testData);
    });

    await test.step("Landing in the text box page", async () => {
      await this.selectValueFromDropDown(testData);
    });

    await test.step("Landing in the text box page", async () => {
      await this.selectDateOfBirth(testData);
    });

    //await this.typeNumberAndSpin();
    //await this.checkSliding();

    await test.step("Landing in the text box page", async () => {
      await this.oskHandling(testData);
    });

    await test.step("Landing in the text box page", async () => {
      await this.typeCustomToolBar(testData);
    });
  }

  private async landingTextBoxPage() {
    await this.#page.goto(TextBoxLocators.textPage);
    await Methods.captureAndLog(
      this.#page,
      "Successfully landed in the text box page.",
    );
  }

  private async typeInTextBox(testData: TextBoxTestData) {
    const textbox = this.#page.getByPlaceholder(
      TextBoxLocators.typeNamePlaceHolder,
    );
    await textbox.fill(testData.typeNewName);
    console.log(
      `Typed the name "${testData.typeNewName}" in the text box field.`,
    );
    await expect(textbox).toHaveValue(testData.typeNewName);
  }

  private async appendText(testData: TextBoxTestData) {
    const input = this.#page.locator(TextBoxLocators.appendTextLocator);
    await input.click();
    await input.press("Control+End");
    await input.press("Space");
    await input.pressSequentially(testData.appendCountry);
    console.log(
      `Appended the country "${testData.appendCountry}" in the text box field.`,
    );
    const result = "Chennai" + " " + testData.appendCountry.trim();
    console.log(
      `After appending the country "${result}" in the text box field.`,
    );
    await expect(input).toHaveValue(result);
  }

  private async isDisabled() {
    const isDisabled = await this.#page
      .locator(TextBoxLocators.isDisabledLocator)
      .isDisabled();
    console.log("Is the text box disabled?", isDisabled);
  }

  private async clearText() {
    let textField = this.#page.locator(TextBoxLocators.clearTextLocator);
    await textField.fill("");
    await expect(textField).toHaveValue("");
  }

  private async typeMailIDPressTab(testData: TextBoxTestData) {
    const emailInput = this.#page.getByPlaceholder(
      TextBoxLocators.mailIDLocator,
    );
    await emailInput.fill(testData.mailID);
    console.log(`In the text field "${testData.mailID}" is typed correctly.`);
    await emailInput.press("Tab");
    console.log(`Pressed tab button.`);
    await expect(emailInput).toHaveValue(testData.mailID);
    const focusedField = this.#page.getByPlaceholder(
      TextBoxLocators.aboutYouLocator,
    );
    await expect(focusedField).toBeFocused();
  }

  private async aboutYourself(testData: TextBoxTestData) {
    const aboutYouInput = this.#page.getByPlaceholder(
      TextBoxLocators.aboutYouLocator,
    );
    await aboutYouInput.pressSequentially(testData.aboutYourselfText);
    console.log(
      `In the text field typed "${testData.aboutYourselfText}" this in the about yourself text field.`,
    );
    await expect(aboutYouInput).toHaveValue(testData.aboutYourselfText);
  }

  private async confirmErrorMessage(testData: TextBoxTestData) {
    const textFieldBox = this.#page.locator(
      TextBoxLocators.errorMessageLocator,
    );
    await textFieldBox.click();
    console.log(`Clicked inside the text box.`);
    await textFieldBox.press("Enter");
    const errorMessage = this.#page.locator(
      TextBoxLocators.errorMessageTextLocator,
    );
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(testData.errorMessageText);
  }

  private async selectValueFromDropDown(testData: TextBoxTestData) {
    const drop = this.#page
      .locator(TextBoxLocators.typeNameDrop)
      .and(this.#page.getByRole("application"));
    await drop.click();
    await drop.pressSequentially(testData.typeNameDropValue);
    await expect(
      this.#page.locator(TextBoxLocators.dropDownClickLocator),
    ).toBeVisible();
    await this.#page
      .locator(TextBoxLocators.dropDownClickLocator)
      .getByRole("option")
      .nth(2)
      .click();
    const selectedValue = this.#page.locator(
      TextBoxLocators.dropDownDisplayValueLocator,
    );
    await expect(selectedValue).toHaveText(testData.typeNameDropValueDisplay);
  }

  private async selectDateOfBirth(testData: TextBoxTestData) {
    await this.#page.locator(TextBoxLocators.calendariconLocator).click();
    await expect(
      this.#page.locator(TextBoxLocators.calendarPanelLocator),
    ).toBeVisible();
    while (true) {
      const currentYear = await this.#page
        .locator(TextBoxLocators.currentYearLocator)
        .textContent();

      if (currentYear !== testData.dobYear) {
        await this.#page.locator(TextBoxLocators.calendarLeftArrow).click();
        continue;
      }

      const currentMonth = await this.#page
        .locator(TextBoxLocators.currentMonthLocator)
        .textContent();

      if (currentMonth !== testData.monthInText) {
        await this.#page.locator(TextBoxLocators.calendarLeftArrow).click();
        continue;
      }

      await this.#page
        .locator(TextBoxLocators.calendarPanelLocator)
        .locator(TextBoxLocators.calendarDates)
        .filter({
          hasText: new RegExp(`^${testData.dobDate}$`),
        })
        .click();
      break;
    }
    const dataData = await this.#page
      .locator(TextBoxLocators.fullDateInput)
      .inputValue();
    expect(dataData).toBe(testData.fullDate);
  }

  private async checkSliding() {
    const sliderValue = this.#page.locator(TextBoxLocators.sliderLocator);
    await sliderValue.fill(TextBoxLocators.sliderValue);
    await sliderValue.press("Tab");
    let sliderWidth = await this.#page
      .locator(TextBoxLocators.sliderRangeWidth)
      .getAttribute(TextBoxLocators.sliderStyle);

    let sliderLeft = await this.#page
      .locator(TextBoxLocators.sliderLeft)
      .getAttribute(TextBoxLocators.sliderStyle);

    expect(sliderWidth).not.toContain(TextBoxLocators.sliderZeroPercentage);
    expect(sliderLeft).not.toContain(TextBoxLocators.sliderZeroPercentage);
  }

  private async oskHandling(testData: TextBoxTestData) {
    await this.#page.locator(TextBoxLocators.oskLocator).click();
    for (let char of testData.typeNameDropValue) {
      await this.#page
        .locator(TextBoxLocators.oskKeyPad, { hasText: char })
        .click();
    }
    await this.#page
      .locator(TextBoxLocators.oskKeypadClick, {
        hasText: TextBoxLocators.closeButton,
      })
      .click();
    const value = this.#page.locator(TextBoxLocators.oskInputValue);
    await expect(value).toHaveValue(testData.typeNameDropValue);
  }

  private async typeCustomToolBar(testData: TextBoxTestData) {
    const editor = this.#page
      .locator(TextBoxLocators.customToolBarEditor)
      .nth(1);
    await editor.pressSequentially(testData.customToolBarValue);
    await expect(editor.locator(TextBoxLocators.paragraphLocator)).toHaveText(
      testData.customToolBarValue,
    );
    await Methods.captureAndLog(
      this.#page,
      "Successfully completed the text box page.",
    );
  }

  private async typeNumberAndSpin() {
    const value = this.#page.locator(TextBoxLocators.typeNumberToSpinLocator);
    await value.clear();
    await value.pressSequentially(TextBoxLocators.typeNumberToSpin, {
      delay: 50,
    });
    await value.press("Tab");
    await expect(
      this.#page.locator(TextBoxLocators.spinningButton),
    ).toBeVisible();
    await expect(value).toHaveValue(TextBoxLocators.typeNumberToSpin);
    const beforeValue = Number(
      await value.getAttribute(TextBoxLocators.typedNumber),
    );
    await this.#page.locator(TextBoxLocators.upArrow).click();
    await expect(value).toHaveAttribute(
      TextBoxLocators.typedNumber,
      String(beforeValue + 1),
    );
  }
}
