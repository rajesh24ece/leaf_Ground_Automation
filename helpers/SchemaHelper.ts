import { expect } from "@playwright/test";
import Ajv from "ajv";
import { logger } from "../utils/logger";

export class SchemaHelper {
  private static readonly ajv = new Ajv();

  static validate(schema: object, data: unknown): void {
    const validate = this.ajv.compile(schema);

    const valid = validate(data);

    if (!valid) {
      logger.error(`❌ Schema Validation Failed\n${JSON.stringify(validate.errors, null, 2)}`);
    }

    expect(valid, JSON.stringify(validate.errors, null, 2)).toBe(true);

    logger.info("✅ Schema validation passed.");
  }
}
