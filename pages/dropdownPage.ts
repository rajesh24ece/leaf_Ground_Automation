import { Page } from "@playwright/test";
import { DropdownHelper } from "../helpers/dropdownHelper";
import { NavigationHelper } from "../helpers/navigationHelper";
import { DropdownTestData } from "../utils/testInterface";
import { DropdownLocators } from "../locators/dropdownLocators";
import { ClickHelper } from "../helpers/clickHelper";
import { Roles } from "../utils/constants";
import { AssertionHelper } from "../helpers/assertionHelper";
import { logger } from "../utils/logger";

export class DropdownPage {
  #page: Page;

  constructor(page: Page) {
    this.#page = page;
  }

  async landingDropdownPage() {
    await NavigationHelper.navigateToPage(this.#page, DropdownLocators.dropdownPage);
  }

  async selectCountry(testData: DropdownTestData) {
    await DropdownHelper.selectCustomnNthOption(this.#page.locator(DropdownLocators.countryLocator), this.#page.getByText(testData.india), undefined, 1);
    logger.info(`✅ Selected Country: "${testData.india}"`);
  }

  async selectTool(testData: DropdownTestData) {
    const toolDropdown = this.#page.locator(DropdownLocators.selectToolLocator);
    await DropdownHelper.selectByText(toolDropdown, testData.playwrightText);
    logger.info(`✅ Selected Tool: "${testData.playwrightText}"`);
    await AssertionHelper.assertValue(toolDropdown, testData.playwrightText);
  }

  async selectCity(testData: DropdownTestData) {
    await DropdownHelper.selectCustomnNthOption(this.#page.locator(DropdownLocators.cityLocator), this.#page.getByText(testData.chennai), undefined, 1);
    logger.info(`✅ Selected City: "${testData.chennai}"`);
  }

  async selectLanguage(testData: DropdownTestData) {
    await DropdownHelper.selectCustomnNthOption(this.#page.locator(DropdownLocators.languageLocator), this.#page.getByText(testData.tamil), undefined, 1);
    logger.info(`✅ Selected Language: "${testData.tamil}"`);
  }

  async selectCourse(testData: DropdownTestData) {
    for (const course of testData.courses) {
      await ClickHelper.clickByRole(this.#page, Roles.BUTTON, DropdownLocators.showOptions);
      await AssertionHelper.assertVisible(this.#page.locator(DropdownLocators.courseDropdownPanel));
      await this.#page.locator(`[class*="ui-autocomplete-item"][data-item-label="${course}"]`).click();
      await AssertionHelper.assertHidden(this.#page.locator(DropdownLocators.courseDropdownPanel));
    }
    logger.info(`✅ Selected Courses: "${testData.courses.join(", ")}"`);
    await AssertionHelper.assertTexts(this.#page.locator(DropdownLocators.dropDownDisplayValueLocator), testData.courses);
  }

  async selectTwo(testData: DropdownTestData) {
    await DropdownHelper.selectCustomnNthOption(this.#page.locator(DropdownLocators.languageValue), this.#page.getByText(testData.rendu), undefined, 1);
    logger.info(`✅ Selected Value: "${testData.rendu}"`);
  }
}
