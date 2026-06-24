import { test } from "../fixtures/accessJsonFile";
import { DropdownLocators } from "../locators/dropdownLocators";
import { DropdownPage } from "../pages/dropdownPage";
import { DropdownTestData } from "../utils/test-data.interface";

let dropdownPage: DropdownPage;
let data: DropdownTestData;

test.beforeAll(async ({ getJsonData }) => {
  data = await getJsonData<DropdownTestData>(DropdownLocators.dropdownJson);
});

test.beforeEach(async ({ page }) => {
  dropdownPage = new DropdownPage(page);
  await dropdownPage.landingDropdownPage();
});

test("Select favourite UI automation tool.", async () => {
  await test.step("Which is your favorite UI Automation tool?", async () => {
    await dropdownPage.selectTool(data);
  });

  await test.step("Country is loaded and selected correctly.", async () => {
    await dropdownPage.selectCountry(data);
  });

  await test.step("Selecting Confirm Cities belongs to Country is loaded.", async () => {
    await dropdownPage.selectCity(data);
  });

  await test.step("Selecting the Course.", async () => {
    await dropdownPage.selectCourse(data);
  });

  await test.step("Select language to select the two from the following dropdown.", async () => {
    await dropdownPage.selectLanguage(data);
  });

  await test.step("Select 'Two' irrespective of the language chosen.", async () => {
    await dropdownPage.selectTwo(data);
  });
});
