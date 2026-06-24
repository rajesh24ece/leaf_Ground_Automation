import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, ".env.leafground"),
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

  reporter: [
    ["html"],
    ["allure-playwright"],
    ["json", { outputFile: "test-results.json" }],
  ],

  use: {
    baseURL: process.env.BASE_URL,

    trace: "on-first-retry",

    headless: !!process.env.CI,

    screenshot: "on",

    video: "retain-on-failure",
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
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    // {
    //   name: "Mobile Chrome",
    //   use: { ...devices["Pixel 5"] },
    // },

    // {
    //   name: "Mobile Safari",
    //   use: { ...devices["iPhone 12"] },
    // },
  ],
});
