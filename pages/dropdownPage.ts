import { expect, Page, test } from "@playwright/test";
import { Methods, DropdownTestData } from "../utils/methods";

export class DropdownPage extends Methods {
  #page: Page;

  constructor(page: Page) {
    super();
    this.#page = page;
  }

  async handlingDropdown() {
    let testData: DropdownTestData;

    await test.step("Read test data from json file.", async () => {
      testData = await Methods.accessJsonData(this.dropdownJson);
    });

    await test.step("Landed on dropdown Page.", async () => {
      await this.landingPage();
    });

    await test.step("Select favourite UI automation tool.", async () => {
      await this.selectTool(testData);
    });

    await test.step("Selecting preferred country.", async () => {
      await this.selectCountry(testData);
    });

    await test.step("Selecting Confirm Cities belongs to Country is loaded.", async () => {
      await this.selectCity(testData);
    });

    await test.step("Selecting the Course.", async () => {
      await this.selectCourse(testData);
    });

    await test.step("Selecting language randomly.", async () => {
      await this.selectLanguage(testData);
    });

    await test.step("Selecting 'Two' irrespective of the language chosen.", async () => {
      await this.selectTwo(testData);
    });
  }

  private async landingPage() {
    await this.#page.goto(this.dropdownPage);
    await Methods.captureAndLog(
      this.#page,
      "Successfully landed in the dropdown page.",
    );
  }

  private async selectTool(testData: DropdownTestData) {
    const toolDropdown = this.#page.locator(this.selectToolLocator).first();
    await toolDropdown.selectOption({ label: testData.playwrightText });
    await expect(toolDropdown).toHaveValue(testData.playwrightText);
    await Methods.captureAndLog(
      this.#page,
      "Selected the UI automation tool from the dropdown.",
    );
  }

  private async selectCountry(testData: DropdownTestData) {
    await Methods.clickDropdownHandling(
      this.#page,
      this.countryLocator,
      testData.india,
      this.option,
    );
    await Methods.captureAndLog(
      this.#page,
      "Selected the country from the list.",
    );
  }

  private async selectCity(testData: DropdownTestData) {
    await Methods.clickDropdownHandling(
      this.#page,
      this.cityLocator,
      testData.chennai,
      this.option,
    );
    await Methods.captureAndLog(
      this.#page,
      "Selected the city from the dropdown.",
    );
  }

  private async selectCourse(testData: DropdownTestData) {
    for (const course of testData.courses) {
      await Methods.clickMatchingByRole(
        this.#page,
        this.showOptions,
        this.button,
      );
      await expect(this.#page.locator(this.courseDropdownPanel)).toBeVisible();
      await this.#page
        .locator(`[class*="ui-autocomplete-item"][data-item-label="${course}"]`)
        .click();
      await expect(this.#page.locator(this.courseDropdownPanel)).toBeHidden();
    }

    await expect(
      this.#page.locator(this.dropDownDisplayValueLocator),
    ).toHaveText(testData.courses);
  }

  private async selectLanguage(testData: DropdownTestData) {
    await Methods.clickDropdownHandling(
      this.#page,
      this.languageLocator,
      testData.tamil,
      this.option,
    );
    await Methods.captureAndLog(
      this.#page,
      "Selected the language from the dropdown list.",
    );
  }

  private async selectTwo(testData: DropdownTestData) {
    await Methods.clickDropdownHandling(
      this.#page,
      this.languageValue,
      testData.rendu,
      this.option,
    );
    await Methods.captureAndLog(
      this.#page,
      "Selected the two for the selected respective language.",
    );
  }
}
