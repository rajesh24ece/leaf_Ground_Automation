import { logger } from "./logger";

export class ErrorUtils {
  static handleError(message: string, error: unknown): never {
    if (error instanceof Error) {
      logger.error(`${message}. Error: ${error.message}`);
      logger.debug(error.stack);
    } else {
      logger.error(`${message}. Error: ${String(error)}`);
    }
    throw error;
  }
}
