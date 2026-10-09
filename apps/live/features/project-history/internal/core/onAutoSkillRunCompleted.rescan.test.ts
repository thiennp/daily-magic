import { DatabaseSync } from "node:sqlite";

import { describe, expect, it, vi } from "vitest";

import type { AutoSkillCompleter } from "./autoSkill.types";
import type { AutoSkillCloud } from "./autoSkillCloud";
import { ensureAutoSkillModuleSchema } from "./autoSkillModuleSchema";
import { onAutoSkillRunCompleted } from "./onAutoSkillRunCompleted";
import { EMPTY_AUTO_SKILL_STATE } from "./autoSkillStore";

const harness = () => {
  const db = new DatabaseSync(":memory:");
  ensureAutoSkillModuleSchema(db);
  const completer: AutoSkillCompleter = vi.fn(async () => ({
    ok: true as const,
    text: "no json",
  }));
  const cloud: AutoSkillCloud = {
    getSettings: async () => ({
      enabled: true,
      judgePref: "auto",
      publishMode: "draft",
      neverClusterIds: [],
      savedClusterIds: [],
      pendingClusterIds: [],
    }),
    postStatus: async () => undefined,
    postSuggestion: async () => undefined,
  };
  const deps = {
    cloud,
    loadState: () => EMPTY_AUTO_SKILL_STATE,
    saveState: () => undefined,
    probeAvailability: async () => ({
      ollamaModel: "mistral:7b",
      agentWriter: "codex",
      botName: null,
    }),
    makeCompleter: () => completer,
    openModuleDb: () => db,
    embed: async () => null,
    isHistoryOn: () => true,
  };
  return { deps, completer, db };
};

const run = {
  runId: "r1",
  prompt: "1. Run the lint check on src/a.ts\n2. Write release notes summary",
  resultSummary: "done",
  completedAt: "2026-10-08T10:00:00.000Z",
  writerAgent: "codex",
};

describe("onAutoSkillRunCompleted rescan", () => {
  it("does no model work the second time it sees the same run", async () => {
    const h = harness();
    await onAutoSkillRunCompleted({ projectId: "p", run }, h.deps);
    const callsAfterFirst = vi.mocked(h.completer).mock.calls.length;
    expect(callsAfterFirst).toBeGreaterThan(0);
    const again = await onAutoSkillRunCompleted(
      { projectId: "p", run },
      h.deps,
    );
    expect(again).toBe("no_repeat");
    expect(vi.mocked(h.completer).mock.calls.length).toBe(callsAfterFirst);
  });

  it("still processes a run that was recorded but never reached the store", async () => {
    const h = harness();
    const unavailable = { ...h.deps, openModuleDb: () => null };
    expect(
      await onAutoSkillRunCompleted({ projectId: "p", run }, unavailable),
    ).toBe("store_unavailable");
    await onAutoSkillRunCompleted({ projectId: "p", run }, h.deps);
    expect(vi.mocked(h.completer).mock.calls.length).toBeGreaterThan(0);
  });
});
