import { expect, Page } from "playwright/test";
import { Locators } from "../utils/locators";

export class WindowsPage extends Locators {
  #page: Page;

  constructor(page: Page) {
    super();
    this.#page = page;
  }
  async handlingMultipleWindows() {
    await this.landingWindowPage();
    await this.openNewWindows();
    await this.openAndCloseTab();
  }

  private async landingWindowPage() {
    await this.#page.goto("window.xhtml");
  }

  private async openNewWindows() {
    let parentTitle = await this.#page.title();
    console.log("Parent Page Title: " + parentTitle);
    const [newPage] = await Promise.all([
      this.#page.context().waitForEvent("page"),
      this.#page.click(this.openOneBrowserlocator),
    ]);
    await newPage.waitForLoadState();
    let newPageTitle = await newPage.title();
    console.log("New Page Title: " + newPageTitle);
    expect(newPageTitle).not.toBe(parentTitle);
    await newPage.close();
  }

  private async openAndCloseTab() {
    await this.landingWindowPage();
    const context = this.#page.context();
    const parentTitle = await this.#page.title();
    const pagesBefore = context.pages();
    await this.#page.locator(this.openThreeBrowsersCloseLocator).click();
    await expect
      .poll(() => context.pages().length)
      .toBe(pagesBefore.length + 3);
    const newPages = context.pages().slice(pagesBefore.length);
    for (const page of newPages) {
      await page.waitForLoadState();
      const newTitle = await page.title();
      console.log("New Page Title:", newTitle);
      expect(newTitle).not.toBe(parentTitle);
      await page.close();
    }
    await this.#page.bringToFront();
  }
}
