import { logger } from "./logger";
import * as fs from "fs";

export class FileHelper {
  static async accessJsonData<T>(filePath: string): Promise<T> {
    const data = await fs.promises.readFile(filePath, "utf-8");
    logger.info(`Loaded JSON data from "${filePath}".`);
    return JSON.parse(data) as T;
  }

  static async accessJsonArrayData<T>(filePath: string): Promise<T[]> {
    const data = await fs.promises.readFile(filePath, "utf-8");
    logger.info(`Loaded JSON array data from "${filePath}".`);
    return JSON.parse(data) as T[];
  }
}
