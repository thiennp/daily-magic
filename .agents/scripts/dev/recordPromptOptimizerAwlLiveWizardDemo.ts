/**
 * Live AWL wizard demo: real writers against http://127.0.0.1:43347.
 * Prerequisite: npx tsx .agents/scripts/dev/startAwlLinuxSmoke.ts
 */
import fs from "node:fs";
import path from "node:path";

import { chromium, type Page } from "playwright";

const AWL_ORIGIN = process.env.AWL_ORIGIN ?? "http://127.0.0.1:43347";
const ARTIFACTS = "/opt/cursor/artifacts";
const WORKSPACE = process.env.AWL_DEMO_FOLDER ?? "/workspace";
const SKILL = process.env.AWL_DEMO_SKILL ?? "skill-post-change-verification";
const GOAL =
  process.env.AWL_DEMO_GOAL ??
  "Improve this Agent Witch skill so post-change verification steps are clear, actionable, and easy for cloud agents to follow.";
const MAX_GATE_STEPS = Number(process.env.AWL_DEMO_MAX_GATES ?? "24");
const GATE_TIMEOUT_MS = Number(
  process.env.AWL_DEMO_GATE_TIMEOUT_MS ?? "900000",
);

const CYCLES_PATH =
  process.env.AWL_CYCLES_PATH ??
  "/tmp/awl-live-demo/prompt-optimizer-cycles.json";

type StoredRevision = {
  readonly roundNumber: number;
  readonly judgement?: { readonly score: number | null } | null;
};

