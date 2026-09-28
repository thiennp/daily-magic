import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { expect, test, type Page, type Request } from "@playwright/test";

import {
  FREELANCER_PROPOSAL_MOCK,
  prepareFreelancerPortfolioFixture,
} from "./helpers/prepareFreelancerPortfolioFixture";
import { signInTestAccount } from "./helpers/signInTestAccount";

/**
 * Create a project, install a marketplace workflow onto it, pull the harness
 * into that folder from Agent Witch Live, then run the workflow.
 * Requires a live host on this machine (npm run agent-witch against localhost).
 */
const SELF = "test-e2e-flow@agentwitch.com";
const WORKFLOW_NAME = "Freelancer client proposal";
const PROJECT_NAME = `E2E Flow ${Date.now()}`;
const PROJECT_FOLDER = path.join(os.homedir(), "aw-e2e-flow-project");
const TASK_MARKER = `E2E-FLOW-${Date.now()}`;
const ARTIFACT_DIR = "/opt/cursor/artifacts/e2e-project-workflow";

const signInAs = async (page: Page, email: string): Promise<void> => {
  await page.context().clearCookies();
  await signInTestAccount(page, email);
  await page.goto("/");
  await page.waitForLoadState("load");
};

const shot = async (page: Page, name: string): Promise<void> => {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, `${name}.png`),
    fullPage: true,
  });
};

const fillLabeledField = async (
  page: Page,
  label: RegExp,
  value: string,
): Promise<void> => {
  await page.getByLabel(label).fill(value, { timeout: 15_000 });
};

const readDispatchProject = (
  request: Request,
): {
  readonly projectId: string;
  readonly projectFolderPath: string;
  readonly prompt: string;
} => {
  const body = request.postDataJSON() as {
    projectId?: unknown;
    projectFolderPath?: unknown;
    prompt?: unknown;
  };

  return {
    projectId: typeof body.projectId === "string" ? body.projectId : "",
    projectFolderPath:
      typeof body.projectFolderPath === "string" ? body.projectFolderPath : "",
    prompt: typeof body.prompt === "string" ? body.prompt : "",
  };
};

