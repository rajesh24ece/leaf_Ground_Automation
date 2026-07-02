import { Page } from "@playwright/test";
import { DropdownHelper } from "../helpers/DropdownHelper";
import { NavigationHelper } from "../helpers/NavigationHelper";
import { DropdownTestData } from "../utils/test-data.interface";
import { DropdownLocators } from "../locators/DropdownLocators";
import { ClickHelper } from "../helpers/ClickHelper";
import { Roles } from "../utils/constants";
import { AssertionHelper } from "../helpers/AssertionHelper";

export class DropdownPage {
  #page: Page;

  constructor(page: Page) {
    this.#page = page;
  }

  async landingDropdownPage() {
    await NavigationHelper.navigateToPage(this.#page, DropdownLocators.dropdownPage);
  }

  async selectCountry(testData: DropdownTestData) {
    await DropdownHelper.clickDropdownHandling(this.#page, DropdownLocators.countryLocator, testData.india, Roles.OPTION);
  }

  async selectTool(testData: DropdownTestData) {
    const toolDropdown = this.#page.locator(DropdownLocators.selectToolLocator);
    await DropdownHelper.selectByText(toolDropdown, testData.playwrightText);
    await AssertionHelper.assertValue(toolDropdown, testData.playwrightText);
  }

  async selectCity(testData: DropdownTestData) {
    await AssertionHelper.assertVisible(this.#page.locator(DropdownLocators.cityLocator));
    await DropdownHelper.clickDropdownHandling(this.#page, DropdownLocators.cityLocator, testData.chennai, Roles.OPTION);
  }

  async selectLanguage(testData: DropdownTestData) {
    await DropdownHelper.clickDropdownHandling(this.#page, DropdownLocators.languageLocator, testData.tamil, Roles.OPTION);
  }

  async selectCourse(testData: DropdownTestData) {
    for (const course of testData.courses) {
      await ClickHelper.clickByRole(this.#page, Roles.BUTTON, DropdownLocators.showOptions);
      await AssertionHelper.assertVisible(this.#page.locator(DropdownLocators.courseDropdownPanel));
      await this.#page.locator(`[class*="ui-autocomplete-item"][data-item-label="${course}"]`).click();
      await AssertionHelper.assertHidden(this.#page.locator(DropdownLocators.courseDropdownPanel));
    }
    await AssertionHelper.assertTexts(this.#page.locator(DropdownLocators.dropDownDisplayValueLocator), testData.courses);
  }

  async selectTwo(testData: DropdownTestData) {
    await AssertionHelper.assertVisible(this.#page.locator(DropdownLocators.languageValue));
    await DropdownHelper.clickDropdownHandling(this.#page, DropdownLocators.languageValue, testData.rendu, Roles.OPTION);
  }
}
