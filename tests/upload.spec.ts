import { UploadPage } from "../pages/UploadPage";
import { test } from "../fixtures/AccessJsonFile";
import { UploadLocators } from "../locators/UploadLocators";
import { UploadTestData } from "../utils/test-data.interface";

let uploadPage: UploadPage;
let data: UploadTestData;

test.beforeAll(async ({ getJsonData }) => {
  data = await getJsonData<UploadTestData>(UploadLocators.uploadJson);
});

test.beforeEach(async ({ page }) => {
  uploadPage = new UploadPage(page);
  await uploadPage.landingPage();
});

test("Basic Upload - One.", async () => {
  await uploadPage.fileUploadOne();
});

test("Basic Upload - Two.", async () => {
  await uploadPage.fileUploadTwo();
});

test("Basic Download.", async () => {
  await uploadPage.fileDownload(data);
});
