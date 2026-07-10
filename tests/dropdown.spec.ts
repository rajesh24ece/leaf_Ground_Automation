import { test } from "../fixtures/accessJsonFile";
import { ScreenshotHelper } from "../helpers/screenshotHelper";
import { DropdownLocators } from "../locators/dropdownLocators";
import { DropdownPage } from "../pages/dropdownPage";
import { DropdownTestData } from "../utils/testInterface";
import { Page } from "@playwright/test";

let dropdownPage: DropdownPage;
let data: DropdownTestData;
let sharedPage: Page;
let selectedCountry: string;
let selectedLanguage: string;

test.beforeAll(async ({ browser, getJsonData }) => {
  data = await getJsonData<DropdownTestData>(DropdownLocators.dropdownJson);
  sharedPage = await browser.newPage();
  dropdownPage = new DropdownPage(sharedPage);
  await dropdownPage.landingDropdownPage();
});

test.afterAll(async () => {
  await sharedPage.close();
});

test("Validate Dropdown Selection Functionality.", async () => {
  await test.step("Country is loaded and selected correctly.", async () => {
    selectedCountry = await dropdownPage.selectCountry(data);
  });

  await test.step("Select language to select the two from the following dropdown.", async () => {
    selectedLanguage = await dropdownPage.selectLanguage(data);
  });

  await test.step("Which is your favorite UI Automation tool?", async () => {
    await dropdownPage.selectTool(data);
  });

  await test.step("Selecting Confirm Cities belongs to Country is loaded.", async () => {
    await dropdownPage.selectCity(data, selectedCountry);
  });

  await test.step("Selecting the Course.", async () => {
    await dropdownPage.selectCourse(data);
  });

  await test.step("Select 'Two' irrespective of the language chosen.", async () => {
    await dropdownPage.selectTwo(data, selectedLanguage);
  });
});

test.afterEach(async ({}, testInfo) => {
  await ScreenshotHelper.captureAndAttach(sharedPage, testInfo, testInfo.title);
});
