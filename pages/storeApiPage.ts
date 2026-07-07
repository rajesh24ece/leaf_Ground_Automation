import { APIRequestContext } from "@playwright/test";
import { StoreApiLocator } from "../locators/storeApiLocator";
import { ApiHelper } from "../helpers/storeApiHelper";
import { Product, CreateProductRequest } from "../utils/testInterface";
import { DataGenerator } from "../helpers/dataGenerator";

export class FakeStoreApiPage {
  readonly #request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.#request = request;
  }

  async getProductsCount(): Promise<number> {
    return ApiHelper.getLength(this.#request, StoreApiLocator.url, "products");
  }

  async getProductsStatusCode(): Promise<number> {
    return ApiHelper.getStatusCode(this.#request, StoreApiLocator.url);
  }

  async getProducts(): Promise<Product[]> {
    return ApiHelper.get<Product[]>(this.#request, StoreApiLocator.url);
  }

  async getSingleProduct(): Promise<Product> {
    const totalProducts = await ApiHelper.getLength(this.#request, StoreApiLocator.url, "products");
    const randomProductId = DataGenerator.randomNumber(totalProducts);
    return ApiHelper.get<Product>(this.#request, `${StoreApiLocator.url}/${randomProductId}`);
  }

  async addProduct(payload: CreateProductRequest): Promise<Product> {
    return ApiHelper.post<Product>(this.#request, StoreApiLocator.addUrl, payload);
  }

  async putProduct(productId: number, payload: CreateProductRequest): Promise<Product> {
    const url = `${StoreApiLocator.url}/${productId}`;
    return ApiHelper.put<Product>(this.#request, url, payload);
  }
}
