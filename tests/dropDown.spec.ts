import { test } from "../fixtures/accessJsonFile";
import { DropDownLocators } from "../locators/dropDownLocators";
import { DropdownPage } from "../pages/dropDownPage";
import { DropdownTestData } from "../utils/test-data.interface";

let dropdownPage: DropdownPage;
let data: DropdownTestData;

test.beforeAll(async ({ getJsonData }) => {
  data = await getJsonData<DropdownTestData>(DropDownLocators.dropdownJson);
});

test.beforeEach(async ({ page }) => {
  dropdownPage = new DropdownPage(page);
  await dropdownPage.landingDropdownPage();
});

test("Select favourite UI automation tool.", async () => {
  await dropdownPage.selectTool(data);
});

test("Selecting preferred country.", async () => {
  await test.step("Selecting Confirm Cities belongs to Country is loaded.", async () => {
    await dropdownPage.selectCountry(data);
    await dropdownPage.selectCity(data);
  });
});

test("Selecting the Course.", async () => {
  await dropdownPage.selectCourse(data);
});

test("Choose language randomly.", async () => {
  await test.step("Select language to select the two from the following dropdown to select 'Two' irrespective of the language chosen .", async () => {
    await dropdownPage.selectLanguage(data);
    await dropdownPage.selectTwo(data);
  });
});
