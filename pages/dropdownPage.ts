import { expect, Page, test } from "@playwright/test";
import { Methods } from "../utils/methods";
import { DropdownTestData } from "../utils/test-data.interface";
import { DropDownLocators } from "../locators/dropDownLocators";
import { Roles } from "../utils/constants";

export class DropdownPage extends Methods {
  #page: Page;

  constructor(page: Page) {
    super();
    this.#page = page;
  }

  async landingDropdownPage() {
    await this.#page.goto(DropDownLocators.dropdownPage);
  }

  async selectTool(testData: DropdownTestData) {
    const toolDropdown = this.#page
      .locator(DropDownLocators.selectToolLocator)
      .first();
    await toolDropdown.selectOption({ label: testData.playwrightText });
    await expect(toolDropdown).toHaveValue(testData.playwrightText);
  }

  async selectCountry(testData: DropdownTestData) {
    await Methods.clickDropdownHandling(
      this.#page,
      DropDownLocators.countryLocator,
      testData.india,
      Roles.OPTION,
    );
  }

  async selectCity(testData: DropdownTestData) {
    await Methods.clickDropdownHandling(
      this.#page,
      DropDownLocators.cityLocator,
      testData.chennai,
      Roles.OPTION,
    );
  }

  async selectCourse(testData: DropdownTestData) {
    for (const course of testData.courses) {
      await Methods.clickMatchingByRole(
        this.#page,
        DropDownLocators.showOptions,
        Roles.BUTTON,
      );
      await expect(
        this.#page.locator(DropDownLocators.courseDropdownPanel),
      ).toBeVisible();
      await this.#page
        .locator(`[class*="ui-autocomplete-item"][data-item-label="${course}"]`)
        .click();
      await expect(
        this.#page.locator(DropDownLocators.courseDropdownPanel),
      ).toBeHidden();
    }

    await expect(
      this.#page.locator(DropDownLocators.dropDownDisplayValueLocator),
    ).toHaveText(testData.courses);
  }

  async selectLanguage(testData: DropdownTestData) {
    await Methods.clickDropdownHandling(
      this.#page,
      DropDownLocators.languageLocator,
      testData.tamil,
      Roles.OPTION,
    );
  }

  async selectTwo(testData: DropdownTestData) {
    await Methods.clickDropdownHandling(
      this.#page,
      DropDownLocators.languageValue,
      testData.rendu,
      Roles.OPTION,
    );
  }
}
