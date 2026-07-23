import { APIRequestContext } from "@playwright/test";
import { DummyJsonApiLocator } from "../locators/dummyJsonApiLocator";
import { ApiHelper } from "../helpers/dummyJsonApiHelper";
import { Product, CreateProductRequest, ProductResponse } from "../interface/apiInterface";
import { DataGenerator } from "../helpers/dataGenerator";

export class DummyJsonApiPage {
  readonly #request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.#request = request;
  }

  async getProductsCount(): Promise<number> {
    return ApiHelper.getLength(this.#request, DummyJsonApiLocator.url, "products");
  }

  async getProductsStatusCode(): Promise<number> {
    return ApiHelper.getStatusCode(this.#request, DummyJsonApiLocator.url);
  }

  async getProducts(): Promise<ProductResponse> {
    return ApiHelper.get<ProductResponse>(this.#request, DummyJsonApiLocator.url);
  }

  async getSingleProduct(): Promise<Product> {
    const totalProducts = await ApiHelper.getLength(this.#request, DummyJsonApiLocator.url, "products");
    const randomProductId = DataGenerator.randomNumber(totalProducts);
    return ApiHelper.get<Product>(this.#request, `${DummyJsonApiLocator.url}/${randomProductId}`);
  }

  async addProduct(payload: CreateProductRequest): Promise<Product> {
    return ApiHelper.post<Product>(this.#request, DummyJsonApiLocator.addUrl, payload);
  }

  async putProduct(productId: number, payload: CreateProductRequest): Promise<Product> {
    const url = `${DummyJsonApiLocator.url}/${productId}`;
    return ApiHelper.put<Product>(this.#request, url, payload);
  }
}
