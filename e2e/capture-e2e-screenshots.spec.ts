import { test } from "@playwright/test";

import { signInTestAccount } from "./helpers/signInTestAccount";

const outputDir = "public/showcases/e2e";

const captureFullPage = async (
  page: import("@playwright/test").Page,
  name: string,
): Promise<void> => {
  await page.screenshot({
    path: `${outputDir}/${name}.png`,
    fullPage: true,
  });
};

const gotoSettled = async (
  page: import("@playwright/test").Page,
  path: string,
): Promise<void> => {
  await page.goto(path, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("load");
  // Avoid networkidle — authenticated pages keep WS/poll traffic open.
  await page.waitForTimeout(1500);
};

test.describe("E2E showcase screenshots @e2e-capture", () => {
  test.describe.configure({ timeout: 120_000 });

  test("capture authenticated flows", async ({ page }) => {
    await signInTestAccount(page, "test-screenshot-admin@agentwitch.com");
    await page.setViewportSize({ width: 1440, height: 900 });

    await gotoSettled(page, "/login");
    await captureFullPage(page, "01-login");

    await gotoSettled(page, "/");
    await captureFullPage(page, "02-home");

    await gotoSettled(page, "/marketplace");
    await captureFullPage(page, "03-marketplace");

    await gotoSettled(page, "/library");
    await captureFullPage(page, "04-library");

    await gotoSettled(page, "/automations");
    await captureFullPage(page, "05-automations");

    await gotoSettled(page, "/reports");
    await captureFullPage(page, "06-reports");

    await gotoSettled(page, "/admin/groups");
    await captureFullPage(page, "07-admin-companies");
  });
});
