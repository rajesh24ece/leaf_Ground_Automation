import { Page } from "@playwright/test";
import { DropdownHelper } from "../helpers/dropdownHelper";
import { NavigationHelper } from "../helpers/navigationHelper";
import { DropdownTestData } from "../utils/testInterface";
import { DropdownLocators } from "../locators/dropdownLocators";
import { ClickHelper } from "../helpers/clickHelper";
import { Roles } from "../utils/constants";
import { AssertionHelper } from "../helpers/assertionHelper";
import { logger } from "../utils/logger";
import { DataGenerator } from "../helpers/dataGenerator";

export class DropdownPage {
  #page: Page;

  constructor(page: Page) {
    this.#page = page;
  }

  async landingDropdownPage() {
    await NavigationHelper.navigateToPage(this.#page, DropdownLocators.dropdownPage);
  }

  async selectCountry(testData: DropdownTestData): Promise<string> {
    const selectedCountry = DataGenerator.randomItem(testData.country);
    await DropdownHelper.selectCustomnNthOption(this.#page.locator(DropdownLocators.countryLocator), this.#page.getByText(selectedCountry), undefined, 1);
    logger.info(`✅ Selected Country: ${selectedCountry}`);
    return selectedCountry;
  }

  async selectTool(testData: DropdownTestData) {
    const selectedTool = DataGenerator.randomItem(testData.tool);
    const toolDropdown = this.#page.locator(DropdownLocators.selectToolLocator);
    await DropdownHelper.selectByText(toolDropdown, selectedTool);
    logger.info(`✅ Selected Tool: ${selectedTool}`);
    await AssertionHelper.assertValue(toolDropdown, selectedTool);
  }

  async selectCity(testData: DropdownTestData, selectedCountry: string) {
    const cities = testData.city[selectedCountry];
    const selectedCity = DataGenerator.randomItem(cities);
    await DropdownHelper.selectCustomnNthOption(this.#page.locator(DropdownLocators.cityLocator), this.#page.getByText(selectedCity), undefined, 1);
    logger.info(`✅ Selected City: ${selectedCity}`);
  }

  async selectLanguage(testData: DropdownTestData): Promise<string> {
    const selectedlanguage = DataGenerator.randomItem(testData.langauge);
    await DropdownHelper.selectCustomnNthOption(this.#page.locator(DropdownLocators.languageLocator), this.#page.getByText(selectedlanguage), undefined, 1);
    logger.info(`✅ Selected Language: ${selectedlanguage}`);
    return selectedlanguage;
  }

  async selectCourse(testData: DropdownTestData): Promise<void> {
    const selectedCourses = DataGenerator.randomItems(testData.courses, 2);

    for (const course of selectedCourses) {
      await ClickHelper.clickByRole(this.#page, Roles.BUTTON, DropdownLocators.showOptions);
      await AssertionHelper.assertVisible(this.#page.locator(DropdownLocators.courseDropdownPanel));
      await this.#page.locator(`[class*="ui-autocomplete-item"][data-item-label="${course}"]`).click();
      await AssertionHelper.assertHidden(this.#page.locator(DropdownLocators.courseDropdownPanel));
    }
    logger.info(`✅ Selected Courses: ${selectedCourses.join(", ")}`);
    await AssertionHelper.assertTexts(this.#page.locator(DropdownLocators.dropDownDisplayValueLocator), selectedCourses);
  }

  async selectTwo(testData: DropdownTestData, selectedlanguage: string) {
    const twos = testData.twos[selectedlanguage];
    const selectedtwos = DataGenerator.randomItem(twos);
    await DropdownHelper.selectCustomnNthOption(this.#page.locator(DropdownLocators.languageValue), this.#page.getByText(selectedtwos), undefined, 1);
    logger.info(`✅ Selected Value: ${selectedtwos}`);
  }
}
