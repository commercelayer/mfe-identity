import { expect, test } from "@playwright/test"

import {
  buildLoginUrl,
  buildRandomCredentials,
  e2eScope,
  expectedReturnUrl,
} from "./test-helpers"

test.describe
  .serial("app flows", () => {
    // Credentials are generated in beforeAll (not at module level) so that Playwright
    // guarantees the same values are used across all tests in this serial group,
    // regardless of whether the module is re-evaluated between tests.
    let customerEmail: string
    let customerPassword: string

    test.beforeAll(() => {
      const credentials = buildRandomCredentials()
      customerEmail = credentials.email.toLowerCase()
      customerPassword = credentials.password
    })

    test("signs up a new customer and redirects to login", async ({ page }) => {
      await page.goto(buildLoginUrl())

      await expect(page.getByRole("heading", { name: "Login" })).toBeVisible()

      await page.getByRole("link", { name: "Sign up for free" }).click()

      await expect(page.getByRole("heading", { name: "Sign up" })).toBeVisible()

      await page.getByLabel("Email").fill(customerEmail)
      await page.getByLabel("Password", { exact: true }).fill(customerPassword)
      await page.getByLabel("Confirm password").fill(customerPassword)

      // After successful signup the app must redirect to the login page (not the returnUrl):
      // the customer needs to log in explicitly to receive the access token.
      const waitForLoginRedirect = page.waitForURL(
        (url) =>
          url.pathname.includes("/identity/login") &&
          url.searchParams.get("customerEmail") === customerEmail,
      )

      await page.getByRole("button", { name: "Sign up" }).click()
      await waitForLoginRedirect

      await expect(page.getByRole("heading", { name: "Login" })).toBeVisible()
      await expect(page.getByLabel("Email")).toHaveValue(customerEmail)
    })

    test("logs in with the just-registered customer and redirects to return URL", async ({
      page,
    }) => {
      test.setTimeout(120_000)

      if (!customerEmail || !customerPassword) {
        throw new Error(
          "Expected signup test to create shared credentials before login test runs",
        )
      }

      await page.goto(buildLoginUrl())

      await expect(page.getByRole("heading", { name: "Login" })).toBeVisible()

      await page.getByLabel("Email").fill(customerEmail)
      await page.getByLabel("Password", { exact: true }).fill(customerPassword)

      // Register both waiters BEFORE clicking to avoid any race condition.
      //
      // waitUntil: "commit" makes waitForURL resolve as soon as the browser commits
      // the navigation (URL changes), without waiting for the external page to load.
      // This lets us read page.url() with the full token params before Google can
      // issue any further redirects.
      //
      // "Invalid credentials" is not expected: if the login form shows that alert,
      // authentication failed and we fail fast with a clear error instead of timing out.
      const waitForRedirect = page.waitForURL(
        (url) => url.origin === expectedReturnUrl.origin,
        { waitUntil: "commit" },
      )
      const waitForInvalidCredentials = page
        .getByText("Invalid credentials")
        .waitFor()
        .then(() => {
          throw new Error(
            "Login failed with 'Invalid credentials'. Check that E2E_CLIENTID supports the password grant flow.",
          )
        })

      await page.getByRole("button", { name: "Login" }).click()
      await Promise.race([waitForRedirect, waitForInvalidCredentials])

      const destination = new URL(page.url())
      expect(destination.searchParams.get("accessToken")).toBeTruthy()
      expect(destination.searchParams.get("scope")).toBe(e2eScope)
      expect(destination.searchParams.get("expires")).toBeTruthy()
    })
  })
