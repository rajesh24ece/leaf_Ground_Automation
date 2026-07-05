import { APIRequestContext } from "@playwright/test";
import { StoreApiLocator } from "../locators/storeApiLocator";
import { ApiHelper } from "../helpers/storeApiHelper";
import { Product } from "../utils/testInterface";
import { DataGenerator } from "../helpers/dataGenerator";

export class FakeStoreApiPage {
  readonly #request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.#request = request;
  }

  async getProducts(): Promise<Product[]> {
    return ApiHelper.get<Product[]>(this.#request, StoreApiLocator.url);
  }

  async getProductsCount(): Promise<number> {
    return ApiHelper.getLength(this.#request, StoreApiLocator.url);
  }

  async getProductsStatusCode(): Promise<number> {
    return ApiHelper.getStatusCode(this.#request, StoreApiLocator.url);
  }

  async getSingleProduct(): Promise<Product> {
    const totalProducts = await ApiHelper.getLength(this.#request, StoreApiLocator.url);
    const randomProductId = Math.floor(Math.random() * totalProducts + 1);
    return ApiHelper.get<Product>(this.#request, `${StoreApiLocator.url}/${randomProductId}`);
  }

  async getAddProduct(): Promise<void> {
    await ApiHelper.post<Product>(this.#request, StoreApiLocator.url, DataGenerator.apiData());
  }
}
