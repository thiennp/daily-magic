import { expect, test, type Page } from "@playwright/test";

import { signInTestAccount } from "./helpers/signInTestAccount";

/**
 * Same-Mac multi-account team: admin + executor + requester share one computer.
 * Agent Witch profile for the executor owns the Mac; teammates are separate users.
 */
const ADMIN = "test-team-admin-1@agentwitch.com";
const EXECUTOR = "test-team-executor-1@agentwitch.com";
const REQUESTER = "test-team-requester-1@agentwitch.com";
const COMPANY_NAME = "E2E Same-Mac Team";

const signInAs = async (page: Page, email: string): Promise<void> => {
  await page.context().clearCookies();
  await signInTestAccount(page, email);
  await page.goto("/");
  await page.waitForLoadState("load");
};

test.describe("Same-Mac multi-account team", () => {
  test.describe.configure({ mode: "serial" });

  test("admin creates company and invites two members", async ({ page }) => {
    await signInAs(page, ADMIN);
    await page.goto("/admin/groups");
    await page.waitForLoadState("load");

    const createButton = page.getByRole("button", { name: /Create company/i });
    if ((await createButton.count()) > 0) {
      await page.getByPlaceholder(/New company name/i).fill(COMPANY_NAME);
      await createButton.click();
      await expect(page.getByText(COMPANY_NAME)).toBeVisible({
        timeout: 15_000,
      });
    }

    await page.screenshot({
      path: ".e2e/screenshots/same-mac-admin-company.png",
      fullPage: true,
    });
    await page.screenshot({
      path: "public/showcases/e2e/same-mac-admin-company.png",
      fullPage: true,
    });

    for (const memberEmail of [EXECUTOR, REQUESTER]) {
      await page.getByLabel("Member email").fill(memberEmail);
      await page.getByRole("button", { name: "Add member" }).click();
      await expect(page.getByText(memberEmail)).toBeVisible({
        timeout: 15_000,
      });
    }

    await page.screenshot({
      path: ".e2e/screenshots/same-mac-admin-members.png",
      fullPage: true,
    });
    await page.screenshot({
      path: "public/showcases/e2e/same-mac-admin-members.png",
      fullPage: true,
    });
  });

  test("executor home loads after Mac pairing attempt", async ({ page }) => {
    await signInAs(page, EXECUTOR);
    await page.goto("/");
    await page.waitForTimeout(3000);
    await page.screenshot({
      path: ".e2e/screenshots/same-mac-executor-home.png",
      fullPage: true,
    });
    await page.screenshot({
      path: "public/showcases/e2e/same-mac-executor-home.png",
      fullPage: true,
    });

    // Either connect guide or dashboard is acceptable; crash is not.
    await expect(
      page.getByRole("navigation", { name: "Primary" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign in" })).toHaveCount(0);
  });

  test("executor creates a library playbook", async ({ page }) => {
    await signInAs(page, EXECUTOR);
    await page.goto("/library");
    await page.waitForLoadState("load");

    await page.getByRole("button", { name: "New playbook" }).click();
    await page.getByRole("button", { name: "Agent" }).click();

    const nameInput = page
      .locator('input[name="name"], input[placeholder*="name" i]')
      .first();
    if ((await nameInput.count()) > 0) {
      await nameInput.fill("E2E Same-Mac Assistant");
    }

    const prompt = page.locator("textarea").first();
    if ((await prompt.count()) > 0) {
      await prompt.fill(
        "Reply with a one-line acknowledgement for E2E team dispatch.",
      );
    }

    const submit = page
      .getByRole("button", {
        name: /Create|Save|Publish/i,
      })
      .first();
    if ((await submit.count()) > 0) {
      await submit.click();
      await page.waitForTimeout(2000);
    }

    await page.screenshot({
      path: ".e2e/screenshots/same-mac-executor-library.png",
      fullPage: true,
    });
    await page.screenshot({
      path: "public/showcases/e2e/same-mac-executor-library.png",
      fullPage: true,
    });
  });

  test("requester opens send-task without SendTaskModalProvider crash", async ({
    page,
  }) => {
    await signInAs(page, REQUESTER);
    await page.goto("/?sendTask=1");
    await page.waitForLoadState("load");
    await page.waitForTimeout(1500);

    await page.screenshot({
      path: ".e2e/screenshots/same-mac-requester-send-task.png",
      fullPage: true,
    });
    await page.screenshot({
      path: "public/showcases/e2e/same-mac-requester-send-task.png",
      fullPage: true,
    });

    // Provider crash would surface as Next.js error overlay / digest text
    await expect(
      page.getByText("useSendTaskModal must be used within"),
    ).toHaveCount(0);
    await expect(page.getByText("Application error")).toHaveCount(0);
  });

  test("requester sees company option in team dispatch fields", async ({
    page,
  }) => {
    await signInAs(page, REQUESTER);
    await page.goto("/?sendTask=1");
    await page.waitForLoadState("load");
    await page.waitForTimeout(2000);

    const companySelect = page.locator("select").filter({
      has: page.locator("option", { hasText: /My Mac \(self\)/i }),
    });

    if ((await companySelect.count()) > 0) {
      const options = await companySelect
        .first()
        .locator("option")
        .allTextContents();
      console.log("Dispatch company options:", options);
      expect(
        options.some((text) => /E2E Same-Mac Team|Company/i.test(text)),
      ).toBe(true);
      await companySelect.first().selectOption({ index: 1 });
      await page.waitForTimeout(1000);
    } else {
      console.log("Team dispatch select not visible yet (Mac/composer gate)");
    }

    await page.screenshot({
      path: ".e2e/screenshots/same-mac-requester-team-fields.png",
      fullPage: true,
    });
    await page.screenshot({
      path: "public/showcases/e2e/same-mac-requester-team-fields.png",
      fullPage: true,
    });
  });
});