test.describe("Create project, pull harness, run workflow", () => {
  test.describe.configure({ mode: "serial", timeout: 300_000 });
  // Production `npm run start` sets a Secure session cookie. Chromium sends it
  // on http://localhost and drops it on http://127.0.0.1.
  test.use({ baseURL: "http://localhost:3000" });

  test("installs a workflow on a new project, pulls harness, and runs it", async ({
    page,
  }) => {
    fs.mkdirSync(PROJECT_FOLDER, { recursive: true });
    const portfolioPath = prepareFreelancerPortfolioFixture();

    await signInAs(page, SELF);

    const devicesResponse = await page.request.get("/api/agent-witch/devices");
    expect(devicesResponse.ok()).toBe(true);
    const devicesBody = (await devicesResponse.json()) as {
      devices?: ReadonlyArray<{ presenceTier?: string; platform?: string }>;
    };
    const liveDevice = (devicesBody.devices ?? []).find(
      (device) => device.presenceTier === "live",
    );
    expect(
      liveDevice,
      "a live host must be connected on this computer",
    ).toBeTruthy();
    if (process.platform === "linux") {
      expect(liveDevice?.platform).toBe("linux");
    }

    await page.goto("/projects");
    await page.waitForLoadState("load");
    await expect(page.getByRole("link", { name: "Sign in" })).toHaveCount(0);
    await expect(page.getByText("Loading projects…")).toBeHidden({
      timeout: 30_000,
    });
    const createForm = page
      .locator("div")
      .filter({
        has: page.getByRole("heading", { name: "Save a new project" }),
      })
      .last();
    await createForm.getByLabel("Name").fill(PROJECT_NAME);
    await createForm.getByLabel(/Folder path/i).fill(PROJECT_FOLDER);
    const createResponse = page.waitForResponse(
      (response) =>
        response.url().includes("/api/projects") &&
        response.request().method() === "POST",
      { timeout: 30_000 },
    );
    await createForm.getByRole("button", { name: "Save project" }).click();
    expect((await createResponse).ok()).toBe(true);
    await expect(page.getByRole("heading", { name: PROJECT_NAME })).toBeVisible(
      {
        timeout: 20_000,
      },
    );
    await expect(page.getByText(PROJECT_FOLDER).first()).toBeVisible();
    await shot(page, "01-project-created");

    const projectsResponse = await page.request.get("/api/projects");
    expect(projectsResponse.ok()).toBe(true);
    const projectsBody = (await projectsResponse.json()) as {
      projects?: ReadonlyArray<{
        id?: string;
        name?: string;
        folderPath?: string;
      }>;
    };
    const created = (projectsBody.projects ?? []).find(
      (project) => project.name === PROJECT_NAME,
    );
    expect(created?.id).toBeTruthy();
    const projectId = created?.id ?? "";
    expect(created?.folderPath).toBe(PROJECT_FOLDER);

    await page.goto("/marketplace");
    await page.waitForLoadState("load");
    await page.keyboard.press("Escape");
    const listingCard = page
      .locator("article")
      .filter({ hasText: WORKFLOW_NAME })
      .first();
    await expect(listingCard).toBeVisible({ timeout: 30_000 });
    await listingCard.getByRole("button", { name: "Install" }).click({
      force: true,
    });

    const installModal = page
      .locator(".modal")
      .filter({ hasText: `Install ${WORKFLOW_NAME}` });
    await expect(installModal).toBeVisible({ timeout: 15_000 });

    const onlineHost = installModal
      .getByRole("button", { name: /Online/i })
      .first();
    if (await onlineHost.isVisible().catch(() => false)) {
      await onlineHost.click();
    }

    await installModal.getByRole("button", { name: PROJECT_NAME }).click();
    await expect
      .poll(
        async () =>
          installModal.getByRole("button", { name: "Install" }).isEnabled(),
        { timeout: 30_000 },
      )
      .toBe(true);
    await installModal.getByRole("button", { name: "Install" }).click();
    await expect(
      page.getByRole("heading", { name: `${WORKFLOW_NAME} installed` }),
    ).toBeVisible({ timeout: 60_000 });
    await shot(page, "02-workflow-installed");

    const awl = await page.context().newPage();
    await awl.goto(
      `http://127.0.0.1:43347/project?id=${encodeURIComponent(projectId)}&tab=harness`,
    );
    await awl.waitForLoadState("load");
    await shot(awl, "03-awl-harness-tab");
    const pullForm = awl.locator(
      'form[action="/projects/link-harness"], form[action="/projects/pull-bound-harness"]',
    );
    await expect(pullForm).toBeVisible({ timeout: 15_000 });
    const checkboxes = pullForm.locator('input[name="applySet"]');
    const checkboxCount = await checkboxes.count();
    await Array.from({ length: checkboxCount }).reduce<Promise<void>>(
      async (previous, _, index) => {
        await previous;
        await checkboxes.nth(index).check();
      },
      Promise.resolve(),
    );
    await pullForm.getByRole("button", { name: "Pull into repo" }).click();
    await awl.waitForLoadState("load");
    await shot(awl, "04-harness-pulled");
    const harnessPageText = await awl.locator("body").innerText();
    await awl.close();

    const cursorTree = path.join(PROJECT_FOLDER, ".cursor");
    const harnessFilesLanded = fs.existsSync(cursorTree);
    expect(harnessFilesLanded, "pull writes .cursor into the project").toBe(
      true,
    );

    await page.getByRole("button", { name: "Start a task" }).click();
    await expect(page.getByRole("heading", { name: "New task" })).toBeVisible({
      timeout: 15_000,
    });

    const composer = page.locator(".modal");
    const projectHeading = composer.getByRole("heading", {
      name: /Choose a project folder/i,
    });
    if (await projectHeading.isVisible().catch(() => false)) {
      await composer
        .getByRole("button", { name: PROJECT_NAME })
        .click({ timeout: 15_000 });
    }

    const writerHeading = page.getByRole("heading", {
      name: /Choose an AI on your Mac/i,
    });
    if (await writerHeading.isVisible().catch(() => false)) {
      await page.getByRole("button", { name: /Claude \(terminal\)/i }).click();
    }

    await expect(page.getByText("Current project")).toBeVisible({
      timeout: 30_000,
    });
    await expect(page.getByText(PROJECT_NAME).first()).toBeVisible();
    await expect(page.getByText("Workflow inputs")).toBeVisible({
      timeout: 30_000,
    });
    await shot(page, "05-composer-project");

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
      /Budget range or rate target/i,
      FREELANCER_PROPOSAL_MOCK.budgetRange,
    );
    await fillLabeledField(page, /Portfolio folder/i, portfolioPath);
    await page
      .getByRole("textbox", { name: /Additional instructions/i })
      .fill(
        [
          `Dry-run marker ${TASK_MARKER}.`,
          "Draft a complete client proposal from the portfolio folder.",
          "Do not send email.",
          `Put ${TASK_MARKER} in the executive summary.`,
        ].join(" "),
      );
    await shot(page, "06-workflow-inputs");

    const firstDispatch = page.waitForRequest(
      (request) =>
        request.url().includes("/api/agent-runs/dispatch") &&
        request.method() === "POST",
      { timeout: 60_000 },
    );
    await page
      .locator(".modal")
      .getByRole("button", { name: "Start", exact: true })
      .click();

    const dispatchRequest = await firstDispatch;
    const dispatched = readDispatchProject(dispatchRequest);
    expect(dispatched.projectId).toBe(projectId);
    expect(dispatched.projectFolderPath).toBe(PROJECT_FOLDER);
    expect(dispatched.prompt).toContain(TASK_MARKER);
    expect(dispatched.prompt).toContain("Nordlicht Outdoor");
    expect(dispatched.prompt).toContain(portfolioPath);

    const dispatchResponse = await dispatchRequest.response();
    expect(dispatchResponse?.ok()).toBe(true);

    await shot(page, "07-run-started");
    const tokenLine = page.getByText(/Tokens:\s+\d[\d,]*\s+in/i);
    const writerOutcome = page.getByText(
      /Failed — Writer API key missing and Claude CLI can’t run|Tokens:\s+\d/i,
    );
    await expect(tokenLine.or(writerOutcome).first()).toBeVisible({
      timeout: 120_000,
    });
    const rawLog = page.getByRole("button", { name: "Expand raw log" });
    if (await rawLog.isVisible().catch(() => false)) {
      await rawLog.click();
    }
    await shot(page, "08-run-finished");

    const outcomeText = (await page.locator("body").innerText()).slice(0, 4000);
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
    fs.writeFileSync(
      path.join(ARTIFACT_DIR, "run-notes.txt"),
      [
        `project=${PROJECT_NAME}`,
        `projectId=${projectId}`,
        `folder=${PROJECT_FOLDER}`,
        `marker=${TASK_MARKER}`,
        `platform=${liveDevice?.platform ?? ""}`,
        `harnessPullForm=true`,
        `harnessFilesLanded=${harnessFilesLanded}`,
        `tokenVisible=${await tokenLine.isVisible().catch(() => false)}`,
        "",
        "--- harness page ---",
        harnessPageText.slice(0, 2000),
        "",
        "--- run page ---",
        outcomeText,
      ].join("\n"),
    );
  });
});
