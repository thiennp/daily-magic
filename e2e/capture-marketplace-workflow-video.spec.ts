import { expect, test, type Page } from "@playwright/test";

import {
  FREELANCER_PROPOSAL_MOCK,
  prepareFreelancerPortfolioFixture,
} from "./helpers/prepareFreelancerPortfolioFixture";
import { signInTestAccount } from "./helpers/signInTestAccount";

/**
 * Full marketplace → install → fill inputs → run on Mac → progress video.
 */
const SELF = "test-self-1@agentwitch.com";
const WORKFLOW_NAME = "Freelancer client proposal";
const TASK_MARKER = `E2E-PROP-VIDEO-${Date.now()}`;

const pauseForVideo = async (page: Page, ms = 1200): Promise<void> => {
  await page.waitForTimeout(ms);
};

const signInAs = async (page: Page, email: string): Promise<void> => {
  await page.context().clearCookies();
  await signInTestAccount(page, email);
  await page.goto("/");
  await page.waitForLoadState("networkidle");
};

const fillLabeledField = async (
  page: Page,
  label: RegExp,
  value: string,
): Promise<void> => {
  await page.getByLabel(label).locator("visible=true").fill(value);
};

test.describe("Marketplace workflow video @e2e-capture", () => {
  test.describe.configure({ mode: "serial", timeout: 300_000 });

  test("records marketplace install through Mac progress", async ({ page }) => {
    const portfolioPath = prepareFreelancerPortfolioFixture();
    await page.setViewportSize({ width: 1280, height: 720 });
    await signInAs(page, SELF);
    await pauseForVideo(page, 1200);

    await page.goto("/marketplace");
    await page.waitForLoadState("networkidle");
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("heading", { name: WORKFLOW_NAME }),
    ).toBeVisible({ timeout: 30_000 });
    await pauseForVideo(page, 1800);

    const listingCard = page
      .locator("article")
      .filter({ hasText: WORKFLOW_NAME })
      .first();
    await listingCard.getByRole("button", { name: "Install" }).click({
      force: true,
    });

    await expect(
      page.getByRole("heading", { name: `Install ${WORKFLOW_NAME}` }),
    ).toBeVisible({ timeout: 15_000 });
    await pauseForVideo(page, 1500);

    const installModal = page
      .locator(".modal")
      .filter({ hasText: `Install ${WORKFLOW_NAME}` });

    await expect
      .poll(
        async () =>
          installModal.getByRole("button", { name: "Install" }).isEnabled(),
        { timeout: 30_000 },
      )
      .toBe(true);

    const onlineMac = installModal
      .getByRole("button", { name: /Online/i })
      .first();
    if (await onlineMac.isVisible().catch(() => false)) {
      await onlineMac.click();
      await pauseForVideo(page, 1000);
    }

    await installModal.getByRole("button", { name: "Install" }).click();
    await expect(
      page.getByRole("heading", { name: `${WORKFLOW_NAME} installed` }),
    ).toBeVisible({ timeout: 60_000 });
    await pauseForVideo(page, 1500);

    await page.getByRole("button", { name: "Start a task" }).click();
    await expect(
      page.getByRole("heading", { name: "Send a task" }),
    ).toBeVisible({ timeout: 15_000 });
    await pauseForVideo(page, 1200);

    const writerHeading = page.getByRole("heading", {
      name: /Choose an AI on your Mac/i,
    });
    if (await writerHeading.isVisible().catch(() => false)) {
      await pauseForVideo(page, 1000);
      await page.getByRole("button", { name: /Claude \(terminal\)/i }).click();
    }

    await expect(page.getByText("Workflow inputs")).toBeVisible({
      timeout: 30_000,
    });
    await pauseForVideo(page, 1200);

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
          `Dry-run for Agent Witch video (marker ${TASK_MARKER}).`,
          "Read the portfolio folder and draft a complete client proposal.",
          "Do not send email or message the client.",
          `Put the marker ${TASK_MARKER} in the executive summary.`,
          "Cite Alpine Outfitters and Strand & Stein as proof when relevant.",
          "When you need approval, ask clearly; otherwise finish the full draft.",
        ].join(" "),
      );
    await pauseForVideo(page, 1500);

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

    const progressFeed = page
      .locator("div")
      .filter({
        has: page.getByRole("heading", { name: "Progress on your Mac" }),
      })
      .first();
    await expect(progressFeed).toBeVisible({ timeout: 60_000 });
    await expect(progressFeed.getByText(/In progress/i)).toBeVisible({
      timeout: 60_000,
    });
    await pauseForVideo(page, 3000);

    const proposalSignal = page
      .getByText(
        new RegExp(
          `${TASK_MARKER}|Nordlicht|Alpine Outfitters|Strand & Stein|executive summary|scope|timeline|pricing|approve`,
          "i",
        ),
      )
      .first();
    await expect(proposalSignal).toBeVisible({ timeout: 180_000 });
    await pauseForVideo(page, 2500);

    const needsAnswer = page.getByText(/Your Mac agent needs input/i);
    if (await needsAnswer.isVisible().catch(() => false)) {
      const answerBox = page.getByPlaceholder(/Reply to your Mac agent/i);
      await answerBox.fill(
        "Approve the draft for review only. Do not send to the client.",
      );
      await page
        .getByRole("button", { name: "Send answer", exact: true })
        .click();
      await expect(proposalSignal).toBeVisible({ timeout: 120_000 });
      await pauseForVideo(page, 2000);
    }

    await pauseForVideo(page, 2500);
  });
});
