import { test } from "../fixtures/AccessJsonFile";
import { WebTableLocators } from "../locators/WebTableLocators";
import { WebTablePage } from "../pages/webtablePage";
import { WebTableTestData } from "../utils/Test-data.interface";

let webTablePage: WebTablePage;
let data: WebTableTestData;

test.beforeAll(async ({ getJsonData }) => {
  data = await getJsonData<WebTableTestData>(WebTableLocators.webTableJson);
});

test.beforeEach(async ({ page }) => {
  webTablePage = new WebTablePage(page);
  await webTablePage.landingPage();
});

test("Successfully landed in the web table page.", async ({ page }) => {
  webTablePage = new WebTablePage(page);
  await webTablePage.createNewProduct(data);
});
