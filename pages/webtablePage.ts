import { Page, expect } from "@playwright/test";
import { NavigationHelper } from "../helpers/NavigationHelper";
import { WebTableLocators } from "../locators/WebTableLocators";
import { WebTableTestData } from "../utils/Test-data.interface";
import { ClickHelper } from "../helpers/ClickHelper";
import { InputHelper } from "../helpers/InputHelper";

export class WebTablePage {
  #page: Page;
  constructor(page: Page) {
    this.#page = page;
  }

  async landingPage(): Promise<void> {
    await NavigationHelper.navigateToPage(this.#page, WebTableLocators.webTablePage);
  }

  async createNewProduct(testData: WebTableTestData) {
    await ClickHelper.clickByRole(this.#page, "button", "New");
    //await this.#page.getByRole("button", { name: "New" }).click();
    //await this.#page.waitForSelector("#form\\:j_idt130");
    await this.#page.getByRole("textbox", { name: "Name*" }).fill(testData.ProductName);
    await this.#page.getByRole("textbox", { name: "Description" }).fill(testData.Description);
    await this.#page.locator(`label:text-is("${testData.Category}")`).click();
    await this.#page.getByRole("textbox", { name: "Price" }).clear();
    await this.#page.getByRole("textbox", { name: "Price" }).fill(String(testData.Price));
    await this.#page.locator("#form\\:quantity_input").fill(String(testData.Quantity));
    await this.#page.getByText("Save", { exact: true }).click();
    await expect(this.#page.locator(".ui-growl-message")).toContainText(/Product Added/i);
    const search = this.#page.getByPlaceholder("Search").nth(1);
    await search.click();
    await search.pressSequentially(testData.ProductName, { delay: 50 });
    const isavailable = await this.checkTableData(testData.ProductName);
    if (isavailable) {
      console.log("Product available in the list.");
    }
  }

  private async checkTableData(productName: string): Promise<boolean> {
    const pagination = this.#page.locator(".ui-paginator-pages a");
    const pageCount = await pagination.count();
    for (let i = 1; i < pageCount; i++) {
      await pagination.nth(i).click();
      const rows = this.#page.locator("tbody[id='form:dt-products_data'] tr");
      const rowCount = await rows.count();
      for (let j = 1; j < rowCount; j++) {
        const cellText = await rows.nth(j).getByRole("gridcell").nth(2).textContent();
        if (cellText?.includes(productName)) {
          return true;
        }
      }
    }
    return false;
  }
}
