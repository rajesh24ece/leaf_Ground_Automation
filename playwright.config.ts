import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, ".env.qe"),
  quiet: true,
});

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

  reporter: [["list"], ["html"], ["allure-playwright"], ["json", { outputFile: "test-results/test-results.json" }]],

  use: {
    baseURL: process.env.BASE_URL,

    // true in CI, false locally — driven by CI env var set in workflow
    headless: !!process.env.CI,

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

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],
});
