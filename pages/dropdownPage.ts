import { expect, Page, test } from "@playwright/test";
import { Methods, DropdownTestData } from "../utils/methods";
import { DropDownLocators } from "../locators/dropDownLocators";

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
      this.option,
    );
  }

  async selectCity(testData: DropdownTestData) {
    await Methods.clickDropdownHandling(
      this.#page,
      DropDownLocators.cityLocator,
      testData.chennai,
      this.option,
    );
  }

  async selectCourse(testData: DropdownTestData) {
    for (const course of testData.courses) {
      await Methods.clickMatchingByRole(
        this.#page,
        DropDownLocators.showOptions,
        this.button,
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
      this.option,
    );
  }

  async selectTwo(testData: DropdownTestData) {
    await Methods.clickDropdownHandling(
      this.#page,
      DropDownLocators.languageValue,
      testData.rendu,
      this.option,
    );
  }
}
