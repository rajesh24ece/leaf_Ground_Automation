import { Locator } from "@playwright/test";
import { logger } from "../utils/Logger";
import { ErrorUtils } from "../utils/ErrorUtils";

export class InputHelper {
  /**
   * Fill an input field.
   */
  static async fill(locator: Locator, value: string): Promise<void> {
    logger.info("Filling the input field.");

    try {
      await locator.fill(value);
      logger.info("Successfully filled the input field.");
    } catch (error) {
      ErrorUtils.handleError("Failed to fill the input field.", error);
    }
  }

  /**
   * Fill and press Enter.
   */
  static async fillAndPressEnter(
    locator: Locator,
    value: string,
    fieldName = "Input",
  ): Promise<void> {
    logger.info(`Filling '${fieldName}' and pressing Enter`);

    try {
      await locator.fill(value);
      await locator.press("Enter");

      logger.info(`Successfully filled '${fieldName}' and pressed Enter`);
    } catch (error) {
      ErrorUtils.handleError(
        `Failed to fill '${fieldName}' and press Enter`,
        error,
      );
    }
  }

  /**
   * Clear an input field.
   */
  static async clear(locator: Locator, fieldName = "Input"): Promise<void> {
    logger.info(`Clearing '${fieldName}'`);

    try {
      await locator.clear();

      logger.info(`Successfully cleared '${fieldName}'`);
    } catch (error) {
      ErrorUtils.handleError(`Failed to clear '${fieldName}'`, error);
    }
  }

  /**
   * Append text.
   */
  static async append(
    locator: Locator,
    value: string,
    fieldName = "Input",
  ): Promise<void> {
    logger.info(`Appending text to '${fieldName}'`);

    try {
      const currentValue = await locator.inputValue();
      await locator.fill(currentValue + value);

      logger.info(`Successfully appended text to '${fieldName}'`);
    } catch (error) {
      ErrorUtils.handleError(`Failed to append text to '${fieldName}'`, error);
    }
  }

  /**
   * Type text sequentially.
   */
  static async pressSequentially(
    locator: Locator,
    value: string,
    delay?: number,
  ): Promise<void> {
    try {
      await locator.pressSequentially(value, { delay });
      logger.info(`Successfully typed the value '${value}'`);
    } catch (error) {
      ErrorUtils.handleError(`Failed to type the value '${value}'`, error);
    }
  }

  /**
   * Replace text.
   */
  static async replace(
    locator: Locator,
    oldValue: string,
    newValue: string,
    fieldName = "Input",
  ): Promise<void> {
    logger.info(`Replacing text in '${fieldName}'`);

    try {
      const currentValue = await locator.inputValue();

      await locator.fill(currentValue.replace(oldValue, newValue));

      logger.info(`Successfully replaced text in '${fieldName}'`);
    } catch (error) {
      ErrorUtils.handleError(`Failed to replace text in '${fieldName}'`, error);
    }
  }

  /**
   * Copy selected text.
   */
  static async copy(locator: Locator, fieldName = "Input"): Promise<void> {
    logger.info(`Copying text from '${fieldName}'`);

    try {
      await locator.press(
        process.platform === "darwin" ? "Meta+C" : "Control+C",
      );

      logger.info(`Successfully copied text from '${fieldName}'`);
    } catch (error) {
      ErrorUtils.handleError(`Failed to copy text from '${fieldName}'`, error);
    }
  }

  /**
   * Paste text.
   */
  static async paste(locator: Locator, fieldName = "Input"): Promise<void> {
    logger.info(`Pasting text into '${fieldName}'`);

    try {
      await locator.press(
        process.platform === "darwin" ? "Meta+V" : "Control+V",
      );

      logger.info(`Successfully pasted text into '${fieldName}'`);
    } catch (error) {
      ErrorUtils.handleError(`Failed to paste text into '${fieldName}'`, error);
    }
  }

  /**
   * Cut selected text.
   */
  static async cut(locator: Locator, fieldName = "Input"): Promise<void> {
    logger.info(`Cutting text from '${fieldName}'`);

    try {
      await locator.press(
        process.platform === "darwin" ? "Meta+X" : "Control+X",
      );

      logger.info(`Successfully cut text from '${fieldName}'`);
    } catch (error) {
      ErrorUtils.handleError(`Failed to cut text from '${fieldName}'`, error);
    }
  }

  /**
   * Select all text.
   */
  static async selectAll(locator: Locator, fieldName = "Input"): Promise<void> {
    logger.info(`Selecting all text from '${fieldName}'`);

    try {
      await locator.press(
        process.platform === "darwin" ? "Meta+A" : "Control+A",
      );

      logger.info(`Successfully selected all text from '${fieldName}'`);
    } catch (error) {
      ErrorUtils.handleError(
        `Failed to select all text from '${fieldName}'`,
        error,
      );
    }
  }

  /**
   * Focus an input field.
   */
  static async focus(locator: Locator, fieldName = "Input"): Promise<void> {
    logger.info(`Focusing '${fieldName}'`);

    try {
      await locator.focus();

      logger.info(`Successfully focused '${fieldName}'`);
    } catch (error) {
      ErrorUtils.handleError(`Failed to focus '${fieldName}'`, error);
    }
  }

  /**
   * Blur an input field.
   */
  static async blur(locator: Locator, fieldName = "Input"): Promise<void> {
    logger.info(`Removing focus from '${fieldName}'`);

    try {
      await locator.blur();

      logger.info(`Successfully removed focus from '${fieldName}'`);
    } catch (error) {
      ErrorUtils.handleError(
        `Failed to remove focus from '${fieldName}'`,
        error,
      );
    }
  }

  /**
   * Get input value.
   */
  static async getValue(
    locator: Locator,
    fieldName = "Input",
  ): Promise<string> {
    logger.info(`Reading value from '${fieldName}'`);

    try {
      const value = await locator.inputValue();

      logger.info(`Successfully read value from '${fieldName}'`);

      return value;
    } catch (error) {
      ErrorUtils.handleError(`Failed to read value from '${fieldName}'`, error);
    }
  }
}
