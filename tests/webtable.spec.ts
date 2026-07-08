import { test } from "../fixtures/accessJsonFile";
import { WebTableLocators } from "../locators/webTableLocators";
import { WebTablePage } from "../pages/webTablePage";
import { WebTableTestData } from "../utils/testInterface";

let webTablePage: WebTablePage;
let data: WebTableTestData;

test.beforeAll(async ({ getJsonData }) => {
  data = await getJsonData<WebTableTestData>(WebTableLocators.webTableJson);
});

test.beforeEach(async ({ page }) => {
  webTablePage = new WebTablePage(page);
  await webTablePage.landingPage();
});

test("Successfully landed in the web table page and added a new product.", async () => {
  await webTablePage.createNewProduct(data);
});

test("Search existing product", async () => {
  await webTablePage.searchProduct(data);
});
