import { test } from "../fixtures/apiFixture";
import { StoreApiLocator } from "../locators/storeApiLocator";
import { FakeStoreApiPage } from "../pages/storeApiPage";
import { DataGenerator } from "../helpers/dataGenerator";

test("Verify products endpoint status code", async ({ apiContext }) => {
  const products = new FakeStoreApiPage(apiContext);
  await products.getProductsStatusCode();
});

test("Verify products count", async ({ apiContext }) => {
  const products = new FakeStoreApiPage(apiContext);
  await products.getProductsCount();
});

test("Retrieve all products", async ({ apiContext }) => {
  const products = new FakeStoreApiPage(apiContext);
  await products.getProducts();
});

test("Retrieve a single product", async ({ apiContext }) => {
  const products = new FakeStoreApiPage(apiContext);
  await products.getSingleProduct();
});

test("Add a product", async ({ apiContext }) => {
  const products = new FakeStoreApiPage(apiContext);
  const payload = DataGenerator.apiData();
  await products.addProduct(payload);
});

test("Update a product fully", async ({ apiContext }) => {
  const products = new FakeStoreApiPage(apiContext);
  const payload = DataGenerator.apiData();
  await products.putProduct(Number(StoreApiLocator.updateID), payload);
});
