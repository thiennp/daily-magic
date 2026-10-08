import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { captureKnowledgeAfterRun } from "./captureKnowledgeAfterRun";
import { checkKnowledgeBeforeTask } from "./checkKnowledgeBeforeTask";
import { closeKnowledgeDbsForTests, getKnowledgeDb } from "./knowledgeDb";
import { clearKnowledgeRunTrackerForTests } from "./knowledgeRunTracker";
import { resolveKnowledgePlan } from "./knowledgePlan";
import { summarizeKnowledgeImpact } from "./summarizeKnowledgeImpact";

const tempDirs: string[] = [];

const buildLayout = (): AgentWitchLocalLayout => {
  const installDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-knowledge-"));
  tempDirs.push(installDir);
  return { installDir, profileEmail: null } as AgentWitchLocalLayout;
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

describe("knowledge lifecycle (no Ollama, lexical fallback)", () => {
  it("learns a mistake from a failed run, warns on the next run, and counts the avoided repeat", async () => {
    const layout = buildLayout();
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), "aw-folder-"));
    tempDirs.push(folder);
    const base = { layout, projectKey: "p1", projectFolderPath: folder };
    const prompt = "fix the login redirect loop in auth.ts";

    await captureKnowledgeAfterRun({
      ...base,
      runId: "r1",
      prompt,
      output: "Error: ENOENT cookie store missing",
      exitCode: 1,
      gitBefore: undefined,
    });

    const check = await checkKnowledgeBeforeTask({
      ...base,
      runId: "r2",
      userPrompt: prompt,
      promptText: prompt,
      plan,
      taskClass: "code",
      holdout: false,
    });
    expect(check.contextText).toContain("AVOID");
    expect(check.cardCount).toBe(1);

    await captureKnowledgeAfterRun({
      ...base,
      runId: "r2",
      prompt,
      output: "done",
      exitCode: 0,
      gitBefore: undefined,
    });

    const db = getKnowledgeDb(layout);
    expect(db).not.toBeNull();
    const summary = summarizeKnowledgeImpact(db!, {
      projectKey: "p1",
      windowDays: 7,
    });
    expect(summary.runs).toBe(1);
    expect(summary.mistakesAvoided).toBe(1);
    expect(summary.estTokensSaved).toBeGreaterThan(0);
    expect(summary.injectedTokensTotal).toBeGreaterThan(0);
  });

  it("injects nothing for holdout runs but still records the event", async () => {
    const layout = buildLayout();
    const result = await checkKnowledgeBeforeTask({
      layout,
      projectKey: "p1",
      runId: "r1",
      userPrompt: "fix auth.ts",
      promptText: "fix auth.ts",
      plan,
      taskClass: "code",
      holdout: true,
    });
    expect(result.contextText).toBe("");
    const db = getKnowledgeDb(layout)!;
    expect(
      summarizeKnowledgeImpact(db, { projectKey: "p1", windowDays: 7 })
        .holdoutRuns,
    ).toBe(1);
  });

  it("turns a user correction into a mistake card", async () => {
    const layout = buildLayout();
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), "aw-folder-"));
    tempDirs.push(folder);
    const base = { layout, projectKey: "p1", projectFolderPath: folder };

    await captureKnowledgeAfterRun({
      ...base,
      runId: "r1",
      prompt: "rename the helper in utils.ts",
      output: "renamed",
      exitCode: 0,
      gitBefore: undefined,
    });
    await checkKnowledgeBeforeTask({
      ...base,
      runId: "r2",
      userPrompt: "không phải, tên khác cơ",
      promptText: "x",
      plan,
      taskClass: "code",
      holdout: false,
    });

    const db = getKnowledgeDb(layout)!;
    const rows = db
      .prepare("SELECT takeaway FROM episodes WHERE kind = 'mistake'")
      .all() as unknown as { takeaway: string }[];
    expect(rows[0]?.takeaway).toContain("User corrected");
  });
});
