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
    // Wait for the AJAX response that populates city dropdown
    const [response] = await Promise.all([
      this.#page.waitForResponse(
        (res) => res.url().includes("city") || res.status() === 200,
        { timeout: 15000 },
      ),
      Methods.clickDropdownHandling(
        this.#page,
        DropdownLocators.countryLocator,
        testData.country,
        Roles.OPTION,
      ),
    ]);
  }

  async selectCity(testData: DropdownTestData) {
    // Give city dropdown time to populate after AJAX
    await this.#page.waitForFunction(
      (locator) => {
        const el = document.querySelector(locator);
        return el && el.textContent?.trim() !== "Select City";
      },
      "#j_idt87\\:city_label",
      { timeout: 15000 },
    );

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
