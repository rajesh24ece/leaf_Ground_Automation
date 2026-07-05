import { expect, Page, test } from "@playwright/test";
import { WindowsLocators } from "../locators/windowsLocator";
import { logger } from "../utils/logger";

export class WindowsPage {
  readonly #page: Page;

  constructor(page: Page) {
    this.#page = page;
  }

  async landingWindowPage() {
    await this.#page.goto(WindowsLocators.multipleWindowsPage);
  }

  async openNewWindows() {
    const parentTitle = await this.#page.title();
    logger.info("Parent Page Title: " + parentTitle);
    const [newPage] = await Promise.all([this.#page.context().waitForEvent("page"), this.#page.click(WindowsLocators.openOneBrowserlocator)]);
    await newPage.waitForLoadState();
    const newPageTitle = await newPage.title();
    logger.info("New Page Title: " + newPageTitle);
    expect(newPageTitle).not.toBe(parentTitle);
    await newPage.close();
  }

  async openAndCloseTab() {
    const context = this.#page.context();
    const parentTitle = await this.#page.title();
    const pagesBefore = context.pages();
    await this.#page.locator(WindowsLocators.openThreeBrowsersCloseLocator).click();
    await expect.poll(() => context.pages().length).toBe(pagesBefore.length + 3);
    const newPages = context.pages().slice(pagesBefore.length);
    for (const page of newPages) {
      await page.waitForLoadState();
      const newTitle = await page.title();
      logger.info(`New Page Title: ${newTitle}`);
      expect(newTitle).not.toBe(parentTitle);
      await page.close();
    }
    await this.#page.bringToFront();
  }

  async countOpenedTabs() {
    const [newpage] = await Promise.all([this.#page.context().waitForEvent("page"), await this.#page.getByRole("button", { name: "Open Multiple" }).click()]);
    const pages = this.#page.context().pages();
    logger.info(`Total pages: ${pages.length}`);
  }

  async waitForTabsToOpen() {
    const [newpage] = await Promise.all([this.#page.context().waitForEvent("page"), await this.#page.getByRole("button", { name: "Open with delay" }).click()]);
  }
}
