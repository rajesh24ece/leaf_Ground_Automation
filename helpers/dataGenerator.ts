import { faker } from "@faker-js/faker";
import type { CreateProductRequest } from "../utils/testInterface";

export class DataGenerator {
  static apiData(): CreateProductRequest {
    return {
      title: faker.commerce.productName(),
      price: faker.number.int({ min: 50, max: 1000 }),
      description: faker.commerce.productDescription(),
      image: faker.image.url(),
      category: faker.commerce.department().toLowerCase(),
    };
  }
}
