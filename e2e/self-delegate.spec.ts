import { expect, test, type Page } from "@playwright/test";

import { signInTestAccount } from "./helpers/signInTestAccount";

/**
 * Single-person self-delegate: pair Mac → send task to own Mac → Job history.
 * Requires Agent Witch profile for SELF email connected to localhost WS.
 */
const SELF = "test-self-1@agentwitch.com";
const TASK_MARKER = `E2E self-delegate ${Date.now()}`;

const signInAs = async (page: Page, email: string): Promise<void> => {
  await page.context().clearCookies();
  await signInTestAccount(page, email);
  await page.goto("/");
  await page.waitForLoadState("networkidle");
};

test.describe("Self-delegate on own Mac", () => {
  test.describe.configure({ mode: "serial", timeout: 180_000 });

  test("home auto-links Mac for self account", async ({ page }) => {
    await signInAs(page, SELF);
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Auto-link polls the local wake server; wait until Home shows a device.
    const devicesHeading = page.getByRole("heading", { name: "Your Devices" });
    const connectedCopy = page.getByText(/\d+\s+connected/i);
    for (let attempt = 0; attempt < 20; attempt += 1) {
      if (
        (await devicesHeading.isVisible().catch(() => false)) &&
        (await connectedCopy.isVisible().catch(() => false))
      ) {
        break;
      }
      await page.waitForTimeout(1500);
      await page.reload();
      await page.waitForLoadState("networkidle");
    }

    await expect(devicesHeading).toBeVisible({ timeout: 5_000 });
    await expect(connectedCopy).toBeVisible({ timeout: 5_000 });

    await page.screenshot({
      path: ".e2e/screenshots/self-delegate-home-paired.png",
      fullPage: false,
    });
  });

  test("send custom task to own Mac and see it in Job history", async ({
    page,
  }) => {
    await signInAs(page, SELF);
    await page.goto("/?sendTask=1");
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", { name: "Send a task" }),
    ).toBeVisible({
      timeout: 15_000,
    });

    // Mac picker (skip if auto-completed for single own device)
    const macHeading = page.getByRole("heading", {
      name: /Which Mac should run this/i,
    });
    if (await macHeading.isVisible().catch(() => false)) {
      await page
        .getByRole("button", { name: /Online/i })
        .first()
        .click();
    }

    // Workflow / custom picker
    const pickerHeading = page.getByRole("heading", {
      name: /Choose a workflow or agent/i,
    });
    if (await pickerHeading.isVisible().catch(() => false)) {
      await page.getByRole("button", { name: /Custom task/i }).click();
    }

    // Writer agent — custom path starts a live CLI session immediately
    const writerHeading = page.getByRole("heading", {
      name: /Choose an AI on your Mac/i,
    });
    if (await writerHeading.isVisible().catch(() => false)) {
      await page.getByRole("button", { name: /Claude \(terminal\)/i }).click();
    }

    const followUp = page.getByRole("textbox", {
      name: /Follow-up message for the live terminal/i,
    });
    await expect(followUp).toBeVisible({ timeout: 90_000 });
    await expect(
      page.getByText(/Claude is ready|Send a task from the box below/i),
    ).toBeVisible({ timeout: 90_000 });

    await page.screenshot({
      path: ".e2e/screenshots/self-delegate-composer-ready.png",
      fullPage: false,
    });

    const firstDispatch = page.waitForResponse(
      (response) =>
        response.url().includes("/api/agent-runs/dispatch") &&
        response.request().method() === "POST",
      { timeout: 60_000 },
    );

    await followUp.fill(
      `Remember the codeword ${TASK_MARKER}. Reply with exactly: ack1.`,
    );
    await page.getByRole("button", { name: "Send feedback" }).click();

    const firstBody = (await (await firstDispatch).json()) as {
      ok?: boolean;
      run?: { prompt?: string };
    };
    expect(firstBody.ok).toBe(true);
    expect(firstBody.run?.prompt ?? "").toContain(TASK_MARKER);

    await expect(page.getByText(TASK_MARKER).first()).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByText(/ack1/i).first()).toBeVisible({
      timeout: 120_000,
    });

    await page.screenshot({
      path: ".e2e/screenshots/self-delegate-live-terminal.png",
      fullPage: false,
    });

    const secondDispatch = page.waitForResponse(
      (response) =>
        response.url().includes("/api/agent-runs/dispatch") &&
        response.request().method() === "POST",
      { timeout: 60_000 },
    );

    await followUp.fill(
      "What was the codeword? Reply with only that codeword.",
    );
    await page.getByRole("button", { name: "Send feedback" }).click();
    expect((await secondDispatch).ok()).toBe(true);

    await page.screenshot({
      path: ".e2e/screenshots/self-delegate-live-terminal-continued.png",
      fullPage: false,
    });

    await page.goto("/reports");
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", { name: "Job history" }),
    ).toBeVisible();
    await expect(page.getByText(TASK_MARKER).first()).toBeVisible({
      timeout: 30_000,
    });
    // Second turn was dispatched as a continued Claude thread (see agent log: continue).
    await expect(page.getByText(/What was the codeword/i).first()).toBeVisible({
      timeout: 30_000,
    });

    await page.screenshot({
      path: ".e2e/screenshots/self-delegate-job-history.png",
      fullPage: false,
    });
  });
});
