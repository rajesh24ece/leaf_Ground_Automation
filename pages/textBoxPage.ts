import { expect, Page, test } from "@playwright/test";
import { Methods, TextBoxTestData } from "../utils/methods";

export class TextBox extends Methods {
  #page: Page;

  constructor(page: Page) {
    super();
    this.#page = page;
  }

  async handlingTextBox() {
    let testData: TextBoxTestData;

    await test.step("Read test data from json file.", async () => {
      testData = await Methods.accessJsonData(this.textBoxJson);
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
    await this.#page.goto(this.textPage);
    await Methods.captureAndLog(
      this.#page,
      "Successfully landed in the text box page.",
    );
  }

  private async typeInTextBox(testData: TextBoxTestData) {
    const textbox = this.#page.getByPlaceholder(this.typeNamePlaceHolder);
    await textbox.fill(testData.typeNewName);
    console.log(
      `Typed the name "${testData.typeNewName}" in the text box field.`,
    );
    await expect(textbox).toHaveValue(testData.typeNewName);
  }

  private async appendText(testData: TextBoxTestData) {
    const input = this.#page.locator(this.appendTextLocator);
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
      .locator(this.isDisabledLocator)
      .isDisabled();
    console.log("Is the text box disabled?", isDisabled);
  }

  private async clearText() {
    let textField = this.#page.locator(this.clearTextLocator);
    await textField.fill("");
    await expect(textField).toHaveValue("");
  }

  private async typeMailIDPressTab(testData: TextBoxTestData) {
    const emailInput = this.#page.getByPlaceholder(this.mailIDLocator);
    await emailInput.fill(testData.mailID);
    console.log(`In the text field "${testData.mailID}" is typed correctly.`);
    await emailInput.press("Tab");
    console.log(`Pressed tab button.`);
    await expect(emailInput).toHaveValue(testData.mailID);
    const focusedField = this.#page.getByPlaceholder(this.aboutYouLocator);
    await expect(focusedField).toBeFocused();
  }

  private async aboutYourself(testData: TextBoxTestData) {
    const aboutYouInput = this.#page.getByPlaceholder(this.aboutYouLocator);
    await aboutYouInput.pressSequentially(testData.aboutYourselfText);
    console.log(
      `In the text field typed "${testData.aboutYourselfText}" this in the about yourself text field.`,
    );
    await expect(aboutYouInput).toHaveValue(testData.aboutYourselfText);
  }

  private async confirmErrorMessage(testData: TextBoxTestData) {
    const textFieldBox = this.#page.locator(this.errorMessageLocator);
    await textFieldBox.click();
    console.log(`Clicked inside the text box.`);
    await textFieldBox.press("Enter");
    const errorMessage = this.#page.locator(this.errorMessageTextLocator);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(testData.errorMessageText);
  }

  private async selectValueFromDropDown(testData: TextBoxTestData) {
    const drop = this.#page
      .locator(this.typeNameDrop)
      .and(this.#page.getByRole("application"));
    await drop.click();
    await drop.pressSequentially(testData.typeNameDropValue);
    await expect(this.#page.locator(this.dropDownClickLocator)).toBeVisible();
    await this.#page
      .locator(this.dropDownClickLocator)
      .getByRole("option")
      .nth(2)
      .click();
    const selectedValue = this.#page.locator(this.dropDownDisplayValueLocator);
    await expect(selectedValue).toHaveText(testData.typeNameDropValueDisplay);
  }

  private async selectDateOfBirth(testData: TextBoxTestData) {
    await this.#page.locator(this.calendariconLocator).click();
    await expect(this.#page.locator(this.calendarPanelLocator)).toBeVisible();
    while (true) {
      const currentYear = await this.#page
        .locator(this.currentYearLocator)
        .textContent();

      if (currentYear !== testData.dobYear) {
        await this.#page.locator(this.calendarLeftArrow).click();
        continue;
      }

      const currentMonth = await this.#page
        .locator(this.currentMonthLocator)
        .textContent();

      if (currentMonth !== testData.monthInText) {
        await this.#page.locator(this.calendarLeftArrow).click();
        continue;
      }

      await this.#page
        .locator(this.calendarPanelLocator)
        .locator(this.calendarDates)
        .filter({
          hasText: new RegExp(`^${testData.dobDate}$`),
        })
        .click();
      break;
    }
    const dataData = await this.#page.locator(this.fullDateInput).inputValue();
    expect(dataData).toBe(testData.fullDate);
  }

  private async checkSliding() {
    const sliderValue = this.#page.locator(this.sliderLocator);
    await sliderValue.fill(this.sliderValue);
    await sliderValue.press("Tab");
    let sliderWidth = await this.#page
      .locator(this.sliderRangeWidth)
      .getAttribute(this.sliderStyle);

    let sliderLeft = await this.#page
      .locator(this.sliderLeft)
      .getAttribute(this.sliderStyle);

    expect(sliderWidth).not.toContain(this.sliderZeroPercentage);
    expect(sliderLeft).not.toContain(this.sliderZeroPercentage);
  }

  private async oskHandling(testData: TextBoxTestData) {
    await this.#page.locator(this.oskLocator).click();
    for (let char of testData.typeNameDropValue) {
      await this.#page.locator(this.oskKeyPad, { hasText: char }).click();
    }
    await this.#page
      .locator(this.oskKeypadClick, { hasText: this.closeButton })
      .click();
    const value = this.#page.locator(this.oskInputValue);
    await expect(value).toHaveValue(testData.typeNameDropValue);
  }

  private async typeCustomToolBar(testData: TextBoxTestData) {
    const editor = this.#page.locator(this.customToolBarEditor).nth(1);
    await editor.pressSequentially(testData.customToolBarValue);
    await expect(editor.locator(this.paragraphLocator)).toHaveText(
      testData.customToolBarValue,
    );
    await Methods.captureAndLog(
      this.#page,
      "Successfully completed the text box page.",
    );
  }

  private async typeNumberAndSpin() {
    const value = this.#page.locator(this.typeNumberToSpinLocator);
    await value.clear();
    await value.pressSequentially(this.typeNumberToSpin, { delay: 50 });
    await value.press("Tab");
    await expect(
      this.#page.locator(
        ".ui-spinner-button.ui-spinner-up ui-corner-tr ui-button.ui-widget.ui-state-default.ui-button-text-only",
      ),
    ).toBeVisible();
    await expect(value).toHaveValue(this.typeNumberToSpin);
    const beforeValue = Number(await value.getAttribute(this.typedNumber));
    await this.#page.locator(this.upArrow).click();
    await expect(value).toHaveAttribute(
      this.typedNumber,
      String(beforeValue + 1),
    );
  }
}
