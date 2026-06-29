import { test as base } from "@playwright/test";
import { FileHelper } from "../utils/fileHelper";

type MyFixtures = {
  getJsonData: <T>(path: string) => Promise<T>;
};

export const test = base.extend<MyFixtures>({
  getJsonData: async ({}, use) => {
    const loader = async <T>(path: string): Promise<T> => {
      return await FileHelper.accessJsonData<T>(path);
    };

    await use(loader);
  },
});

export { expect } from "@playwright/test";
