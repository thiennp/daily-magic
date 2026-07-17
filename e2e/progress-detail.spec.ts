import { expect, test, type Page } from "@playwright/test";

import { signInTestAccount } from "./helpers/signInTestAccount";

/**
 * Verifies Send-a-task shows agent-authored [[PROGRESS]] step detail.
 * Requires Agent Witch profile for SELF email on localhost WS.
 */
const SELF = "test-self-1@agentwitch.com";

const signInAs = async (page: Page, email: string): Promise<void> => {
  await page.context().clearCookies();
  await signInTestAccount(page, email);
  await page.goto("/");
  await page.waitForLoadState("networkidle");
};

test.describe("Progress detail on own Mac", () => {
  test.describe.configure({ mode: "serial", timeout: 240_000 });

  test("shows agent [[PROGRESS]] titles and detail lines", async ({ page }) => {
    await signInAs(page, SELF);
    await page.goto("/?sendTask=1");
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", { name: "Send a task" }),
    ).toBeVisible({ timeout: 15_000 });

    const macHeading = page.getByRole("heading", {
      name: /Which Mac should run this/i,
    });
    if (await macHeading.isVisible().catch(() => false)) {
      await page
        .getByRole("button", { name: /Online/i })
        .first()
        .click();
    }

    const pickerHeading = page.getByRole("heading", {
      name: /Choose a workflow or agent/i,
    });
    if (await pickerHeading.isVisible().catch(() => false)) {
      await page.getByRole("button", { name: /Custom task/i }).click();
    }

    const writerHeading = page.getByRole("heading", {
      name: /Choose an AI on your Mac/i,
    });
    if (await writerHeading.isVisible().catch(() => false)) {
      await page.getByRole("button", { name: /Claude \(terminal\)/i }).click();
    }

    const followUp = page.getByRole("textbox", {
      name: /Follow-up message for your agent/i,
    });
    await expect(followUp).toBeVisible({ timeout: 90_000 });
    await expect(page.getByText("Progress on your Mac")).toBeVisible({
      timeout: 90_000,
    });

    await page.screenshot({
      path: ".e2e/screenshots/progress-detail-ready.png",
      fullPage: false,
    });

    const dispatch = page.waitForResponse(
      (response) =>
        response.url().includes("/api/agent-runs/dispatch") &&
        response.request().method() === "POST",
      { timeout: 60_000 },
    );

    await followUp.fill(
      [
        "Follow the progress marker format from your instructions.",
        "Do NOT emit [[AWAITING_INPUT]] or ask any question.",
        "Emit exactly these two progress blocks first (same wording):",
        "[[PROGRESS]]",
        "Checking the request",
        "Confirmed the user wants a short progress demo",
        "",
        "[[PROGRESS]]",
        "Preparing the reply",
        "Writing the final acknowledgement next",
        "",
        "Then reply with exactly: PROGRESS_DEMO_OK",
        "Do not invent other progress titles.",
      ].join("\n"),
    );
    await page.getByRole("button", { name: "Send message" }).click();

    const body = (await (await dispatch).json()) as {
      ok?: boolean;
      run?: { prompt?: string };
    };
    expect(body.ok).toBe(true);
    expect(body.run?.prompt ?? "").toContain("[[PROGRESS]]");

    const progressFeed = page
      .locator("div")
      .filter({
        has: page.getByRole("heading", { name: "Progress on your Mac" }),
      })
      .first();

    await expect(
      progressFeed.getByText("Checking the request", { exact: true }),
    ).toBeVisible({ timeout: 120_000 });
    await expect(
      progressFeed.getByText("Confirmed the user wants a short progress demo"),
    ).toBeVisible({ timeout: 30_000 });

    await progressFeed.screenshot({
      path: ".e2e/screenshots/progress-detail-steps.png",
    });
    await page.screenshot({
      path: ".e2e/screenshots/progress-detail-steps-full.png",
      fullPage: false,
    });

    await expect(
      progressFeed.getByText("Preparing the reply", { exact: true }),
    ).toBeVisible({ timeout: 120_000 });
    await expect(
      progressFeed.getByText("Writing the final acknowledgement next"),
    ).toBeVisible({ timeout: 30_000 });

    await progressFeed.screenshot({
      path: ".e2e/screenshots/progress-detail-second-step.png",
    });
    await page.screenshot({
      path: ".e2e/screenshots/progress-detail-second-step-full.png",
      fullPage: false,
    });

    await expect(progressFeed.getByText(/PROGRESS_DEMO_OK/i)).toBeVisible({
      timeout: 120_000,
    });

    await progressFeed.screenshot({
      path: ".e2e/screenshots/progress-detail-finished.png",
    });
    await page.screenshot({
      path: ".e2e/screenshots/progress-detail-finished-full.png",
      fullPage: false,
    });
  });
});
