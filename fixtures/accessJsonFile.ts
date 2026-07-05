import { test as base, expect } from "@playwright/test";
import fs from "fs/promises";
import path from "path";

type JsonFixture = {
  getJsonData: <T>(fileName: string) => Promise<T>;
};

export const test = base.extend<JsonFixture>({
  getJsonData: async ({}, use) => {
    const readJson = async <T>(fileName: string): Promise<T> => {
      const filePath = path.join(process.cwd(), "test-data", fileName);
      const fileContent = await fs.readFile(filePath, "utf-8");
      return JSON.parse(fileContent) as T;
    };

    await use(readJson);
  },
});

export { expect };
