import fs from "fs";
import os from "os";
import path from "path";
import { version as playwrightVersion } from "@playwright/test/package.json";
import { GitUtils } from "./gitUtils";

export class AllureEnvironment {
  static async create(): Promise<void> {
    const branch = await GitUtils.getBranch();
    const commit = await GitUtils.getCommit();

    const execution = process.env.CI ? "GitHub Actions" : "Local";

    const data = `
Framework=Playwright
Language=TypeScript
Playwright=${playwrightVersion}
OS=${os.type()} ${os.release()}
Execution=${execution}
Browser=Chromium
BaseURL=${process.env.BASE_URL}
NodeVersion=${process.version}
Workers=${process.env.WORKERS ?? 1}
GitBranch=${branch}
GitCommit=${commit}
Tester=Rajesh Kumar
`;

    // Create allure-results folder if it doesn't exist
    const allureResultsPath = path.join(process.cwd(), "allure-results");

    if (!fs.existsSync(allureResultsPath)) {
      fs.mkdirSync(allureResultsPath, { recursive: true });
    }

    // Write environment.properties
    fs.writeFileSync(path.join(allureResultsPath, "environment.properties"), data.trim(), "utf8");
  }
}
