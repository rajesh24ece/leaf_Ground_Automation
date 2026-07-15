import { Locator } from "@playwright/test";
import { logger } from "../utils/logger";
import { ErrorUtils } from "../utils/errorUtils";

export class InputHelper {
  /**
   * Fill an input field.
   */
  static async fill(locator: Locator, value: string | number): Promise<void> {
    try {
      await locator.fill(String(value));
    } catch (error) {
      ErrorUtils.handleError("Failed to fill the input field.", error);
    }
  }

  /**
   * Fill and press Enter.
   */
  static async fillAndPressEnter(locator: Locator, value: string, fieldName = "Input"): Promise<void> {
    logger.info(`Filling '${fieldName}' and pressing Enter`);
    try {
      await locator.fill(value);
      await locator.press("Enter");
    } catch (error) {
      ErrorUtils.handleError(`Failed to fill '${fieldName}' and press Enter`, error);
    }
  }

  /**
   * Clear an input field.
   */
  static async clear(locator: Locator): Promise<void> {
    try {
      await locator.clear();
    } catch (error) {
      ErrorUtils.handleError(`Failed to clear '${locator}'`, error);
    }
  }

  /**
   * Append text.
   */
  static async append(locator: Locator, value: string, fieldName = "Input"): Promise<void> {
    logger.info(`Appending text to '${fieldName}'`);
    try {
      const currentValue = await locator.inputValue();
      await locator.fill(currentValue + value);
    } catch (error) {
      ErrorUtils.handleError(`Failed to append text to '${fieldName}'`, error);
    }
  }

  /**
   * Type text sequentially.
   */
  static async pressSequentially(locator: Locator, value: string, delay?: number): Promise<void> {
    try {
      await locator.pressSequentially(value, { delay });
    } catch (error) {
      ErrorUtils.handleError(`Failed to type the value '${value}'`, error);
    }
  }

  /**
   * Replace text.
   */
  static async replace(locator: Locator, oldValue: string, newValue: string, fieldName = "Input"): Promise<void> {
    try {
      const currentValue = await locator.inputValue();
      await locator.fill(currentValue.replace(oldValue, newValue));
    } catch (error) {
      ErrorUtils.handleError(`Failed to replace text in '${fieldName}'`, error);
    }
  }

  /**
   * Copy selected text.
   */
  static async copy(locator: Locator, fieldName = "Input"): Promise<void> {
    try {
      await locator.press(process.platform === "darwin" ? "Meta+C" : "Control+C");
    } catch (error) {
      ErrorUtils.handleError(`Failed to copy text from '${fieldName}'`, error);
    }
  }

  /**
   * Paste text.
   */
  static async paste(locator: Locator, fieldName = "Input"): Promise<void> {
    try {
      await locator.press(process.platform === "darwin" ? "Meta+V" : "Control+V");
    } catch (error) {
      ErrorUtils.handleError(`Failed to paste text into '${fieldName}'`, error);
    }
  }

  /**
   * Cut selected text.
   */
  static async cut(locator: Locator, fieldName = "Input"): Promise<void> {
    try {
      await locator.press(process.platform === "darwin" ? "Meta+X" : "Control+X");
    } catch (error) {
      ErrorUtils.handleError(`Failed to cut text from '${fieldName}'`, error);
    }
  }

  /**
   * Select all text.
   */
  static async selectAll(locator: Locator, fieldName = "Input"): Promise<void> {
    try {
      await locator.press(process.platform === "darwin" ? "Meta+A" : "Control+A");
    } catch (error) {
      ErrorUtils.handleError(`Failed to select all text from '${fieldName}'`, error);
    }
  }

  /**
   * Focus an input field.
   */
  static async focus(locator: Locator, fieldName = "Input"): Promise<void> {
    try {
      await locator.focus();
    } catch (error) {
      ErrorUtils.handleError(`Failed to focus '${fieldName}'`, error);
    }
  }

  /**
   * Blur an input field.
   */
  static async blur(locator: Locator, fieldName = "Input"): Promise<void> {
    try {
      await locator.blur();
    } catch (error) {
      ErrorUtils.handleError(`Failed to remove focus from '${fieldName}'`, error);
    }
  }

  /**
   * Get input value.
   */
  static async getValue(locator: Locator, fieldName = "Input"): Promise<string> {
    try {
      const value = await locator.inputValue();
      return value;
    } catch (error) {
      ErrorUtils.handleError(`Failed to read value from '${fieldName}'`, error);
    }
  }
}
