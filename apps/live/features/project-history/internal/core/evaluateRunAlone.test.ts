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

const setup = (answer: string) => {
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
  const completer: AutoSkillCompleter = vi.fn(async () => ({
    ok: true as const,
    text: answer,
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

describe("evaluateRunAlone", () => {
  it("raises one question from a single reusable run, with one AI call", async () => {
    const { evaluate, suggestions, completer } = setup(SKILL);
    const r = run("git:abc", "Bump the package version for the 2.3 release");
    expect(await evaluate(r)).toBe("asked");
    expect(completer).toHaveBeenCalledTimes(1);
    expect(suggestions).toEqual([
      expect.objectContaining({ occurrences: 1, draftName: "bump-version" }),
    ]);
  });

  it("skips a run it judged before, without another AI call", async () => {
    const { evaluate, completer } = setup("NOT_REUSABLE");
    const r = run("git:def", "Bump the package version for the 2.3 release");
    expect(await evaluate(r)).toBe("no_repeat");
    expect(await evaluate(r)).toBe("no_repeat");
    expect(completer).toHaveBeenCalledTimes(1);
  });

  it("does not call the AI for a run with almost no text", async () => {
    const { evaluate, completer } = setup(SKILL);
    expect(await evaluate({ ...run("git:x", "wip"), resultSummary: "" })).toBe(
      "no_repeat",
    );
    expect(completer).not.toHaveBeenCalled();
  });

  it("retries next scan when the AI fails, and skips a question already known", async () => {
    const failing = setup("this is not a skill at all");
    const r = run("git:ghi", "Bump the package version for the 2.3 release");
    expect(await failing.evaluate(r)).toBe("draft_failed");
    expect(await failing.evaluate(r)).toBe("draft_failed");
    expect(failing.completer).toHaveBeenCalledTimes(4);
  });
});
