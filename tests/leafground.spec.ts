import { test } from "@playwright/test";
import { TextBox } from "../pages/textBoxPage";
import { WindowsPage } from "../pages/windowsPage";
import { DropdownPage } from "../pages/dropdownPage";
import { AlertPage } from "../pages/alertPage";
import { WebTablePage } from "../pages/webtablePage";
import { UploadPage } from "../pages/uploadPage";

test.describe("DemoQA UI Interactions", () => {
  test.describe.configure({ mode: "serial" });
  //test.setTimeout(60000);

  test.skip("Handling Text Box", async ({ page }) => {
    const textBoxPage = new TextBox(page);
    await textBoxPage.handlingTextBox();
  });

  test.skip("Handling multiple windows", async ({ page }) => {
    const windowsPage = new WindowsPage(page);
    await windowsPage.handlingMultipleWindows();
  });

  test.skip("Handling drop down options", async ({ page }) => {
    const dropdownPage = new DropdownPage(page);
    await dropdownPage.handlingDropdown();
  });

  test.skip("Handling alerts", async ({ page }) => {
    const alertPage = new AlertPage(page);
    await alertPage.handlingAlert();
  });

  test("Handling file upload and download", async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.handlingUpload();
  });
});
