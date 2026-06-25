import { expect, Page } from "@playwright/test";
import { Methods } from "../utils/methods";
import { DropdownTestData } from "../utils/test-data.interface";
import { DropdownLocators } from "../locators/dropdownLocators";
import { Roles } from "../utils/constants";

export class DropdownPage extends Methods {
  #page: Page;

  constructor(page: Page) {
    super();
    this.#page = page;
  }

  async landingDropdownPage() {
    await this.#page.goto(DropdownLocators.dropdownPage);
  }

  async selectTool(testData: DropdownTestData) {
    const toolDropdown = this.#page
      .locator(DropdownLocators.selectToolLocator)
      .first();
    await toolDropdown.selectOption({ label: testData.playwrightText });
    await expect(toolDropdown).toHaveValue(testData.playwrightText);
  }

  async selectCountry(testData: DropdownTestData) {
    await Methods.clickDropdownHandling(
      this.#page,
      DropdownLocators.countryLocator, // the country dropdown locator
      testData.india,
      Roles.OPTION,
    );
    await this.#page.waitForLoadState("networkidle", { timeout: 20000 });
  }

  async selectCity(testData: DropdownTestData) {
    await Methods.clickDropdownHandling(
      this.#page,
      DropdownLocators.cityLocator,
      testData.chennai,
      Roles.OPTION,
    );
  }

  async selectCourse(testData: DropdownTestData) {
    for (const course of testData.courses) {
      await Methods.clickMatchingByRole(
        this.#page,
        DropdownLocators.showOptions,
        Roles.BUTTON,
      );
      await expect(
        this.#page.locator(DropdownLocators.courseDropdownPanel),
      ).toBeVisible();
      await this.#page
        .locator(`[class*="ui-autocomplete-item"][data-item-label="${course}"]`)
        .click();
      await expect(
        this.#page.locator(DropdownLocators.courseDropdownPanel),
      ).toBeHidden();
    }

    await expect(
      this.#page.locator(DropdownLocators.dropDownDisplayValueLocator),
    ).toHaveText(testData.courses);
  }

  async selectLanguage(testData: DropdownTestData) {
    await Methods.clickDropdownHandling(
      this.#page,
      DropdownLocators.languageLocator,
      testData.tamil,
      Roles.OPTION,
    );
    await this.#page.waitForLoadState("networkidle", { timeout: 20000 });
  }

  async selectTwo(testData: DropdownTestData) {
    await Methods.clickDropdownHandling(
      this.#page,
      DropdownLocators.languageValue,
      testData.rendu,
      Roles.OPTION,
    );
  }
}
