import { test } from "../fixtures/apiFixture";
import { DummyJsonApiLocator } from "../locators/dummyJsonApiLocator";
import { DummyJsonApiPage } from "../pages/dummyJsonApiPage";
import { DataGenerator } from "../helpers/dataGenerator";
import { AssertionHelper } from "../helpers/assertionHelper";
import { SchemaHelper } from "../helpers/SchemaHelper";
import { ProductSchema } from "../schemas/ProductSchema";
import { ProductResponseSchema } from "../schemas/productResponseSchema";

test("Verify products endpoint status code", async ({ apiContext }) => {
  const products = new DummyJsonApiPage(apiContext);
  const statusCode = await products.getProductsStatusCode();
  await AssertionHelper.assertToBe(statusCode, 200);
});

test("Verify products count", async ({ apiContext }) => {
  const products = new DummyJsonApiPage(apiContext);
  const count = await products.getProductsCount();
  await AssertionHelper.assertGreaterThan(count, 0);
});

test("Retrieve a single product", async ({ apiContext }) => {
  const products = new DummyJsonApiPage(apiContext);
  const product = await products.getSingleProduct();
  await AssertionHelper.assertToBeTruthy(product.id);
  await AssertionHelper.assertToBeTruthy(product.title);
  AssertionHelper.assertEquals(typeof product.price, "number");
  AssertionHelper.assertEquals(typeof product.category, "string");
});

test("Add a product", async ({ apiContext }) => {
  const products = new DummyJsonApiPage(apiContext);
  const payload = DataGenerator.apiData();
  const created = await products.addProduct(payload);
  await AssertionHelper.assertToBeTruthy(created.id);
  AssertionHelper.assertEquals(created.title, payload.title);
  AssertionHelper.assertEquals(created.price, payload.price);
  AssertionHelper.assertEquals(created.category, payload.category);
});

test("Update a product fully", async ({ apiContext }) => {
  const products = new DummyJsonApiPage(apiContext);
  const payload = DataGenerator.apiData();
  const updated = await products.putProduct(Number(DummyJsonApiLocator.updateID), payload);
  await AssertionHelper.assertToBe(updated.id, Number(DummyJsonApiLocator.updateID));
  AssertionHelper.assertEquals(updated.title, payload.title);
  AssertionHelper.assertEquals(updated.price, payload.price);
});

test("Retrieve all products", async ({ apiContext }) => {
  const products = new DummyJsonApiPage(apiContext);
  const response = await products.getProducts();
  // Schema validation
  SchemaHelper.validate(ProductResponseSchema, response);
  await AssertionHelper.assertGreaterThan(response.products.length, 0);
  const firstProduct = response.products[0];
  SchemaHelper.validate(ProductSchema, firstProduct);
  await AssertionHelper.assertToBeTruthy(firstProduct.id);
  await AssertionHelper.assertToBeTruthy(firstProduct.title);
  AssertionHelper.assertEquals(typeof firstProduct.price, "number");
});
