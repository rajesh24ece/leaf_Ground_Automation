import fs from "fs";
import { logger } from "./utils/logger";
import { AllureEnvironment } from "./utils/allureEnvironment";
import path from "path/win32";

async function globalSetup() {
  const folders = ["playwright-report", "test-results", "screenshots", "allure-results"];

  folders.forEach((folder) => {
  if (fs.existsSync(folder)) {
    const items = fs.readdirSync(folder);
    for (const item of items) {
      fs.rmSync(path.join(folder, item), { recursive: true, force: true });
    }
    logger.info(`Cleared: ${folder}`);
  } else {
    fs.mkdirSync(folder, { recursive: true });
  }
});
  AllureEnvironment.create();
}

export default globalSetup;
