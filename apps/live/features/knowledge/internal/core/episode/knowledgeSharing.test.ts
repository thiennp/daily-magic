import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { buildKnowledgeSharedCards } from "./buildKnowledgeSharedCards";
import { captureKnowledgeAfterRun } from "./captureKnowledgeAfterRun";
import { checkKnowledgeBeforeTask } from "./checkKnowledgeBeforeTask";
import { closeKnowledgeDbsForTests, getKnowledgeDb } from "./knowledgeDb";
import { writeKnowledgeProjectFlag } from "./knowledgeProjectFlags";
import { clearKnowledgeRunTrackerForTests } from "./knowledgeRunTracker";
import { resolveKnowledgePlan } from "./knowledgePlan";
import { setKnowledgeFlagForProject } from "./knowledgeProjectFlagsByKey";

const tempDirs: string[] = [];
const makeDir = (prefix: string): string => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  tempDirs.push(dir);
  return dir;
};

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("no ollama")));
});

afterEach(() => {
  vi.unstubAllGlobals();
  closeKnowledgeDbsForTests();
  clearKnowledgeRunTrackerForTests();
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

const plan = resolveKnowledgePlan({
  contextBudget: "standard",
  continuationStrategy: "none",
  taskClass: "code",
});

const setup = () => {
  const layout = {
    installDir: makeDir("aw-share-"),
    profileEmail: null,
  } as AgentWitchLocalLayout;
  const folder = makeDir("aw-folder-");
  return { layout, folder, projectKey: "proj-1" };
};

const check = (ctx: ReturnType<typeof setup>, runId: string) =>
  checkKnowledgeBeforeTask({
    layout: ctx.layout,
    projectKey: ctx.projectKey,
    projectFolderPath: ctx.folder,
    runId,
    userPrompt: "fix auth.ts",
    promptText: "fix auth.ts",
    plan,
    taskClass: "code",
    holdout: false,
  });

const failRun = (
  ctx: ReturnType<typeof setup>,
  runId: string,
  onRecurringMistake?: () => void,
) =>
  captureKnowledgeAfterRun({
    layout: ctx.layout,
    projectKey: ctx.projectKey,
    projectFolderPath: ctx.folder,
    runId,
    prompt: `fix auth.ts attempt ${runId}`,
    output: "Error: ENOENT cookie store missing",
    exitCode: 1,
    gitBefore: undefined,
    ...(onRecurringMistake !== undefined ? { onRecurringMistake } : {}),
  });

describe("knowledge project flags", () => {
  it("does nothing when the knowledge flag is off", async () => {
    const ctx = setup();
    writeKnowledgeProjectFlag({
      projectFolderPath: ctx.folder,
      key: "knowledge",
      on: false,
    });
    await failRun(ctx, "r1");
    const result = await check(ctx, "r2");
    expect(result.contextText).toBe("");
    const db = getKnowledgeDb(ctx.layout)!;
    expect(
      (db.prepare("SELECT COUNT(*) AS n FROM episodes").get() as { n: number })
        .n,
    ).toBe(0);
  });

  it("toggles flags through the project key once the folder is known", async () => {
    const ctx = setup();
    await check(ctx, "r1");
    const db = getKnowledgeDb(ctx.layout)!;
    expect(
      setKnowledgeFlagForProject(db, {
        projectKey: ctx.projectKey,
        key: "knowledgeShare",
        on: true,
      }),
    ).toBe(true);
    expect(
      setKnowledgeFlagForProject(db, {
        projectKey: "unknown",
        key: "knowledgeShare",
        on: true,
      }),
    ).toBe(false);
  });
});

describe("shared note text", () => {
  it("shares cards only for projects that opted in, and lists others for purge", async () => {
    const ctx = setup();
    await check(ctx, "r1");
    await failRun(ctx, "r1");
    const db = getKnowledgeDb(ctx.layout)!;

    const off = buildKnowledgeSharedCards(db, Date.now());
    expect(off.cards).toHaveLength(0);
    expect(off.shareOffProjectIds).toEqual([ctx.projectKey]);

    writeKnowledgeProjectFlag({
      projectFolderPath: ctx.folder,
      key: "knowledgeShare",
      on: true,
    });
    const on = buildKnowledgeSharedCards(db, Date.now());
    expect(on.cards).toHaveLength(1);
    expect(on.cards[0]?.kind).toBe("mistake");
    expect(on.shareOffProjectIds).toEqual([]);
  });
});

describe("recurring mistakes", () => {
  it("suggests a pitfall exactly once, on the third occurrence", async () => {
    const ctx = setup();
    const onRecurring = vi.fn();
    for (const runId of ["r1", "r2", "r3", "r4"]) {
      await check(ctx, runId);
      await failRun(ctx, runId, onRecurring);
    }
    expect(onRecurring).toHaveBeenCalledTimes(1);
  });
});
