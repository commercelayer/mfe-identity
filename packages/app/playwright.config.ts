import path from "node:path"
import { devices, type PlaywrightTestConfig } from "@playwright/test"
import dotenv from "dotenv"

dotenv.config({ path: path.resolve(__dirname, ".env.local") })

const parsedE2eBaseUrl = new URL(
  process.env.E2E_BASE_URL ?? "http://localhost:5173",
)
if (!parsedE2eBaseUrl.port) {
  parsedE2eBaseUrl.port = "5173"
}
const devServerPort = parsedE2eBaseUrl.port

const config: PlaywrightTestConfig = {
  // Test directory
  testDir: "specs/e2e",
  // Timeout per test
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  // Artifacts folder where screenshots, videos, and traces are stored.
  outputDir: "test-results/",
  // Run your local dev server before starting the tests:
  // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  webServer: {
    command: `pnpm dev --port ${devServerPort} --strictPort`,
    port: Number(devServerPort),
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    // Retry a test if its failing with enabled tracing. This allows you to analyse the DOM, console logs, network traffic etc.
    // More information: https://playwright.dev/docs/trace-viewer
    trace: "retry-with-trace",
    headless: false,
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
        // Any Chromium-specific options.
        headless: true,
      },
    },
  ],
}
export default config
