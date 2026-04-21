import { expect, test } from "@playwright/test"

import { buildLoginUrl } from "./test-helpers"

test.describe("app setup", () => {
  test("loads login page when required params are present", async ({
    page,
  }) => {
    await page.goto(buildLoginUrl())

    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible()
    await expect(page.getByText("Missing required parameter.")).toHaveCount(0)
  })

  test("shows error when clientId is missing", async ({ page }) => {
    await page.goto(buildLoginUrl({ clientId: undefined }))

    await expect(page.getByText("Missing required parameter.")).toBeVisible()
  })

  test("shows error when scope is missing", async ({ page }) => {
    await page.goto(buildLoginUrl({ scope: undefined }))

    await expect(page.getByText("Missing required parameter.")).toBeVisible()
  })

  test("shows error when returnUrl is missing", async ({ page }) => {
    await page.goto(buildLoginUrl({ returnUrl: undefined }))

    await expect(page.getByText("Missing required parameter.")).toBeVisible()
  })

  test("supports encoded returnUrl query values", async ({ page }) => {
    await page.goto(
      buildLoginUrl({
        returnUrl: "https://www.google.com/search?q=commerce layer",
      }),
    )

    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible()
    await expect(page.getByText("Missing required parameter.")).toHaveCount(0)
  })
})
