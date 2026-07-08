import { test as base, expect, request, APIRequestContext } from "@playwright/test";
import { DummyJsonApiPage } from "../pages/dummyJsonApiPage";

type ApiFixtures = {
  apiContext: APIRequestContext;
  storeApi: DummyJsonApiPage;
};

export const test = base.extend<ApiFixtures>({
  apiContext: async ({}, use) => {
    const apiContext = await request.newContext({
      baseURL: process.env.API_BASE_URL,
    });

    await use(apiContext);

    await apiContext.dispose();
  },

  storeApi: async ({ apiContext }, use) => {
    const storeApi = new DummyJsonApiPage(apiContext);

    await use(storeApi);
  },
});

export { expect };
