import { describe, expect, it } from "vitest";

import {
  AUTO_SKILL_PREVIEW_CAP,
  hashAutoSkillPrompt,
  redactAutoSkillRun,
} from "./autoSkillRedact";

const run = (prompt: string) => ({
  runId: "r1",
  prompt,
  resultSummary: "secret result text",
  completedAt: "2026-10-08T10:00:00.000Z",
  writerAgent: "codex",
});

describe("redactAutoSkillRun", () => {
  it("keeps a short preview and a hash, drops the result", () => {
    const long = `Write release notes ${"detail ".repeat(100)}`;
    const out = redactAutoSkillRun(run(long));
    expect(out.prompt.length).toBeLessThanOrEqual(AUTO_SKILL_PREVIEW_CAP);
    expect(out.resultSummary).toBe("");
    expect(out.redacted).toBe(true);
    expect(out.promptHash).toBe(hashAutoSkillPrompt(long));
  });

  it("scrubs emails out of the preview", () => {
    const out = redactAutoSkillRun(run("mail bob@example.com the report"));
    expect(out.prompt).not.toContain("bob@example.com");
  });

  it("is idempotent and hashes ignore case and punctuation", () => {
    const once = redactAutoSkillRun(run("Fix the Bug!"));
    expect(redactAutoSkillRun(once)).toBe(once);
    expect(once.promptHash).toBe(hashAutoSkillPrompt("fix the bug"));
  });
});
