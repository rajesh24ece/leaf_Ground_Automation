import { Locator, Page } from "@playwright/test";

type AriaRole = Parameters<Page["getByRole"]>[0];

export class PageLocators {
  readonly #page: Page;

  constructor(page: Page) {
    this.#page = page;
  }

  getByRole(role: AriaRole, name?: string | RegExp): Locator {
    return this.#page.getByRole(role, { name });
  }

  getByText(text: string | RegExp): Locator {
    return this.#page.getByText(text);
  }

  getByLabel(label: string | RegExp): Locator {
    return this.#page.getByLabel(label);
  }

  getByPlaceholder(text: string | RegExp): Locator {
    return this.#page.getByPlaceholder(text);
  }

  getByTestId(id: string): Locator {
    return this.#page.getByTestId(id);
  }
}
