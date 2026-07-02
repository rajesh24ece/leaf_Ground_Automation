import { test } from "../fixtures/AccessJsonFile";
import { DropdownLocators } from "../locators/DropdownLocators";
import { DropdownPage } from "../pages/DropdownPage";
import { DropdownTestData } from "../utils/test-data.interface";
import { Page } from "@playwright/test";

let dropdownPage: DropdownPage;
let data: DropdownTestData;
let sharedPage: Page;

test.beforeAll(async ({ browser, getJsonData }) => {
  data = await getJsonData<DropdownTestData>(DropdownLocators.dropdownJson);
  sharedPage = await browser.newPage();
  dropdownPage = new DropdownPage(sharedPage);
  await dropdownPage.landingDropdownPage();
});

test.afterAll(async () => {
  await sharedPage.close();
});

test("Select favourite UI automation tool.", async () => {
  await test.step("Country is loaded and selected correctly.", async () => {
    await dropdownPage.selectCountry(data);
  });

  await test.step("Which is your favorite UI Automation tool?", async () => {
    await dropdownPage.selectTool(data);
  });

  await test.step("Selecting Confirm Cities belongs to Country is loaded.", async () => {
    await dropdownPage.selectCity(data);
  });

  await test.step("Select language to select the two from the following dropdown.", async () => {
    await dropdownPage.selectLanguage(data);
  });

  await test.step("Selecting the Course.", async () => {
    await dropdownPage.selectCourse(data);
  });

  await test.step("Select 'Two' irrespective of the language chosen.", async () => {
    await dropdownPage.selectTwo(data);
  });
});
