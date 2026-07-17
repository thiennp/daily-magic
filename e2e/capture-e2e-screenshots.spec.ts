import { test } from "@playwright/test";

import { signInTestAccount } from "./helpers/signInTestAccount";

const outputDir = "public/showcases/e2e";

const captureViewport = async (
  page: import("@playwright/test").Page,
  name: string,
): Promise<void> => {
  await page.screenshot({
    path: `${outputDir}/${name}.png`,
    fullPage: false,
  });
};

test.describe("E2E showcase screenshots @e2e-capture", () => {
  test("capture authenticated flows", async ({ page }) => {
    await signInTestAccount(page, "test-screenshot-admin@agentwitch.com");
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto("/login");
    await captureViewport(page, "01-login");

    await page.goto("/");
    await page.waitForTimeout(2000);
    await captureViewport(page, "02-home");

    await page.goto("/marketplace");
    await page.waitForLoadState("networkidle");
    await captureViewport(page, "03-marketplace");

    await page.goto("/library");
    await page.waitForLoadState("networkidle");
    await captureViewport(page, "04-library");

    await page.goto("/automations");
    await page.waitForLoadState("networkidle");
    await captureViewport(page, "05-automations");

    await page.goto("/reports");
    await page.waitForLoadState("networkidle");
    await captureViewport(page, "06-reports");

    await page.goto("/admin/groups");
    await page.waitForLoadState("networkidle");
    await captureViewport(page, "07-admin-companies");
  });
});
