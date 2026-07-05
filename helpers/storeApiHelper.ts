import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { logger } from "../utils/logger";

export class ApiHelper {
  /**
   * Executes a GET request and returns the parsed JSON response.
   */
  static async get<T = unknown>(request: APIRequestContext, url: string, headers?: Record<string, string>): Promise<T> {
    logger.info(`✅ GET: ${url}`);
    const response = await request.get(url, { headers });
    await this.#assertStatus(response, 200, url);
    const data = await this.#parseJson<T>(response);
    logger.info(`✅ Response Body:\n${JSON.stringify(data, null, 2)}`);
    return data;
  }

  /**
   * Executes a GET request and returns only the HTTP status code.
   */
  static async getStatusCode(request: APIRequestContext, url: string, headers?: Record<string, string>): Promise<number> {
    const response = await request.get(url, { headers });
    logger.info(`✅ GET ${url} → ${response.status()} ${response.statusText()}`);
    return response.status();
  }

  /**
   * Executes a GET request and returns the number of records.
   */
  static async getLength(request: APIRequestContext, url: string, headers?: Record<string, string>): Promise<number> {
    const response = await request.get(url, { headers });
    await this.#assertStatus(response, 200, url);
    const records = await this.#parseJson<unknown[]>(response);
    logger.info(`✅ GET ${url} → Total Records: ${records.length}`);
    return records.length;
  }

  static async #assertStatus(response: APIResponse, expectedStatus: number, url: string): Promise<void> {
    const actualStatus = response.status();
    if (actualStatus !== expectedStatus) {
      const body = await response.text().catch(() => "<unreadable body>");
      logger.error(`❌ GET ${url} → Expected ${expectedStatus}, Actual ${actualStatus}\n${body}`);
    }
    expect(actualStatus).toBe(expectedStatus);
  }

  static async #parseJson<T>(response: APIResponse): Promise<T> {
    try {
      return await response.json();
    } catch {
      const body = await response.text().catch(() => "<unreadable body>");
      logger.error(`❌ Unable to parse JSON\n${body}`);
      throw new Error("❌ Response is not a valid JSON.");
    }
  }

  static async post<T = unknown>(request: APIRequestContext, url: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
    logger.info(`✅ POST: ${url}`);
    const response = await request.post(url, {
      data,
      headers,
    });
    await this.#assertStatus(response, 201, url);
    const responseBody = await this.#parseJson<T>(response);
    logger.info(`✅ Response Body:\n${JSON.stringify(responseBody, null, 2)}`);
    return responseBody;
  }
}
