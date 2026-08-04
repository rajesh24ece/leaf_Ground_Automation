import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config({
  path: path.resolve(__dirname, ".env.qe"),
  quiet: true,
});

const isDocker = fs.existsSync("/.dockerenv");

export default defineConfig({
  testDir: "./tests",

  // Cleanup before execution
  globalSetup: require.resolve("./globalSetup"),

  // Store screenshots, traces, videos etc.
  outputDir: "test-results",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: Number(process.env.WORKERS) || 1,

  timeout: 30 * 1000,

  expect: {
    timeout: 10 * 1000,
  },

  reporter: [
    ["list"],
    ["html"],
    ["allure-playwright"],
    ["json", { outputFile: "test-results/test-results.json" }],
  ],

  use: {
    baseURL: process.env.BASE_URL,

    // headless in CI (GitHub Actions/Jenkins set CI=true) or inside any Docker container
    // (auto-detected via /.dockerenv) — no manual env var required for the Docker case
    headless: process.env.CI === "true" || isDocker,

    trace: "on-first-retry",

    screenshot: "on",

    video: "on",

    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    // {
    //   name: "firefox",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //   },
    // },

    // {
    //   name: "webkit",
    //   use: {
    //     ...devices["Desktop Safari"],
    //   },
    // },
  ],
});