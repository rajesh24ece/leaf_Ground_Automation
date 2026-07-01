import { expect, Page } from "@playwright/test";
import { TextBoxTestData } from "../utils/Test-data.interface";
import { TextBoxLocators } from "../locators/TextBoxLocators";
import { NavigationHelper } from "../helpers/NavigationHelper";
import { AssertionHelper } from "../helpers/AssertionHelper";
import { InputHelper } from "../helpers/InputHelper";
import { ClickHelper } from "../helpers/ClickHelper";

export class TextBoxPage {
  readonly #page: Page;

  constructor(page: Page) {
    this.#page = page;
  }

  async landingTextBoxPage() {
    await NavigationHelper.navigateToPage(this.#page, TextBoxLocators.textPage);
  }

  async typeInTextBox(testData: TextBoxTestData) {
    const textbox = this.#page.getByPlaceholder(TextBoxLocators.typeNamePlaceHolder);
    await InputHelper.fill(textbox, testData.typeNewName);
    await AssertionHelper.assertValue(textbox, testData.typeNewName);
  }

  async appendText(testData: TextBoxTestData) {
    const input = this.#page.locator(TextBoxLocators.appendTextLocator);
    await ClickHelper.click(input);
    await input.press("Control+End");
    await input.press("Space");
    await InputHelper.pressSequentially(input, testData.appendCountry);
    const result = "Chennai" + " " + testData.appendCountry.trim();
    await AssertionHelper.assertValue(input, result);
  }

  async isDisabled() {
    await AssertionHelper.assertDisabled(this.#page.locator(TextBoxLocators.isDisabledLocator));
  }

  async clearText() {
    const textField = this.#page.locator(TextBoxLocators.clearTextLocator);
    await InputHelper.fill(textField, "");
    await AssertionHelper.assertValue(textField, "");
  }

  async typeMailIDPressTab(testData: TextBoxTestData) {
    const emailInput = this.#page.getByPlaceholder(TextBoxLocators.mailIDLocator);
    await InputHelper.fill(emailInput, testData.mailID);
    await emailInput.press("Tab");
    await AssertionHelper.assertValue(emailInput, testData.mailID);
    const focusedField = this.#page.getByPlaceholder(TextBoxLocators.aboutYouLocator);
    await AssertionHelper.assertFocused(focusedField);
  }

  async aboutYourself(testData: TextBoxTestData) {
    const aboutYouInput = this.#page.getByPlaceholder(TextBoxLocators.aboutYouLocator);
    await InputHelper.pressSequentially(aboutYouInput, testData.aboutYourselfText);
    await AssertionHelper.assertValue(aboutYouInput, testData.aboutYourselfText);
  }

  async confirmErrorMessage(testData: TextBoxTestData) {
    const textFieldBox = this.#page.locator(TextBoxLocators.errorMessageLocator);
    await ClickHelper.click(textFieldBox);
    await textFieldBox.press("Enter");
    const errorMessage = this.#page.locator(TextBoxLocators.errorMessageTextLocator);
    await AssertionHelper.assertVisible(errorMessage);
    await AssertionHelper.assertText(errorMessage, testData.errorMessageText);
  }

  async selectValueFromDropDown(testData: TextBoxTestData) {
    const drop = this.#page.locator(TextBoxLocators.typeNameDrop).and(this.#page.getByRole("application"));
    await ClickHelper.click(drop);
    await InputHelper.pressSequentially(drop, testData.typeNameDropValue);
    await AssertionHelper.assertVisible(this.#page.locator(TextBoxLocators.dropDownClickLocator));
    await ClickHelper.clickNth(this.#page.locator(TextBoxLocators.dropDownClickLocatorList), 2);
    const selectedValue = this.#page.locator(TextBoxLocators.dropDownDisplayValueLocator);
    await AssertionHelper.assertText(selectedValue, testData.typeNameDropValueDisplay);
  }

  async selectDateOfBirth(testData: TextBoxTestData) {
    await ClickHelper.click(this.#page.locator(TextBoxLocators.calendariconLocator));
    await AssertionHelper.assertVisible(this.#page.locator(TextBoxLocators.calendarPanelLocator));
    while (true) {
      const currentYear = await this.#page.locator(TextBoxLocators.currentYearLocator).textContent();
      if (currentYear !== testData.dobYear) {
        await ClickHelper.click(this.#page.locator(TextBoxLocators.calendarLeftArrow));
        continue;
      }
      const currentMonth = await this.#page.locator(TextBoxLocators.currentMonthLocator).textContent();
      if (currentMonth !== testData.monthInText) {
        await ClickHelper.click(this.#page.locator(TextBoxLocators.calendarLeftArrow));
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
    const dataData = await this.#page.locator(TextBoxLocators.fullDateInput).inputValue();
    expect(dataData).toBe(testData.fullDate);
  }

  async checkSliding() {
    const sliderValue = this.#page.locator(TextBoxLocators.sliderLocator);
    await sliderValue.fill(TextBoxLocators.sliderValue);
    await sliderValue.press("Tab");
    const sliderWidth = await this.#page.locator(TextBoxLocators.sliderRangeWidth).getAttribute(TextBoxLocators.sliderStyle);

    const sliderLeft = await this.#page.locator(TextBoxLocators.sliderLeft).getAttribute(TextBoxLocators.sliderStyle);

    expect(sliderWidth).not.toContain(TextBoxLocators.sliderZeroPercentage);
    expect(sliderLeft).not.toContain(TextBoxLocators.sliderZeroPercentage);
  }

  async oskHandling(testData: TextBoxTestData) {
    await ClickHelper.click(this.#page.locator(TextBoxLocators.oskLocator));
    for (let char of testData.typeNameDropValue) {
      await ClickHelper.clickByText(this.#page.locator(TextBoxLocators.oskKeyPad), char);
    }
    await ClickHelper.clickByText(this.#page.locator(TextBoxLocators.oskKeypadClick), TextBoxLocators.closeButton);
    const value = this.#page.locator(TextBoxLocators.oskInputValue);
    await AssertionHelper.assertValue(value, testData.typeNameDropValue);
  }

  async typeCustomToolBar(testData: TextBoxTestData) {
    const editor = this.#page.locator(TextBoxLocators.customToolBarEditor).nth(1);
    await InputHelper.pressSequentially(editor, testData.customToolBarValue);
    await AssertionHelper.assertText(editor.locator(TextBoxLocators.paragraphLocator), testData.customToolBarValue);
  }

  async typeNumberAndSpin() {
    const value = this.#page.locator(TextBoxLocators.typeNumberToSpinLocator);
    await value.clear();
    await InputHelper.pressSequentially(value, TextBoxLocators.typeNumberToSpin, 50);
    await value.press("Tab");
    await AssertionHelper.assertVisible(this.#page.locator(TextBoxLocators.spinningButton));
    await AssertionHelper.assertValue(value, TextBoxLocators.typeNumberToSpin);
    const beforeValue = Number(await value.getAttribute(TextBoxLocators.typedNumber));
    await ClickHelper.click(this.#page.locator(TextBoxLocators.upArrow));
    await AssertionHelper.assertAttribute(value, TextBoxLocators.typedNumber, String(beforeValue + 1));
  }
}
