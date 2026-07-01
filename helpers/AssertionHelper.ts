import { expect, Locator, Page } from "@playwright/test";

export interface AssertionOptions {
  timeout?: number;
  soft?: boolean;
}

export class AssertionHelper {
  private static getOptions(options?: AssertionOptions) {
    return {
      timeout: options?.timeout ?? 5000,
      soft: options?.soft ?? false,
    };
  }

  private static getExpect(soft: boolean = false) {
    return soft ? expect.soft : expect;
  }

  // =========================
  // Visibility Assertions
  // =========================

  static async assertVisible(locator: Locator, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).toBeVisible({ timeout });
  }

  static async assertHidden(locator: Locator, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).toBeHidden({ timeout });
  }

  static async assertAttached(locator: Locator, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).toBeAttached({ timeout });
  }

  static async assertDetached(locator: Locator, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).not.toBeAttached({ timeout });
  }

  // =========================
  // State Assertions
  // =========================

  static async assertEnabled(locator: Locator, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).toBeEnabled({ timeout });
  }

  static async assertDisabled(locator: Locator, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).toBeDisabled({ timeout });
  }

  static async assertChecked(locator: Locator, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).toBeChecked({ timeout });
  }

  static async assertUnchecked(locator: Locator, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).not.toBeChecked({ timeout });
  }

  static async assertEditable(locator: Locator, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).toBeEditable({ timeout });
  }

  static async assertEmpty(locator: Locator, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).toBeEmpty({ timeout });
  }

  static async assertFocused(locator: Locator, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).toBeFocused({ timeout });
  }
  // =========================
  // Text Assertions
  // =========================

  static async assertText(locator: Locator, expected: string, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).toHaveText(expected, { timeout });
  }

  static async assertTexts(locator: Locator, expected: string[]): Promise<void> {
    const actual = await locator.allTextContents();
    expect(actual.map((text) => text.trim())).toEqual(expected);
  }

  static async assertContainsText(locator: Locator, expected: string, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).toContainText(expected, { timeout });
  }

  static async assertTextMatches(locator: Locator, expected: string | RegExp, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    const regex = expected instanceof RegExp ? expected : new RegExp(expected);
    await this.getExpect(soft)(locator).toHaveText(regex, { timeout });
  }

  // =========================
  // Attribute Assertions
  // =========================

  static async assertAttribute(locator: Locator, attribute: string, value: string, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).toHaveAttribute(attribute, value, {
      timeout,
    });
  }

  static async assertClass(locator: Locator, className: string, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).toHaveClass(new RegExp(className), {
      timeout,
    });
  }

  static async assertValue(locator: Locator, value: string, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).toHaveValue(value, {
      timeout,
    });
  }

  static async assertCSS(locator: Locator, property: string, value: string, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).toHaveCSS(property, value, {
      timeout,
    });
  }

  // =========================
  // Collection Assertions
  // =========================

  static async assertCount(locator: Locator, expectedCount: number, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).toHaveCount(expectedCount, {
      timeout,
    });
  }

  // =========================
  // Page Assertions
  // =========================

  static async assertTitle(page: Page, expectedTitle: string | RegExp, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(page).toHaveTitle(expectedTitle, {
      timeout,
    });
  }

  static async assertUrl(page: Page, expectedUrl: string | RegExp, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(page).toHaveURL(expectedUrl, {
      timeout,
    });
  }

  static async assertTitleMatches(page: Page, pattern: string | RegExp, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern);
    await this.getExpect(soft)(page).toHaveTitle(regex, {
      timeout,
    });
  }

  // =========================
  // Negative Assertions
  // =========================

  static async assertNotVisible(locator: Locator, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).not.toBeVisible({
      timeout,
    });
  }

  static async assertNotHidden(locator: Locator, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).not.toBeHidden({
      timeout,
    });
  }

  static async assertNotEnabled(locator: Locator, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).not.toBeEnabled({
      timeout,
    });
  }

  static async assertNotDisabled(locator: Locator, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).not.toBeDisabled({
      timeout,
    });
  }

  static async assertNotChecked(locator: Locator, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).not.toBeChecked({
      timeout,
    });
  }

  static async assertNotFocused(locator: Locator, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).not.toBeFocused({
      timeout,
    });
  }

  static async assertNotContainsText(locator: Locator, expected: string, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).not.toContainText(expected, {
      timeout,
    });
  }

  static async assertNotText(locator: Locator, expected: string, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).not.toHaveText(expected, {
      timeout,
    });
  }

  static async assertNotAttribute(locator: Locator, attribute: string, value: string, options?: AssertionOptions): Promise<void> {
    const { timeout, soft } = this.getOptions(options);
    await this.getExpect(soft)(locator).not.toHaveAttribute(attribute, value, {
      timeout,
    });
  }

  static assertEquals(actual: unknown, expected: unknown, soft = false): void {
    if (soft) {
      expect.soft(actual).toEqual(expected);
    } else {
      expect(actual).toEqual(expected);
    }
  }
}
