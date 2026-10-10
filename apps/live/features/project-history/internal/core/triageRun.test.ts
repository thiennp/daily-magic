import { describe, expect, it, vi } from "vitest";

import type { AutoSkillCompleter } from "./autoSkill.types";
import { buildTriagePrompt, parseTriage, triageRun } from "./triageRun";

const run = {
  runId: "git:1",
  prompt: "Add the supply start hint",
  resultSummary: "moved the hint under the field",
  completedAt: "2026-10-08T10:00:00.000Z",
  writerAgent: null,
  changes: " src/a.ts | 2 +-\n+const hint = 1;",
};

describe("parseTriage", () => {
  it("reads true and false, tolerating text around the JSON", () => {
    expect(parseTriage('Sure {"reusable":true,"why":"recipe"}')).toBe(
      "reusable",
    );
    expect(parseTriage('{"reusable":false,"why":"one-off"}')).toBe(
      "not_reusable",
    );
  });

  it("is unknown for anything else", () => {
    expect(parseTriage("maybe")).toBe("unknown");
    expect(parseTriage('{"reusable":"yes"}')).toBe("unknown");
  });
});

describe("triageRun", () => {
  it("asks about the commit's changes only", () => {
    const prompt = buildTriagePrompt(run);
    expect(prompt).toContain("const hint = 1;");
    expect(prompt).toContain("judge ONLY these changes");
  });

  it("reports a failed call with its reason", async () => {
    const failing: AutoSkillCompleter = vi.fn(async () => ({
      ok: false as const,
      reason: "agent_timeout_or_missing",
    }));
    expect(await triageRun(run, failing)).toEqual({
      kind: "failed",
      reason: "agent_timeout_or_missing",
    });
  });
});
