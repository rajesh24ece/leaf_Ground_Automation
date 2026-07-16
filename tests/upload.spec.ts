import { UploadPage } from "../pages/uploadPage";
import { test } from "../fixtures/accessJsonFile";
import { UploadLocators } from "../locators/uploadLocators";
import { UploadTestData } from "../interface/uiInterface";

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
