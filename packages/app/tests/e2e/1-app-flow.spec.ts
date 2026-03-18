import { expect, test } from "@playwright/test"

import {
  buildLoginUrl,
  buildRandomCredentials,
  e2eScope,
  expectedReturnUrl,
} from "./test-helpers"

/**
 * sharedCredentials is used to store the credentials of the customer
 * created in the first test, so that they can be used in the second
 * test to verify the login flow. Since the tests are run in serial,
 * we can safely rely on this shared state without any race conditions.
 *
 * This approach is possible because the tests are defined within
 * a `describe.serial` block, to be run in the same worker to not lose
 * the shared state variables used.
 */
let sharedCredentials: { email: string; password: string }

test.describe
  .serial("app flows", () => {
    test("signs up a new customer and checks return URL", async ({ page }) => {
      test.setTimeout(120_000)

      sharedCredentials = buildRandomCredentials()
      const { email, password } = sharedCredentials

      await page.goto(buildLoginUrl())

      await expect(page.getByRole("heading", { name: "Login" })).toBeVisible()

      await page.getByRole("link", { name: "Sign up for free" }).click()

      await expect(page.getByRole("heading", { name: "Sign up" })).toBeVisible()

      await page.getByLabel("Email").fill(email)
      await page.getByLabel("Password", { exact: true }).fill(password)
      await page.getByLabel("Confirm password").fill(password)
      await page.getByRole("button", { name: "Sign up" }).click()

      await page.waitForURL((url) => {
        const target = new URL(url.toString())

        return (
          target.origin === expectedReturnUrl.origin &&
          target.pathname === expectedReturnUrl.pathname
        )
      })

      const destination = new URL(page.url())

      expect(destination.searchParams.get("accessToken")).toBeTruthy()
      expect(destination.searchParams.get("scope")).toBe(e2eScope)
      expect(destination.searchParams.get("expires")).toBeTruthy()
    })

    test("logs in with the just-registered customer and checks return URL", async ({
      page,
    }) => {
      test.setTimeout(60_000)

      const { email, password } = sharedCredentials

      await page.goto(buildLoginUrl())

      await expect(page.getByRole("heading", { name: "Login" })).toBeVisible()

      await page.getByLabel("Email").fill(email)
      await page.getByLabel("Password", { exact: true }).fill(password)
      await page.getByRole("button", { name: "Login" }).click()

      await page.waitForURL((url) => {
        const target = new URL(url.toString())

        return (
          target.origin === expectedReturnUrl.origin &&
          target.pathname === expectedReturnUrl.pathname
        )
      })

      const destination = new URL(page.url())
      expect(destination.searchParams.get("accessToken")).toBeTruthy()
      expect(destination.searchParams.get("scope")).toBe(e2eScope)
    })
  })
