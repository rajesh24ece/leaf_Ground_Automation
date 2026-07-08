import { expect, Page } from "@playwright/test";
import { NavigationHelper } from "../helpers/navigationHelper";
import { WebTableLocators } from "../locators/webTableLocators";
import { WebTableTestData } from "../utils/testInterface";
import { ClickHelper } from "../helpers/clickHelper";
import { InputHelper } from "../helpers/inputHelper";
import { AssertionHelper } from "../helpers/assertionHelper";
import { Roles } from "../utils/constants";
import { logger } from "../utils/logger";

type AriaRole = Parameters<Page["getByRole"]>[0];

export class WebTablePage {
  #page: Page;
  constructor(page: Page) {
    this.#page = page;
  }

  async landingPage(): Promise<void> {
    await NavigationHelper.navigateToPage(this.#page, WebTableLocators.webTablePage);
  }

  async createNewProduct(testData: WebTableTestData): Promise<void> {
    await ClickHelper.clickByRole(this.#page, Roles.BUTTON, WebTableLocators.newButton);
    logger.info("✅ Clicked 'New' button");

    await InputHelper.clear(this.#page.locator(WebTableLocators.nameLocator));
    logger.info("✅ Cleared product name field");

    await InputHelper.fill(this.#page.locator(WebTableLocators.nameLocator), testData.ProductName);
    logger.info(`✅ Entered Product Name: ${testData.ProductName}`);

    await InputHelper.fill(this.#page.locator(WebTableLocators.description), testData.Description);
    logger.info(`✅ Entered Product Description: ${testData.Description}`);

    await ClickHelper.clickDynamicLocator(this.#page, `label:text-is("${testData.Category}")`);
    logger.info(`✅ Selected Product Category: ${testData.Category}`);

    await InputHelper.clear(this.#page.locator(WebTableLocators.price));
    logger.info("✅ Cleared Product Price field");

    await InputHelper.fill(this.#page.locator(WebTableLocators.price), testData.Price);
    logger.info(`✅ Entered Product Price: ${testData.Price}`);

    await InputHelper.fill(this.#page.locator(WebTableLocators.quantity), testData.Quantity);
    logger.info(`✅ Entered Product Quantity: ${testData.Quantity}`);

    await this.#page.getByText(WebTableLocators.saveButton, { exact: true }).click();
    logger.info(`✅ Product '${testData.ProductName}' added successfully`);

    await AssertionHelper.assertVisible(this.#page.locator(WebTableLocators.alertLocator));
    await AssertionHelper.assertContainsText(this.#page.locator(WebTableLocators.alertLocator), WebTableLocators.alertHeader);

    // const notification = this.#page.locator(".ui-growl-item-container").first();
    // const box = await notification.boundingBox();

    // if (box) {
    //   await this.#page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

    //   await this.#page.locator(".ui-growl-icon-close").click();
    // }
    const notification = this.#page.locator(".ui-growl-item-container").first();
    const box = await notification.boundingBox();

    if (box) {
      await this.#page.waitForTimeout(1000);

      await this.#page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

      await this.#page.waitForTimeout(1000);

      await this.#page.locator(".ui-growl-icon-close").click();

      await this.#page.waitForTimeout(1000);
    }
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

  async searchProduct(testData: WebTableTestData): Promise<void> {
    const search = this.#page.getByPlaceholder(WebTableLocators.searchPlaceholder).nth(1);
    await ClickHelper.click(search);
    await InputHelper.pressSequentially(search, testData.SearchProduct, 50);
    const isAvailable = await this.checkTableData(testData.SearchProduct);
    await AssertionHelper.assertEquals(isAvailable, true);
  }
}
