import { describe, expect, it, vi } from "vitest";

import type { AutoSkillCompleter } from "./autoSkill.types";
import type { AutoSkillCloud, AutoSkillCloudSettings } from "./autoSkillCloud";
import { onAutoSkillRunCompleted } from "./onAutoSkillRunCompleted";
import { EMPTY_AUTO_SKILL_STATE, type AutoSkillState } from "./autoSkillStore";

const SKILL = `---
name: release-notes
description: Write release notes from the changelog.
version: 0.1.0
status: draft
---
## When to use
Repeated release note requests.

## Steps
1. Read the changelog
2. Group entries by area
3. Write the notes

## Pitfalls
- Do not invent entries

## Verification
- Every entry maps to a changelog line
`;

const run = (runId: string, prompt: string) => ({
  runId,
  prompt,
  resultSummary: "done, notes written",
  completedAt: "2026-10-08T10:00:00.000Z",
  writerAgent: "codex",
});

const harness = (settings: Partial<AutoSkillCloudSettings> = {}) => {
  let state: AutoSkillState = EMPTY_AUTO_SKILL_STATE;
  const suggestions: unknown[] = [];
  const statuses: unknown[] = [];
  const cloud: AutoSkillCloud = {
    getSettings: async () => ({
      enabled: true,
      judgePref: "auto",
      publishMode: "draft",
      neverClusterIds: [],
      savedClusterIds: [],
      pendingClusterIds: [],
      ...settings,
    }),
    postStatus: async (_p, s) => void statuses.push(s),
    postSuggestion: async (_p, s) => void suggestions.push(s),
  };
  const completer: AutoSkillCompleter = vi.fn(async ({ prompt, json }) => {
    if (!json) {
      return { ok: true as const, text: SKILL };
    }
    const ids = [...prompt.matchAll(/EARLIER id=(\S+):/g)].map((m) => m[1]);
    return {
      ok: true as const,
      text: JSON.stringify({
        verdicts: ids.map((id) => ({
          id,
          verdict: "SIMILAR",
          reason: "same task",
          cluster: "release-notes",
        })),
      }),
    };
  });
  const deps = {
    cloud,
    loadState: () => state,
    saveState: (_p: string, s: AutoSkillState) => {
      state = s;
    },
    probeAvailability: async () => ({
      ollamaModel: "mistral:7b",
      agentWriter: "codex",
      botName: null,
    }),
    makeCompleter: () => completer,
  };
  return { deps, suggestions, statuses, completer, getState: () => state };
};

const notes = (v: string) =>
  `write release notes for ${v} from the changelog and group by area`;

describe("onAutoSkillRunCompleted (engine run on test data)", () => {
  it("1st run: no question; 2nd similar run: one question with a draft", async () => {
    const h = harness();
    expect(
      await onAutoSkillRunCompleted(
        { projectId: "p", run: run("r1", notes("v1")) },
        h.deps,
      ),
    ).toBe("no_repeat");
    expect(h.suggestions).toHaveLength(0);
    expect(
      await onAutoSkillRunCompleted(
        { projectId: "p", run: run("r2", notes("v2")) },
        h.deps,
      ),
    ).toBe("asked");
    expect(h.suggestions[0]).toMatchObject({
      clusterId: "release-notes",
      occurrences: 2,
      draftName: "release-notes",
      judgeLabel: "Ollama (local, mistral:7b)",
    });
    expect(h.getState().runClusterIds).toEqual({
      r1: "release-notes",
      r2: "release-notes",
    });
  });

  it("does not re-ask while the question is pending, asks N=3 after Not now", async () => {
    const h = harness();
    await onAutoSkillRunCompleted(
      { projectId: "p", run: run("r1", notes("v1")) },
      h.deps,
    );
    await onAutoSkillRunCompleted(
      { projectId: "p", run: run("r2", notes("v2")) },
      h.deps,
    );
    const pending = harness({ pendingClusterIds: ["release-notes"] });
    const out = await onAutoSkillRunCompleted(
      { projectId: "p", run: run("r3", notes("v3")) },
      { ...pending.deps, loadState: h.deps.loadState },
    );
    expect(out).toBe("not_asked");
    const notNow = harness();
    const again = await onAutoSkillRunCompleted(
      { projectId: "p", run: run("r3", notes("v3")) },
      { ...notNow.deps, loadState: h.deps.loadState },
    );
    expect(again).toBe("asked");
    expect(notNow.suggestions[0]).toMatchObject({ occurrences: 3 });
  });

  it("stays silent for a cluster the owner marked never", async () => {
    const h = harness({ neverClusterIds: ["release-notes"] });
    await onAutoSkillRunCompleted(
      { projectId: "p", run: run("r1", notes("v1")) },
      h.deps,
    );
    // seed assignment as the first ask would have
    h.deps.saveState("p", {
      ...h.getState(),
      runClusterIds: { r1: "release-notes" },
    });
    expect(
      await onAutoSkillRunCompleted(
        { projectId: "p", run: run("r2", notes("v2")) },
        h.deps,
      ),
    ).toBe("not_asked");
    expect(h.suggestions).toHaveLength(0);
  });

  it("pauses with a clear reason when no judge exists", async () => {
    const h = harness();
    const out = await onAutoSkillRunCompleted(
      { projectId: "p", run: run("r1", notes("v1")) },
      {
        ...h.deps,
        probeAvailability: async () => ({
          ollamaModel: null,
          agentWriter: null,
          botName: null,
        }),
      },
    );
    expect(out).toBe("paused");
    expect(h.statuses[0]).toMatchObject({ judgeKind: null });
    expect(JSON.stringify(h.statuses[0])).toContain("Auto skills paused");
  });

  it("does nothing when the owner switched auto skills off", async () => {
    const h = harness({ enabled: false });
    expect(
      await onAutoSkillRunCompleted(
        { projectId: "p", run: run("r1", "x") },
        h.deps,
      ),
    ).toBe("disabled");
    expect(h.getState().runs).toHaveLength(0);
  });
});
