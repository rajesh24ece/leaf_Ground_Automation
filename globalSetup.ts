import fs from "fs";
import { logger } from "./utils/Logger";
import { AllureEnvironment } from "./utils/AllureEnvironment";

async function globalSetup() {
  const folders = ["playwright-report", "test-results", "screenshots", "allure-results"];

  folders.forEach((folder) => {
    if (fs.existsSync(folder)) {
      fs.rmSync(folder, { recursive: true, force: true });
      logger.info(`Deleted: ${folder}`);
    }
  });
  AllureEnvironment.create();
}

export default globalSetup;
