import { faker } from "@faker-js/faker";
import type { DOBData } from "../interface/uiInterface";
import type { CreateProductRequest } from "../interface/apiInterface";

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

  static randomNumber(max: number): number {
    return Math.floor(Math.random() * max) + 1;
  }

  static randomItem<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  static randomItems<T>(items: T[], count: number): T[] {
    if (count > items.length) {
      throw new Error(`Cannot select ${count} unique items from an array of ${items.length} items.`);
    }

    const shuffled = [...items];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
  }

  static firstName(): string {
    return faker.person.firstName();
  }

  static countryName(): string {
    return faker.location.country();
  }

  static emailID(): string {
    return faker.internet.email();
  }

  static pragraph(): string {
    return faker.lorem.paragraph();
  }

  static randomDOB(): DOBData {
    const dob = faker.date.between({
      from: new Date("2023-01-01"),
      to: new Date(),
    });

    return {
      value: dob,
      date: String(dob.getDate()),
      month: dob.toLocaleString("en-US", { month: "long" }),
      year: String(dob.getFullYear()),
      fullDate: dob.toLocaleDateString("en-US"),
    };
  }
}
