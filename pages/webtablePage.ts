import { Page, test } from "@playwright/test";
import { Methods, TableTestData } from "../utils/methods";

export class WebTablePage extends Methods {
  #page: Page;
  constructor(page: Page) {
    super();
    this.#page = page;
  }

  async handlingTable() {
    let testDataList: TableTestData[];

    await test.step("Read test data from json file.", async () => {
      testDataList = await Methods.accessJsonArrayData<TableTestData>(
        this.tableJson,
      );
    });

    await test.step("Successfully landed in the web table page.", async () => {
      await this.landingPage();
    });

    await test.step("Successfully landed in the web table page.", async () => {
      await this.createNewProduct(testDataList);
    });
  }

  private async landingPage(): Promise<void> {
    await this.#page.goto(this.webTable);
    await this.#page.waitForLoadState();
  }

  private async createNewProduct(testDataList: TableTestData[]) {
    for (let testData of testDataList) {
      await this.#page.getByRole("button", { name: "New" }).click();
      await this.#page.waitForSelector("#form\\:j_idt130");
      await this.#page
        .getByRole("textbox", { name: "Name*" })
        .fill(testData.ProductName);
      await this.#page
        .getByRole("textbox", { name: "Description" })
        .fill(testData.Description);

      await this.#page.locator(`label:text-is("${testData.Category}")`).click();

      await this.#page.getByRole("textbox", { name: "Price" }).clear();
      await this.#page
        .getByRole("textbox", { name: "Price" })
        .fill(String(testData.Price));
      await this.#page
        .locator("#form\\:quantity_input")
        .fill(String(testData.Quantity));
      await this.#page.getByText("Save", { exact: true }).click();
    }
  }

  private async checkTableData(productName: string): Promise<boolean> {
    const pagination = this.#page.locator(".ui-paginator-pages a");
    const pageCount = await pagination.count();
    for (let i = 1; i < pageCount; i++) {
      await pagination.nth(i).click();
      const rows = this.#page.locator("tbody[id='form:dt-products_data'] tr");
      const rowCount = await rows.count();
      //console.log("row count  == >" + rowCount);
      for (let j = 1; j < rowCount; j++) {
        const cellText = await rows
          .nth(j)
          .getByRole("gridcell")
          .nth(2)
          .textContent();
        //console.log(cellText);
        if (cellText?.includes(productName)) {
          return true;
        }
      }
    }
    return false;
  }
}
