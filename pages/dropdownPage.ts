import { expect, Page } from "@playwright/test";
import { Locators } from "../utils/locators";

export class DropdownPage extends Locators {
  #page;

  constructor(page: Page) {
    super();
    this.#page = page;
  }

  async handlingDropdown() {
    await this.landingPage();
    await this.selectTool();
    await this.selectCountry();
    await this.selectCity();
    await this.selectCourse();
    await this.selectLanguage();
    await this.selectTwo();
  }

  private async landingPage() {
    await this.#page.goto(this.dropdownPage);
  }

  private async selectTool() {
    const toolDropdown = this.#page.locator("select.ui-selectonemenu").first();
    await toolDropdown.selectOption({ label: "Playwright" });
    await expect(toolDropdown).toHaveValue("Playwright");
  }

  private async selectCountry() {
    const countryDropdown = this.#page.locator("#j_idt87\\:country_label");
    await countryDropdown.click();
    await this.#page.getByRole("option", { name: "India" }).click();
    await expect(countryDropdown).toHaveText("India");
  }

  private async selectCity() {
    const cityDropdown = this.#page.locator("#j_idt87\\:city_label");
    await cityDropdown.click();
    await this.#page.getByRole("option", { name: "Chennai" }).click();
    await expect(cityDropdown).toHaveText("Chennai");
  }

  private async selectCourse() {
    await this.#page.getByRole("button", { name: "Show Options" }).click();
    await this.#page.getByRole("option", { name: "Playwright" }).nth(1).click();

    await this.#page.getByRole("button", { name: "Show Options" }).click();
    await this.#page.getByRole("option", { name: "AWS" }).click();

    await expect(
      this.#page.locator(".ui-autocomplete-token-label").nth(0),
    ).toHaveText("Playwright");
    await expect(
      this.#page.locator(".ui-autocomplete-token-label").nth(1),
    ).toHaveText("AWS");
  }

  private async selectLanguage() {
    const language = this.#page.locator("#j_idt87\\:lang_label");
    await language.click();
    await this.#page.getByRole("option", { name: "Tamil" }).click();
    await expect(language).toHaveText("Tamil");
  }

  private async selectTwo() {
    const twoDropdown = this.#page.locator("#j_idt87\\:value_label");
    await twoDropdown.click();
    await this.#page.getByRole("option", { name: "இரண்டு" }).click();
    await expect(this.#page.locator("#j_idt87\\:value_label")).toHaveText(
      "இரண்டு",
    );
  }
}
