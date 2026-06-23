import { test as base } from "@playwright/test";
import { Methods } from "../utils/methods";

type MyFixtures = {
  getJsonData: <T>(path: string) => Promise<T>;
};

export const test = base.extend<MyFixtures>({
  getJsonData: async ({}, use) => {
    const loader = async <T>(path: string): Promise<T> => {
      return await Methods.accessJsonData<T>(path);
    };

    await use(loader);
  },
});

export { expect } from "@playwright/test";
