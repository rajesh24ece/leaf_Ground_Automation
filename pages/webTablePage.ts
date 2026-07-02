import { Page } from "@playwright/test";
import { NavigationHelper } from "../helpers/NavigationHelper";
import { WebTableLocators } from "../locators/WebTableLocators";
import { WebTableTestData } from "../utils/Test-data.interface";
import { ClickHelper } from "../helpers/ClickHelper";
import { InputHelper } from "../helpers/InputHelper";
import { logger } from "../utils/Logger";
import { AssertionHelper } from "../helpers/AssertionHelper";
import { Roles } from "../utils/Constants";

type AriaRole = Parameters<Page["getByRole"]>[0];

export class WebTablePage {
  #page: Page;
  constructor(page: Page) {
    this.#page = page;
  }

  async landingPage(): Promise<void> {
    await NavigationHelper.navigateToPage(this.#page, WebTableLocators.webTablePage);
  }

  async createNewProduct(testData: WebTableTestData) {
    await ClickHelper.clickByRole(this.#page, Roles.BUTTON, WebTableLocators.newButton);
    await InputHelper.clear(this.#page.locator(WebTableLocators.nameLocator));
    await InputHelper.fill(this.#page.locator(WebTableLocators.nameLocator), testData.ProductName);
    await InputHelper.fill(this.#page.locator(WebTableLocators.description), testData.Description);
    await ClickHelper.clickDynamicLocator(this.#page, `label:text-is("${testData.Category}")`);
    await InputHelper.clear(this.#page.locator(WebTableLocators.price));
    await InputHelper.fill(this.#page.locator(WebTableLocators.price), testData.Price);
    await InputHelper.fill(this.#page.locator(WebTableLocators.quantity), testData.Quantity);
    await this.#page.getByText(WebTableLocators.saveButton, { exact: true }).click();
    await AssertionHelper.assertContainsText(this.#page.locator(WebTableLocators.alertLocator), WebTableLocators.alertHeader);
    // const search = this.#page.getByPlaceholder(WebTableLocators.searchPlaceholder).nth(1);
    // await ClickHelper.click(search);
    // await InputHelper.pressSequentially(search, testData.ProductName, 50);
    // const isAvailable = await this.checkTableData(testData.ProductName);
    // await AssertionHelper.assertEquals(isAvailable, true);
  }

  private async checkTableData(productName: string): Promise<boolean> {
    const pagination = this.#page.locator(".ui-paginator-pages a");
    const pageCount = await pagination.count();

    for (let i = 0; i < pageCount; i++) {
      await pagination.nth(i).click();
      const rows = this.#page.locator("tbody[id='form:dt-products_data'] tr");
      const rowCount = await rows.count();

      for (let j = 0; j < rowCount; j++) {
        const cellText = await rows.nth(j).getByRole("gridcell").nth(2).textContent();
        if (cellText?.includes(productName)) {
          return true;
        }
      }
    }
    return false;
  }
}
