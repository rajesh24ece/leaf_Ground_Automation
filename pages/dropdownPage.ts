import { Page, TestInfo } from "@playwright/test";
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
    await this.#page.locator(DropdownLocators.countryLocator).click();
    await this.#page.locator(`[id*=j_idt87:country]`).filter({ hasText: testData.india }).click();
    //await DropdownHelper.clickDropdownHandling(this.#page, DropdownLocators.countryLocator, testData.india, Roles.OPTION);
    logger.info(`✅ Selected Country: "${testData.india}"`);
  }

  async selectTool(testData: DropdownTestData) {
    const toolDropdown = this.#page.locator(DropdownLocators.selectToolLocator);
    await DropdownHelper.selectByText(toolDropdown, testData.playwrightText);
    logger.info(`✅ Selected Tool: "${testData.playwrightText}"`);
    await AssertionHelper.assertValue(toolDropdown, testData.playwrightText);
  }

  async selectCity(testData: DropdownTestData) {
    await AssertionHelper.assertVisible(this.#page.locator(DropdownLocators.cityLocator));
    await this.#page.locator(`[id*=j_idt87:city]`).filter({ hasText: testData.india }).click();
    //await DropdownHelper.clickDropdownHandling(this.#page, DropdownLocators.cityLocator, testData.chennai, Roles.OPTION);
    logger.info(`✅ Selected City: "${testData.chennai}"`);
  }

  async selectLanguage(testData: DropdownTestData) {
    await DropdownHelper.clickDropdownHandling(this.#page, DropdownLocators.languageLocator, testData.tamil, Roles.OPTION);
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
    await AssertionHelper.assertVisible(this.#page.locator(DropdownLocators.languageValue));
    await DropdownHelper.clickDropdownHandling(this.#page, DropdownLocators.languageValue, testData.rendu, Roles.OPTION);
    logger.info(`✅ Selected Value: "${testData.rendu}"`);
  }
}
