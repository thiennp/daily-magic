import { expect, test, type Page } from "@playwright/test";

import {
  FREELANCER_PROPOSAL_MOCK,
  prepareFreelancerPortfolioFixture,
} from "./helpers/prepareFreelancerPortfolioFixture";
import { signInTestAccount } from "./helpers/signInTestAccount";

/**
 * Marketplace → install official workflow → fill realistic inputs → run on own Mac.
 * Uses Freelancer client proposal with mock portfolio files on disk.
 */
const SELF = "test-self-1@agentwitch.com";
const WORKFLOW_NAME = "Freelancer client proposal";
const TASK_MARKER = `E2E-PROP-${Date.now()}`;

const signInAs = async (page: Page, email: string): Promise<void> => {
  await page.context().clearCookies();
  await signInTestAccount(page, email);
  await page.goto("/");
  await page.waitForLoadState("load");
};

const fillLabeledField = async (
  page: Page,
  label: RegExp,
  value: string,
): Promise<void> => {
  // Mobile stepper + desktop fields both render; prefer the visible control.
  await page.getByLabel(label).locator("visible=true").fill(value);
};

test.describe("Marketplace workflow self-delegate", () => {
  test.describe.configure({ mode: "serial", timeout: 240_000 });

  test("install Freelancer proposal workflow and run with mock brief", async ({
    page,
  }) => {
    const portfolioPath = prepareFreelancerPortfolioFixture();

    await signInAs(page, SELF);

    await page.goto("/marketplace");
    await page.waitForLoadState("load");
    // Dismiss any leftover overlay from a prior navigation.
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("heading", { name: WORKFLOW_NAME }),
    ).toBeVisible({ timeout: 30_000 });

    await page.screenshot({
      path: ".e2e/screenshots/marketplace-workflow-listing.png",
      fullPage: false,
    });

    const listingCard = page
      .locator("article")
      .filter({ hasText: WORKFLOW_NAME })
      .first();
    await listingCard.getByRole("button", { name: "Install" }).click({
      // Opening the install overlay can race Playwright's click stability check.
      force: true,
    });

    await expect(
      page.getByRole("heading", { name: `Install ${WORKFLOW_NAME}` }),
    ).toBeVisible({ timeout: 15_000 });

    // Modal has no role="dialog"; scope via .modal overlay content.
    const installModal = page
      .locator(".modal")
      .filter({ hasText: `Install ${WORKFLOW_NAME}` });

    await expect
      .poll(
        async () =>
          installModal.getByRole("button", { name: "Install" }).isEnabled(),
        {
          timeout: 30_000,
        },
      )
      .toBe(true);

    const onlineMac = installModal
      .getByRole("button", { name: /Online/i })
      .first();
    if (await onlineMac.isVisible().catch(() => false)) {
      await onlineMac.click();
    }

    await installModal.getByRole("button", { name: "Install" }).click();
    await expect(
      page.getByRole("heading", { name: `${WORKFLOW_NAME} installed` }),
    ).toBeVisible({ timeout: 60_000 });

    await page.screenshot({
      path: ".e2e/screenshots/marketplace-workflow-installed.png",
      fullPage: false,
    });

    await page.getByRole("button", { name: "Start a task" }).click();
    await expect(
      page.getByRole("heading", { name: "Send a task" }),
    ).toBeVisible({ timeout: 15_000 });

    const writerHeading = page.getByRole("heading", {
      name: /Choose an AI on your Mac/i,
    });
    if (await writerHeading.isVisible().catch(() => false)) {
      await page.getByRole("button", { name: /Claude \(terminal\)/i }).click();
    }

    await expect(page.getByText("Workflow inputs")).toBeVisible({
      timeout: 30_000,
    });

    await fillLabeledField(
      page,
      /Client or company name/i,
      FREELANCER_PROPOSAL_MOCK.clientName,
    );
    await fillLabeledField(
      page,
      /Project brief from the client/i,
      FREELANCER_PROPOSAL_MOCK.projectBrief,
    );
    await fillLabeledField(
      page,
      /Portfolio folder on your Mac/i,
      portfolioPath,
    );
    await fillLabeledField(
      page,
      /Budget range or rate target/i,
      FREELANCER_PROPOSAL_MOCK.budgetRange,
    );

    await page
      .locator("#agent-witch-workflow-notes")
      .fill(
        [
          `Dry-run for Agent Witch E2E (marker ${TASK_MARKER}).`,
          "Read the portfolio folder and draft a complete client proposal.",
          "Do not send email or message the client.",
          `Put the marker ${TASK_MARKER} in the executive summary.`,
          "Cite Alpine Outfitters and Strand & Stein as proof when relevant.",
          "When you need approval, ask clearly; otherwise finish the full draft.",
        ].join(" "),
      );

    await page.screenshot({
      path: ".e2e/screenshots/marketplace-workflow-inputs.png",
      fullPage: false,
    });

    const firstDispatch = page.waitForResponse(
      (response) =>
        response.url().includes("/api/agent-runs/dispatch") &&
        response.request().method() === "POST",
      { timeout: 60_000 },
    );

    await page.getByRole("button", { name: "Start" }).click();

    const firstBody = (await (await firstDispatch).json()) as {
      ok?: boolean;
      run?: { prompt?: string };
    };
    expect(firstBody.ok).toBe(true);
    expect(firstBody.run?.prompt ?? "").toContain("Nordlicht Outdoor");
    expect(firstBody.run?.prompt ?? "").toContain(TASK_MARKER);

    await expect(page.getByText("Progress on your Mac")).toBeVisible({
      timeout: 60_000,
    });
    await expect(page.getByText("In progress")).toBeVisible({
      timeout: 60_000,
    });

    await page.screenshot({
      path: ".e2e/screenshots/marketplace-workflow-progress.png",
      fullPage: false,
    });

    // Proposal body or approval prompt — either proves the workflow ran.
    const proposalSignal = page
      .getByText(
        new RegExp(
          `${TASK_MARKER}|Nordlicht|Alpine Outfitters|Strand & Stein|executive summary|scope|timeline|pricing|approve`,
          "i",
        ),
      )
      .first();
    await expect(proposalSignal).toBeVisible({ timeout: 180_000 });

    const needsAnswer = page.getByText(/Your Mac agent needs input/i);
    if (await needsAnswer.isVisible().catch(() => false)) {
      const answerBox = page.getByPlaceholder(/Reply to your Mac agent/i);
      await answerBox.fill(
        "Approve the draft for review only. Do not send to the client.",
      );
      await page.getByRole("button", { name: "Send answer" }).click();
      await expect(proposalSignal).toBeVisible({ timeout: 120_000 });
    }

    await page.screenshot({
      path: ".e2e/screenshots/marketplace-workflow-result.png",
      fullPage: false,
    });

    // Global blocked-run modal can cover Job history; capture it then dismiss.
    const blockedModal = page.getByRole("heading", {
      name: /Agent needs your input/i,
    });
    if (await blockedModal.isVisible().catch(() => false)) {
      await page.screenshot({
        path: ".e2e/screenshots/marketplace-workflow-awaiting-input.png",
        fullPage: false,
      });
      await page.keyboard.press("Escape");
    }

    await page.goto("/reports");
    await page.waitForLoadState("load");
    await expect(
      page.getByRole("heading", { name: "Job history" }),
    ).toBeVisible();
    await expect(page.getByText(TASK_MARKER).first()).toBeVisible({
      timeout: 30_000,
    });
    await expect(page.getByText(/Nordlicht Outdoor/i).first()).toBeVisible({
      timeout: 15_000,
    });

    // Dismiss overlay if Job history opens under the blocked-run modal again.
    if (await blockedModal.isVisible().catch(() => false)) {
      await page.keyboard.press("Escape");
    }

    await page.screenshot({
      path: ".e2e/screenshots/marketplace-workflow-job-history.png",
      fullPage: false,
    });
  });
});
