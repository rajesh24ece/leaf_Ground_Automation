import { test } from "../fixtures/apiFixture";
import { FakeStoreApiPage } from "../pages/storeApiPage";

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
  await products.getAddProduct();
});
