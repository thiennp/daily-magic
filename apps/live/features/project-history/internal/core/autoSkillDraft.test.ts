import { describe, expect, it } from "vitest";

import type { AutoSkillRunRecord } from "./autoSkill.types";
import { buildAutoSkillTranscript } from "./autoSkillDraft";

const run = (prompt: string): AutoSkillRunRecord => ({
  runId: "r1",
  prompt,
  resultSummary: "Done.",
  completedAt: "2026-10-08T10:00:00.000Z",
  writerAgent: null,
});

describe("buildAutoSkillTranscript", () => {
  it("keeps case and line breaks of the prompt", () => {
    const transcript = buildAutoSkillTranscript([
      run("Update the README\n\nThen run the Linter"),
    ]);
    expect(transcript).toContain(
      "Prompt: Update the README\n\nThen run the Linter",
    );
  });

  it("still redacts emails", () => {
    const transcript = buildAutoSkillTranscript([
      run("Mail the report to jane.doe@example.com"),
    ]);
    expect(transcript).not.toContain("jane.doe@example.com");
  });
});
