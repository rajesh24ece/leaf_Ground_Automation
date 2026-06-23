import { test } from "../fixtures/accessJsonFile";
import { WindowsPage } from "../pages/windowsPage";

let windowsPage: WindowsPage;

test.beforeEach(async ({ page }) => {
  windowsPage = new WindowsPage(page);
  await windowsPage.landingWindowPage();
});

test("Click and Confirm new Window Opens.", async () => {
  await windowsPage.openNewWindows();
});

test("Close all windows except Primary.", async () => {
  await windowsPage.openAndCloseTab();
});

test("Find the number of opened tabs.", async () => {
  await windowsPage.countOpenedTabs();
});

test("Wait for 2 new tabs to open.", async () => {
  await windowsPage.waitForTabsToOpen();
});
