import { expect, Page, test } from "@playwright/test";
import { Methods } from "../utils/methods";

export class DropdownPage extends Methods {
  #page: Page;

  constructor(page: Page) {
    super();
    this.#page = page;
  }

  async handlingDropdown() {
    await test.step("Landed on dropdown Page.", async () => {
      await this.landingPage();
    });

    await test.step("Select favourite UI automation tool.", async () => {
      await this.selectTool();
    });

    await test.step("Selecting preferred country.", async () => {
      await this.selectCountry();
    });

    await test.step("Selecting Confirm Cities belongs to Country is loaded.", async () => {
      await this.selectCity();
    });

    await test.step("Selecting the Course.", async () => {
      await this.selectCourse();
    });

    await test.step("Selecting language randomly.", async () => {
      await this.selectLanguage();
    });

    await test.step("Selecting 'Two' irrespective of the language chosen.", async () => {
      await this.selectTwo();
    });
  }

  private async landingPage() {
    await this.#page.goto(this.dropdownPage);
    await Methods.captureAndLog(
      this.#page,
      "Successfully landed in the dropdown page.",
    );
  }

  private async selectTool() {
    const toolDropdown = this.#page.locator(this.selectToolLocator).first();
    await toolDropdown.selectOption({ label: this.playwrightText });
    await expect(toolDropdown).toHaveValue(this.playwrightText);
    await Methods.captureAndLog(
      this.#page,
      "Selected the UI automation tool from the dropdown.",
    );
  }

  private async selectCountry() {
    await Methods.clickDropdownHandling(
      this.#page,
      this.countryLocator,
      this.india,
      this.option,
    );
    await Methods.captureAndLog(
      this.#page,
      "Selected the country from the list.",
    );
  }

  private async selectCity() {
    await Methods.clickDropdownHandling(
      this.#page,
      this.cityLocator,
      this.chennai,
      this.option,
    );
    await Methods.captureAndLog(
      this.#page,
      "Selected the city from the dropdown.",
    );
  }

  private async selectCourse() {
    await Methods.clickMatchingByRole(
      this.#page,
      this.showOptions,
      this.button,
    );
    await this.#page
      .getByRole(this.option, { name: this.playwrightText })
      .nth(1)
      .click();
    await Methods.clickMatchingByRole(
      this.#page,
      this.showOptions,
      this.button,
    );
    await Methods.clickMatchingByRole(this.#page, this.aws, this.option);
    await expect(
      this.#page.locator(this.dropDownDisplayValueLocator).nth(0),
    ).toHaveText(this.playwrightText);
    await expect(
      this.#page.locator(this.dropDownDisplayValueLocator).nth(1),
    ).toHaveText(this.aws);
  }

  private async selectLanguage() {
    await Methods.clickDropdownHandling(
      this.#page,
      this.languageLocator,
      this.tamil,
      this.option,
    );
    await Methods.captureAndLog(
      this.#page,
      "Selected the language from the dropdown list.",
    );
  }

  private async selectTwo() {
    await Methods.clickDropdownHandling(
      this.#page,
      this.languageValue,
      this.rendu,
      this.option,
    );
    await Methods.captureAndLog(
      this.#page,
      "Selected the two for the selected respective language.",
    );
  }
}