type StoredCycle = {
  readonly id: string;
  readonly status: string;
  readonly updatedAt: string;
  readonly wizard?: {
    readonly gate: string | null;
    readonly phase: string;
    readonly splitOptions?: ReadonlyArray<{
      readonly id: string;
      readonly recommended: boolean;
    }>;
  };
  readonly revisions?: readonly StoredRevision[];
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const readLastCycle = (): StoredCycle | null => {
  try {
    const cycles = JSON.parse(
      fs.readFileSync(CYCLES_PATH, "utf8"),
    ) as StoredCycle[];
    return cycles.at(-1) ?? null;
  } catch {
    return null;
  }
};

const isWizardTerminalSuccess = (cycle: StoredCycle): boolean =>
  cycle.status === "done" ||
  cycle.status === "finished" ||
  cycle.status === "passed" ||
  (cycle.status === "stopped" && cycle.wizard?.phase === "complete");

const pickEvaluateRevisionRound = (cycle: StoredCycle): string => {
  const scored =
    cycle.revisions?.filter(
      (item) =>
        item.judgement?.score !== null && item.judgement?.score !== undefined,
    ) ?? [];
  const best = scored.reduce<StoredRevision | null>((acc, item) => {
    if (acc === null) {
      return item;
    }
    const accScore = acc.judgement?.score ?? -1;
    const itemScore = item.judgement?.score ?? -1;
    return itemScore >= accScore ? item : acc;
  }, null);
  return String(best?.roundNumber ?? scored.at(-1)?.roundNumber ?? 1);
};

const postWizardContinueHttp = async (cycle: StoredCycle): Promise<void> => {
  const body = new FormData();
  body.set("liveFragment", "1");
  body.set("cycleId", cycle.id);
  body.set("intent", "wizard-continue");
  const gate = cycle.wizard?.gate;
  if (gate === "evaluate") {
    body.set("wizardRevisionRound", pickEvaluateRevisionRound(cycle));
  }
  if (gate === "separate") {
    const options = cycle.wizard?.splitOptions ?? [];
    const pick = options.find((item) => item.recommended) ?? options[0];
    if (pick !== undefined) {
      body.set("wizardSplitOptionId", pick.id);
    }
  }
  const response = await fetch(`${AWL_ORIGIN}/prompt-optimizer`, {
    method: "POST",
    body,
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(
      `wizard-continue HTTP ${response.status} ${response.statusText}`,
    );
  }
};

const waitForCycleChange = async (
  updatedBefore: string,
  timeoutMs: number,
): Promise<StoredCycle> => {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const cycle = readLastCycle();
    if (cycle !== null && cycle.updatedAt !== updatedBefore) {
      return cycle;
    }
    await sleep(400);
  }
  throw new Error("Timed out waiting for prompt optimizer cycle to update");
};

const refreshCyclePage = async (page: Page, cycleId: string): Promise<void> => {
  await page.goto(`${AWL_ORIGIN}/prompt-optimizer?cycle=${cycleId}`, {
    waitUntil: "domcontentloaded",
  });
};

const waitForWizardGateOrSuccess = async (
  page: Page,
  cycleId: string,
): Promise<"gate" | "done"> => {
  const deadline = Date.now() + GATE_TIMEOUT_MS;
  let lastReloadAt = 0;
  while (Date.now() < deadline) {
    const cycle = readLastCycle();
    if (cycle !== null && isWizardTerminalSuccess(cycle)) {
      await refreshCyclePage(page, cycleId);
      return "done";
    }
    if (
      cycle !== null &&
      cycle.status === "wizard_paused" &&
      cycle.wizard?.gate !== null &&
      cycle.wizard?.gate !== undefined
    ) {
      await refreshCyclePage(page, cycleId);
      return "gate";
    }
    if (Date.now() - lastReloadAt > 5000) {
      await refreshCyclePage(page, cycleId);
      lastReloadAt = Date.now();
    }
    await sleep(1500);
  }
  throw new Error("Timed out waiting for wizard gate or completion");
};

const waitForWritersReady = async (page: Page): Promise<void> => {
  await page.waitForFunction(
    () => {
      const slots = [...document.querySelectorAll("[data-writer-status]")];
      return (
        slots.length > 0 && slots.every((slot) => slot.dataset.ready === "true")
      );
    },
    undefined,
    { timeout: 120_000 },
  );
};

const resetPromptOptimizerStore = (): void => {
  if (fs.existsSync(CYCLES_PATH)) {
    fs.writeFileSync(CYCLES_PATH, "[]\n", "utf8");
  }
};

const waitForAwl = async (): Promise<void> => {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${AWL_ORIGIN}/health`, { cache: "no-store" });
      if (res.ok) {
        return;
      }
    } catch {
      // retry
    }
    await sleep(500);
  }
  throw new Error(`AWL not reachable at ${AWL_ORIGIN}/health`);
};

const main = async (): Promise<void> => {
  fs.mkdirSync(ARTIFACTS, { recursive: true });
  const videoPath = path.join(
    ARTIFACTS,
    "prompt-optimizer-awl-live-wizard-demo.mp4",
  );

  const browser = await chromium.launch({ headless: true, slowMo: 80 });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    recordVideo: { dir: ARTIFACTS, size: { width: 1280, height: 900 } },
  });
  const page = await context.newPage();

  await waitForAwl();
  resetPromptOptimizerStore();
  await page.goto(`${AWL_ORIGIN}/prompt-optimizer`, {
    waitUntil: "domcontentloaded",
  });
  await page.evaluate(() => {
    const details = document.getElementById("prompt-optimizer-compose-details");
    if (details instanceof HTMLDetailsElement) {
      details.open = true;
    }
    const form = document.querySelector("form.sdlc-form");
    if (form instanceof HTMLFormElement) {
      form.enctype = "application/x-www-form-urlencoded";
    }
  });

  await page.locator('input[name="folder"]').fill(WORKSPACE);
  await page.locator('input[name="folder"]').blur();
  await sleep(400);

  const skillSelect = page.locator("[data-skill-select]");
  if ((await skillSelect.count()) > 0) {
    await skillSelect.selectOption(SKILL);
    await sleep(500);
  }

  await page.locator('textarea[name="goal"]').fill(GOAL);

  await page.locator('[data-writer-select="judge"]').selectOption("cursor");
  await page.locator('[data-writer-select="improver"]').selectOption("cursor");
  await page.locator('[data-writer-select="runner"]').selectOption("cursor");

  await waitForWritersReady(page);

  await page.locator("[data-sdlc-run-wizard]").scrollIntoViewIfNeeded();
  await page.locator("[data-sdlc-run-wizard]").click();
  await Promise.race([
    page.waitForSelector("#prompt-optimizer-run[data-live='true']", {
      timeout: 120_000,
    }),
    page.waitForSelector(
      "#prompt-optimizer-wizard-gate-slot .sdlc-wizard-gate-active",
      { timeout: 120_000 },
    ),
  ]);

  let cycle = readLastCycle();
  if (cycle === null) {
    throw new Error("No prompt optimizer cycle started after Run");
  }
  await refreshCyclePage(page, cycle.id);

  let gates = 0;
  while (gates < MAX_GATE_STEPS) {
    const state = await waitForWizardGateOrSuccess(page, cycle.id);
    if (state === "done") {
      break;
    }
    cycle = readLastCycle();
    if (
      cycle === null ||
      cycle.wizard?.gate === null ||
      cycle.wizard?.gate === undefined
    ) {
      throw new Error("Expected a wizard gate in the cycle store");
    }
    const updatedBefore = cycle.updatedAt;
    await postWizardContinueHttp(cycle);
    gates += 1;
    cycle = await waitForCycleChange(updatedBefore, GATE_TIMEOUT_MS);
    await refreshCyclePage(page, cycle.id);
    await sleep(600);
  }

  cycle = readLastCycle();
  if (cycle !== null) {
    await refreshCyclePage(page, cycle.id);
  }

  await page
    .locator("#prompt-optimizer-run")
    .scrollIntoViewIfNeeded()
    .catch(() => null);
  await sleep(2000);

  const title = await page.title();
  const badge = await page
    .locator(".sdlc-run-badge-done, .sdlc-run-badge-finished")
    .first()
    .textContent()
    .catch(() => null);

  await page.screenshot({
    path: path.join(ARTIFACTS, "prompt-optimizer-awl-live-wizard-final.png"),
    fullPage: true,
  });

  const video = page.video();
  let savedVideoPath: string | null = null;
  if (video !== null) {
    await video.saveAs(videoPath);
    savedVideoPath = videoPath;
  }
  await context.close();
  await browser.close();

  const storeCycle = readLastCycle();
  const okFromStore =
    storeCycle !== null &&
    storeCycle.wizard?.phase === "complete" &&
    (storeCycle.status === "done" ||
      storeCycle.status === "finished" ||
      storeCycle.status === "passed" ||
      storeCycle.status === "stopped");
  const okFromBadge = badge !== null && /done|finished|complete/i.test(badge);
  const ok = okFromStore || okFromBadge;
  const gatesOk = gates > 0;
  console.log(
    JSON.stringify({
      ok,
      title,
      badge: badge?.trim() ?? null,
      gatesClicked: gates,
      gatesOk,
      videoPath: savedVideoPath,
      folder: WORKSPACE,
      skill: SKILL,
      cycleStatus: cycle?.status ?? null,
      cyclePhase: cycle?.wizard?.phase ?? null,
    }),
  );
  if (!ok || !gatesOk) {
    process.exit(1);
  }
};

void main();
