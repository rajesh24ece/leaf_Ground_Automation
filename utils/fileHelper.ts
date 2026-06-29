import { logger } from "../utils/logger";
import * as fs from "fs";

export class FileHelper {
  // Method 1 - Single Object
  static async accessJsonData<T>(filePath: string): Promise<T> {
    const data = await fs.promises.readFile(filePath, "utf-8"); // ✅ async
    logger.info(`Loaded JSON data from "${filePath}".`); // ✅ log added
    return JSON.parse(data) as T;
  }

  // Method 2 - Array (now consistent with Method 1)
  static async accessJsonArrayData<T>(filePath: string): Promise<T[]> {
    // ✅ renamed param
    const data = await fs.promises.readFile(filePath, "utf-8"); // ✅ async now
    logger.info(`Loaded JSON array data from "${filePath}".`); // ✅ log added
    return JSON.parse(data) as T[];
  }
}
