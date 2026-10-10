import { DatabaseSync } from "node:sqlite";

import { describe, expect, it, vi } from "vitest";

import type { AutoSkillCompleter } from "./autoSkill.types";
import type { AutoSkillCloud } from "./autoSkillCloud";
import { ensureAutoSkillModuleSchema } from "./autoSkillModuleSchema";
import { evaluateRunAlone } from "./evaluateRunAlone";

vi.mock("./autoSkillModuleAsk", () => ({
  loadExistingSkills: () => ({ drafts: [], published: [] }),
}));

const SKILL = `---
name: bump-version
description: Bump the package version.
version: 0.1.0
status: draft
---
## When to use
A release needs a version bump.

## Steps
1. Edit the version in package.json
2. Update the changelog

## Pitfalls
- Do not tag before merging

## Verification
- The version matches the changelog
`;

const run = (runId: string, prompt: string) => ({
  runId,
  prompt,
  resultSummary: "bumped the version and the changelog together",
  completedAt: "2026-10-08T10:00:00.000Z",
  writerAgent: null,
});

const setup = (triage: string, draft: string) => {
  const db = new DatabaseSync(":memory:");
  ensureAutoSkillModuleSchema(db);
  const suggestions: Record<string, unknown>[] = [];
  const cloud: AutoSkillCloud = {
    getSettings: async () => {
      throw new Error("unused");
    },
    postStatus: async () => undefined,
    postSuggestion: async (_p, s) => void suggestions.push({ ...s }),
  };
  const completer: AutoSkillCompleter = vi.fn(async ({ json }) => ({
    ok: true as const,
    text: json ? triage : draft,
  }));
  const evaluate = (r: ReturnType<typeof run>, known: string[] = []) =>
    evaluateRunAlone({
      projectId: "p1",
      run: r,
      db,
      cloud,
      completer,
      judgeLabel: "Cursor",
      knownClusterIds: new Set(known),
    });
  return { evaluate, suggestions, completer };
};

const YES = '{"reusable":true,"why":"a recipe"}';
const NO = '{"reusable":false,"why":"a one-off edit"}';
const r1 = run("git:abc", "Bump the package version for the 2.3 release");

describe("evaluateRunAlone", () => {
  it("raises one question from a reusable run: a short triage, then one draft", async () => {
    const { evaluate, suggestions, completer } = setup(YES, SKILL);
    expect(await evaluate(r1)).toBe("asked");
    expect(completer).toHaveBeenCalledTimes(2);
    expect(suggestions).toEqual([
      expect.objectContaining({ occurrences: 1, draftName: "bump-version" }),
    ]);
  });

  it("stops after the triage for a one-off run, and never judges it again", async () => {
    const { evaluate, suggestions, completer } = setup(NO, SKILL);
    expect(await evaluate(r1)).toBe("no_repeat");
    expect(await evaluate(r1)).toBe("no_repeat");
    expect(completer).toHaveBeenCalledTimes(1);
    expect(suggestions).toEqual([]);
  });

  it("lets the draft step decide when the triage answer is unusable", async () => {
    const { evaluate, completer } = setup("no idea", "NOT_REUSABLE");
    expect(await evaluate(r1)).toBe("no_repeat");
    expect(completer).toHaveBeenCalledTimes(2);
  });

  it("does not call the AI for a run with almost no text", async () => {
    const { evaluate, completer } = setup(YES, SKILL);
    expect(await evaluate({ ...run("git:x", "wip"), resultSummary: "" })).toBe(
      "no_repeat",
    );
    expect(completer).not.toHaveBeenCalled();
  });

  it("reports a judge that cannot answer, and tries the run again next scan", async () => {
    const { db } = { db: new DatabaseSync(":memory:") };
    ensureAutoSkillModuleSchema(db);
    const down: AutoSkillCompleter = async () => ({
      ok: false as const,
      reason: "agent_exit_1: You're out of usage",
    });
    const base = {
      projectId: "p1",
      run: r1,
      db,
      cloud: {} as AutoSkillCloud,
      completer: down,
      judgeLabel: "Cursor",
      knownClusterIds: new Set<string>(),
    };
    expect(await evaluateRunAlone(base)).toBe("judge_failed");
    expect(await evaluateRunAlone(base)).toBe("judge_failed");
  });

  it("retries next scan when the draft fails", async () => {
    const failing = setup(YES, "this is not a skill at all");
    expect(await failing.evaluate(r1)).toBe("draft_failed");
    expect(await failing.evaluate(r1)).toBe("draft_failed");
  });
});
