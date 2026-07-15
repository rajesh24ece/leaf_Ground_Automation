import { expect, Page } from "@playwright/test";
import { TextBoxTestData } from "../utils/testInterface";
import { TextBoxLocators } from "../locators/textBoxLocators";
import { NavigationHelper } from "../helpers/navigationHelper";
import { AssertionHelper } from "../helpers/assertionHelper";
import { InputHelper } from "../helpers/inputHelper";
import { ClickHelper } from "../helpers/clickHelper";
import { DataGenerator } from "../helpers/dataGenerator";
import { logger } from "../utils/logger";

export class TextBoxPage {
  readonly #page: Page;

  constructor(page: Page) {
    this.#page = page;
  }

  async landingTextBoxPage() {
    await NavigationHelper.navigateToPage(this.#page, TextBoxLocators.textPage);
  }

  async typeInTextBox() {
    const textbox = this.#page.getByPlaceholder(TextBoxLocators.typeNamePlaceHolder);
    const firstName = DataGenerator.firstName();
    await InputHelper.fill(textbox, firstName);
    logger.info(`First Name: ${firstName}`);
    await AssertionHelper.assertValue(textbox, firstName);
  }

  async appendText() {
    const input = this.#page.locator(TextBoxLocators.appendTextLocator);
    await ClickHelper.click(input);
    await input.press("Control+End");
    await input.press("Space");
    const countryName = DataGenerator.countryName();
    await InputHelper.pressSequentially(input, countryName);
    logger.info(`Country: ${countryName}`);
    const result = "Chennai" + " " + countryName.trim();
    await AssertionHelper.assertValue(input, result);
  }

  async isDisabled() {
    await AssertionHelper.assertDisabled(this.#page.locator(TextBoxLocators.isDisabledLocator));
    logger.info("Verfied text box is disabled");
  }

  async clearText() {
    const textField = this.#page.locator(TextBoxLocators.clearTextLocator);
    await InputHelper.fill(textField, "");
    await AssertionHelper.assertValue(textField, "");
  }

  async typeMailIDPressTab() {
    const emailInput = this.#page.getByPlaceholder(TextBoxLocators.mailIDLocator);
    const emailID = DataGenerator.emailID();
    await InputHelper.fill(emailInput, emailID);
    logger.info(`EmailID: ${emailID}`);
    await emailInput.press("Tab");
    logger.info(`Pressed tab button`);
    await AssertionHelper.assertValue(emailInput, emailID);
    const focusedField = this.#page.getByPlaceholder(TextBoxLocators.aboutYouLocator);
    await AssertionHelper.assertFocused(focusedField);
  }

  async aboutYourself() {
    const aboutYouInput = this.#page.getByPlaceholder(TextBoxLocators.aboutYouLocator);
    const pragraph = DataGenerator.pragraph();
    logger.info(`About Yourself: ${pragraph}`);
    await InputHelper.pressSequentially(aboutYouInput, pragraph);
    await AssertionHelper.assertValue(aboutYouInput, pragraph);
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

    const MAX_NAVIGATION_ATTEMPTS = 1200; // up to 100 years back, 12 clicks/year — generous safety net, not a real limit
    let dateSelected = false;

    for (let attempt = 0; attempt < MAX_NAVIGATION_ATTEMPTS; attempt++) {
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
      dateSelected = true;
      break;
    }

    if (!dateSelected) {
      throw new Error(
        `Could not locate ${testData.monthInText} ${testData.dobYear} in the calendar after ${MAX_NAVIGATION_ATTEMPTS} navigation attempts. Check that the calendar's left-arrow locator and testData.dobYear/monthInText values are correct.`,
      );
    }

    const dataData = await this.#page.locator(TextBoxLocators.fullDateInput).inputValue();
    expect(dataData).toBe(testData.fullDate);
  }

  async checkSlidingByNumber() {
    const sliderValue = this.#page.locator(TextBoxLocators.sliderLocator);
    await InputHelper.pressSequentially(sliderValue, TextBoxLocators.sliderValue, 100);
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

  async typeCustomToolBar() {
    const editor = this.#page.locator(TextBoxLocators.customToolBarEditor).nth(1);
    const pragraph = DataGenerator.pragraph();
    await InputHelper.pressSequentially(editor, pragraph);
    logger.info(`Type Custom ToolBar: ${pragraph}`);
    await AssertionHelper.assertText(editor.locator(TextBoxLocators.paragraphLocator), pragraph);
  }

  async typeNumberAndSpin() {
    const value = this.#page.locator(TextBoxLocators.typeNumberToSpinLocator);
    await value.clear();
    const arrows = this.#page.locator(TextBoxLocators.arrowClick);
    await InputHelper.pressSequentially(value, TextBoxLocators.typeNumberToSpin, 50);
    await ClickHelper.clickNth(arrows, 2);
    const incremental = Number(TextBoxLocators.typeNumberToSpin) + 1;
    const incrementalValue = String(incremental);
    await AssertionHelper.assertValue(value, incrementalValue);
    await ClickHelper.clickNth(arrows, 3);
    await AssertionHelper.assertValue(value, TextBoxLocators.typeNumberToSpin);
  }
}
