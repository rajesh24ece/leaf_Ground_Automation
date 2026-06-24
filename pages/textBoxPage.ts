import { expect, Page } from "@playwright/test";
import { TextBoxTestData } from "../utils/test-data.interface";
import { TextBoxLocators } from "../locators/textBoxLocators";

export class TextBoxPage {
  readonly #page: Page;

  constructor(page: Page) {
    this.#page = page;
  }

  async landingTextBoxPage() {
    await this.#page.goto(TextBoxLocators.textPage);
  }

  async typeInTextBox(testData: TextBoxTestData) {
    const textbox = this.#page.getByPlaceholder(
      TextBoxLocators.typeNamePlaceHolder,
    );
    await textbox.fill(testData.typeNewName);
    console.log(
      `Typed the name "${testData.typeNewName}" in the text box field.`,
    );
    await expect(textbox).toHaveValue(testData.typeNewName);
  }

  async appendText(testData: TextBoxTestData) {
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

  async isDisabled() {
    await expect(
      this.#page.locator(TextBoxLocators.isDisabledLocator),
    ).toBeDisabled();
  }

  async clearText() {
    let textField = this.#page.locator(TextBoxLocators.clearTextLocator);
    await textField.fill("");
    await expect(textField).toHaveValue("");
  }

  async typeMailIDPressTab(testData: TextBoxTestData) {
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

  async aboutYourself(testData: TextBoxTestData) {
    const aboutYouInput = this.#page.getByPlaceholder(
      TextBoxLocators.aboutYouLocator,
    );
    await aboutYouInput.pressSequentially(testData.aboutYourselfText);
    console.log(
      `In the text field typed "${testData.aboutYourselfText}" this in the about yourself text field.`,
    );
    await expect(aboutYouInput).toHaveValue(testData.aboutYourselfText);
  }

  async confirmErrorMessage(testData: TextBoxTestData) {
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

  async selectValueFromDropDown(testData: TextBoxTestData) {
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

  async selectDateOfBirth(testData: TextBoxTestData) {
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

  async checkSliding() {
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

  async oskHandling(testData: TextBoxTestData) {
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

  async typeCustomToolBar(testData: TextBoxTestData) {
    const editor = this.#page
      .locator(TextBoxLocators.customToolBarEditor)
      .nth(1);
    await editor.pressSequentially(testData.customToolBarValue);
    await expect(editor.locator(TextBoxLocators.paragraphLocator)).toHaveText(
      testData.customToolBarValue,
    );
  }

  async typeNumberAndSpin() {
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
