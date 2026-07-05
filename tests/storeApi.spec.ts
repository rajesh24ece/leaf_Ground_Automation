import { test } from "../fixtures/apiFixture";
import { StoreApiLocator } from "../locators/storeApiLocator";
import { FakeStoreApiPage } from "../pages/storeApiPage";
import { DataGenerator } from "../helpers/dataGenerator";
import { AssertionHelper } from "../helpers/assertionHelper";

test("Verify products endpoint status code", async ({ apiContext }) => {
  const products = new FakeStoreApiPage(apiContext);
  const statusCode = await products.getProductsStatusCode();
  await AssertionHelper.assertToBe(statusCode, 200);
});

test("Verify products count", async ({ apiContext }) => {
  const products = new FakeStoreApiPage(apiContext);
  const count = await products.getProductsCount();
  await AssertionHelper.assertGreaterThan(count, 0);
});

test("Retrieve all products", async ({ apiContext }) => {
  const products = new FakeStoreApiPage(apiContext);
  const allProducts = await products.getProducts();
  await AssertionHelper.assertToBeTruthy(Array.isArray(allProducts));
  await AssertionHelper.assertGreaterThan(allProducts.length, 0);
});

test("Retrieve a single product", async ({ apiContext }) => {
  const products = new FakeStoreApiPage(apiContext);
  const product = await products.getSingleProduct();
  await AssertionHelper.assertNotNull(product.id);
  await AssertionHelper.assertToBeTruthy(product.title);
  await AssertionHelper.assertGreaterThan(product.price, 0);
});

test("Add a product", async ({ apiContext }) => {
  const products = new FakeStoreApiPage(apiContext);
  const payload = DataGenerator.apiData();
  // Note: FakeStoreAPI does not persist writes. We validate the echoed
  // response from this same request, not a follow-up GET.
  const created = await products.addProduct(payload);
  await AssertionHelper.assertNotNull(created.id);
  await AssertionHelper.assertToBe(created.title, payload.title);
  await AssertionHelper.assertToBe(created.price, payload.price);
});

test("Update a product fully", async ({ apiContext }) => {
  const products = new FakeStoreApiPage(apiContext);
  const payload = DataGenerator.apiData();
  // Note: same limitation as above — validate the echoed response only.
  const updated = await products.putProduct(Number(StoreApiLocator.updateID), payload);
  await AssertionHelper.assertToBe(updated.title, payload.title);
  await AssertionHelper.assertToBe(updated.price, payload.price);
});
