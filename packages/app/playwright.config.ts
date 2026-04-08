import path from "node:path"
import { devices, type PlaywrightTestConfig } from "@playwright/test"
import dotenv from "dotenv"

dotenv.config({ path: path.resolve(__dirname, ".env.local") })

const e2eBaseUrl = process.env.E2E_BASE_URL ?? "http://localhost:5173"
const devServerPort = new URL(e2eBaseUrl).port || "5173"

const config: PlaywrightTestConfig = {
  // Timeout per test
  timeout: 60 * 1000,
  // Test directory
  testDir: "specs/e2e",
  retries: 1,
  // Artifacts folder where screenshots, videos, and traces are stored.
  outputDir: "test-results/",
  workers: 1,
  maxFailures: 2,
  fullyParallel: true,

  // Run your local dev server before starting the tests:
  // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  webServer: {
    command: `pnpm dev --port ${devServerPort} --strictPort`,
    port: Number(devServerPort),
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    // Retry a test if it's failing with enabled tracing. This allows you to analyse the DOM, console logs, network traffic etc.
    // More information: https://playwright.dev/docs/trace-viewer
    trace: "on-first-retry",
    headless: !!process.env.CI,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    // Artifacts
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: e2eBaseUrl,
      },
    },
  ],
}
export default config
