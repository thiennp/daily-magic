import { expect, test } from "@playwright/test";

import { signInTestAccount } from "./helpers/signInTestAccount";

test.describe("Test account auth @smoke", () => {
  test("UI login redirects home for test*@agentwitch.com", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("test-playwright-login@agentwitch.com");
    await page.getByRole("button", { name: "Email me a sign-in link" }).click();
    await page.waitForURL("/");
    await expect(page.getByRole("link", { name: "Sign in" })).toHaveCount(0);
  });

  test("API login helper establishes session", async ({ page }) => {
    await signInTestAccount(page, "test-playwright-api@agentwitch.com");
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Sign in" })).toHaveCount(0);
  });
});
