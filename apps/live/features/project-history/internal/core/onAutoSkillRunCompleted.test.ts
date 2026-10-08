import { DatabaseSync } from "node:sqlite";

import { describe, expect, it, vi } from "vitest";

import type { AutoSkillCompleter } from "./autoSkill.types";
import type { AutoSkillCloud, AutoSkillCloudSettings } from "./autoSkillCloud";
import { ensureAutoSkillModuleSchema } from "./autoSkillModuleSchema";
import { onAutoSkillRunCompleted } from "./onAutoSkillRunCompleted";
import { EMPTY_AUTO_SKILL_STATE, type AutoSkillState } from "./autoSkillStore";

const SKILL = `---
name: lint-check
description: Run the lint check on a file.
version: 0.1.0
status: draft
---
## When to use
Repeated lint check requests.

## Steps
1. Run the linter on the file
2. Fix reported issues

## Pitfalls
- Do not disable rules

## Verification
- The linter reports no errors
`;

const run = (runId: string, prompt: string) => ({
  runId,
  prompt,
  resultSummary: "done",
  completedAt: "2026-10-08T10:00:00.000Z",
  writerAgent: "codex",
});

const harness = (
  settings: Partial<AutoSkillCloudSettings> = {},
  db = new DatabaseSync(":memory:"),
) => {
  ensureAutoSkillModuleSchema(db);
  let state: AutoSkillState = EMPTY_AUTO_SKILL_STATE;
  const suggestions: Record<string, unknown>[] = [];
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
    postSuggestion: async (_p, s) => void suggestions.push({ ...s }),
  };
  // Ollama-like: module extraction returns prose (-> splitter fallback),
  // the judge says SIMILAR, drafts return a SKILL.md.
  const completer: AutoSkillCompleter = vi.fn(async ({ prompt, json }) => {
    if (!json) {
      return { ok: true as const, text: SKILL };
    }
    if (prompt.startsWith("Split this")) {
      return { ok: true as const, text: "no json" };
    }
    const ids = [...prompt.matchAll(/EARLIER id=(\S+):/g)].map((m) => m[1]);
    return {
      ok: true as const,
      text: JSON.stringify({
        verdicts: ids.map((id) => ({ id, verdict: "SIMILAR", reason: "same" })),
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
    openModuleDb: () => db,
    embed: async () => null,
    isHistoryOn: () => true,
  };
  return { deps, suggestions, statuses, getState: () => state, db };
};

const A = "1. Run the lint check on src/a.ts\n2. Write release notes summary";
const B = "1. Fix the login bug in auth.ts\n2. Run the lint check on src/b.ts";
const C =
  "1. Update the dependency versions\n2. Run the lint check on src/c.ts";

const go = (h: ReturnType<typeof harness>, id: string, prompt: string) =>
  onAutoSkillRunCompleted({ projectId: "p", run: run(id, prompt) }, h.deps);

describe("onAutoSkillRunCompleted (module level)", () => {
  it("two different prompts sharing one step raise exactly one question", async () => {
    const h = harness();
    expect(await go(h, "r1", A)).toBe("no_repeat");
    expect(await go(h, "r2", B)).toBe("asked");
    expect(h.suggestions).toHaveLength(1);
    expect(h.suggestions[0]).toMatchObject({
      moduleLabel: "run the lint check on <param>",
      occurrences: 2,
      distinctPrompts: 2,
      draftName: "lint-check",
      judgeLabel: "your computer agent: Codex",
    });
  });

  it("does not re-ask while pending, asks again after Not now", async () => {
    const h = harness();
    await go(h, "r1", A);
    await go(h, "r2", B);
    const clusterId = String(h.suggestions[0]?.clusterId);
    const pending = harness({ pendingClusterIds: [clusterId] }, h.db);
    pending.deps.loadState = h.deps.loadState;
    expect(await go(pending, "r3", C)).toBe("not_asked");
    expect(pending.suggestions).toHaveLength(0);
    const notNow = harness({}, h.db);
    notNow.deps.loadState = h.deps.loadState;
    expect(await go(notNow, "r4", C.replace("c.ts", "d.ts"))).toBe("asked");
    expect(notNow.suggestions[0]).toMatchObject({ occurrences: 4 });
  });

  it("stays silent for a cluster the owner marked never or saved", async () => {
    const h = harness();
    await go(h, "r1", A);
    await go(h, "r2", B);
    const clusterId = String(h.suggestions[0]?.clusterId);
    for (const key of ["neverClusterIds", "savedClusterIds"] as const) {
      const quiet = harness({ [key]: [clusterId] }, h.db);
      quiet.deps.loadState = h.deps.loadState;
      const other = `1. ${key === "neverClusterIds" ? "Rename helper functions" : "Compile stylesheet bundle"}\n2. Run the lint check on src/z.ts`;
      expect(await go(quiet, `r-${key}`, other)).toBe("not_asked");
      expect(quiet.suggestions).toHaveLength(0);
    }
  });

  it("counts a repeated identical prompt as an occurrence in 1 prompt", async () => {
    const h = harness();
    await go(h, "r1", A);
    expect(await go(h, "r2", A)).toBe("asked");
    expect(h.suggestions[0]).toMatchObject({
      occurrences: 2,
      distinctPrompts: 1,
    });
  });

  it("asks at most two questions per run, strongest clusters first", async () => {
    const h = harness();
    const big =
      "1. Run the lint check on src/a.ts\n2. Write release notes summary\n3. Update the dependency versions";
    await go(h, "r1", big);
    await go(h, "r2", big);
    // both asked? the second run raised questions for all three, capped at 2
    expect(h.suggestions).toHaveLength(2);
  });

  it("prefers the WAVE_PLAN of the run output over the prompt", async () => {
    const h = harness();
    const plan = "[[WAVE_PLAN]]\nA|a1|Run the lint check on src/a.ts|10\n";
    const withPlan = (id: string) =>
      onAutoSkillRunCompleted(
        { projectId: "p", run: run(id, "do the thing"), agentOutput: plan },
        h.deps,
      );
    expect(await withPlan("r1")).toBe("no_repeat");
    expect(await withPlan("r2")).toBe("asked");
  });

  it("pauses with a clear reason when no judge exists", async () => {
    const h = harness();
    const out = await onAutoSkillRunCompleted(
      { projectId: "p", run: run("r1", A) },
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
    expect(JSON.stringify(h.statuses[0])).toContain("Auto skills paused");
  });

  it("reports an unavailable module store and a disabled switch", async () => {
    const h = harness();
    expect(
      await onAutoSkillRunCompleted(
        { projectId: "p", run: run("r1", A) },
        { ...h.deps, openModuleDb: () => null },
      ),
    ).toBe("store_unavailable");
    const off = harness({ enabled: false });
    expect(await go(off, "r1", A)).toBe("disabled");
    expect(off.getState().runs).toHaveLength(0);
  });
});
