import { defineConfig, devices } from "@playwright/test";
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL,
    ...(process.env.PLAYWRIGHT_CHANNEL
      ? { channel: process.env.PLAYWRIGHT_CHANNEL }
      : {}),
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "mobile",
      use: {
        ...devices["iPhone 13"],
        defaultBrowserType: "chromium",
      },
    },
  ],
  webServer: {
    command: process.env.PLAYWRIGHT_SERVER_COMMAND ?? "npm run dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    env: {
      DEMO_MODE: "true",
      APP_URL: baseURL,
    },
    timeout: 120000,
  },
});
