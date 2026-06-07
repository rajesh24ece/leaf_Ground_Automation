import { expect, Page } from "playwright/test";
import { Locators } from "../utils/locators";
import { Methods } from "../utils/methods";

export class TextBox extends Locators {
  #page: Page;

  constructor(page: Page) {
    super();
    this.#page = page;
  }

  async handlingTextBox() {
    await this.landingTextBoxPage();
    await this.typeInTextBox();
    await this.appendText();
    await this.isDisabled();
    await this.clearText();
    await this.typeMailIDPressTab();
    await this.aboutYourself();
    await this.confirmErrorMessage();
    await this.selectValueFromDropDown();
    await this.selectDateOfBirth();
    //await this.checkSliding();
    await this.oskHandling();
    await this.typeCustomToolBar();
  }

  private async landingTextBoxPage() {
    await this.#page.goto(this.textPage);
    await Methods.captureAndLog(
      this.#page,
      "Successfully landed in the text box page.",
    );
  }

  private async typeInTextBox() {
    const textbox = this.#page.getByPlaceholder(this.typeName);
    await textbox.fill(this.typeNewName);
    console.log(`Typed the name "${this.typeNewName}" in the text box field.`);
    await expect(textbox).toHaveValue(this.typeNewName);
  }

  private async appendText() {
    const input = this.#page.locator(this.appendTextLocator);
    await input.click();
    await input.press("Control+End");
    await input.press("Space");
    await input.pressSequentially(this.appendCountry);
    console.log(
      `Appended the country "${this.appendCountry}" in the text box field.`,
    );
    const result = "Chennai" + " " + this.appendCountry.trim();
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

  private async typeMailIDPressTab() {
    const emailInput = this.#page.getByPlaceholder(this.mailIDLocator);
    await emailInput.fill(this.mailID);
    console.log(`In the text field "${this.mailID}" is typed correctly.`);
    await emailInput.press("Tab");
    console.log(`Pressed tab button.`);
    await expect(emailInput).toHaveValue(this.mailID);
    const focusedField = this.#page.getByPlaceholder(this.aboutYouLocator);
    await expect(focusedField).toBeFocused();
  }

  private async aboutYourself() {
    const aboutYouInput = this.#page.getByPlaceholder(this.aboutYouLocator);
    await aboutYouInput.pressSequentially(this.aboutYourselfText);
    console.log(
      `In the text field typed "${this.aboutYourselfText}" this in the about yourself text field.`,
    );
    await expect(aboutYouInput).toHaveValue(this.aboutYourselfText);
  }

  private async confirmErrorMessage() {
    const textFieldBox = this.#page.locator(this.errorMessageLocator);
    await textFieldBox.click();
    console.log(`Clicked inside the text box.`);
    await textFieldBox.press("Enter");
    console.log(
      `Pressed enter button to get the error message "${await this.#page.locator("#j_idt106:thisform\\:j_idt110_error-detail").textContent()}".`,
    );
    await expect(this.#page.getByText(this.errorMessageText)).toBeVisible();
  }

  private async selectValueFromDropDown() {
    const drop = this.#page
      .locator(this.typeNameDrop)
      .and(this.#page.getByRole("application"));
    await drop.click();
    await drop.pressSequentially(this.typeNameDropValue);
    await expect(this.#page.locator(this.dropDownClickLocator)).toBeVisible();
    await this.#page
      .locator(this.dropDownClickLocator)
      .getByRole("option")
      .nth(2)
      .click();
    const selectedValue = this.#page.locator(this.dropDownDisplayValueLocator);
    await expect(selectedValue).toHaveText(this.typeNameDropValueDisplay);
  }

  private async selectDateOfBirth() {
    await this.#page.locator(this.calendariconLocator).click();
    await expect(this.#page.locator(this.calendarPanelLocator)).toBeVisible();
    while (true) {
      const currentYear = await this.#page
        .locator(this.currentYearLocator)
        .textContent();

      if (currentYear !== this.dobYear) {
        await this.#page.locator(this.calendarLeftArrow).click();
        continue;
      }

      const currentMonth = await this.#page
        .locator(this.currentMonthLocator)
        .textContent();

      if (currentMonth !== this.monthInText) {
        await this.#page.locator(this.calendarLeftArrow).click();
        continue;
      }

      await this.#page
        .locator(this.calendarPanelLocator)
        .locator(this.calendarDates)
        .filter({
          hasText: new RegExp(`^${this.dobDate}$`),
        })
        .click();
      break;
    }
    const dataData = await this.#page.locator(this.fullDateInput).inputValue();
    expect(dataData).toBe(this.fullDate);
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

  private async oskHandling() {
    await this.#page.locator(this.oskLocator).click();
    for (let char of this.oskInput) {
      await this.#page.locator(this.oskKeyPad, { hasText: char }).click();
    }
    await this.#page
      .locator(this.oskKeypadClick, { hasText: this.closeButton })
      .click();
    const value = this.#page.locator(this.oskInputValue);
    await expect(value).toHaveValue(this.oskInput);
  }

  private async typeCustomToolBar() {
    const editor = this.#page.locator(this.customToolBarEditor).nth(1);
    await editor.pressSequentially(this.customToolBarValue);
    await expect(editor.locator(this.paragraphLocator)).toHaveText(
      this.customToolBarValue,
    );
    await Methods.captureAndLog(
      this.#page,
      "Successfully completed the text box page.",
    );
  }
}
