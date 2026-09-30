import { describe, expect, it } from "vitest";

import { buildPromptSdlcImproverPrompt } from "@/lib/promptOptimizer/buildPromptSdlcImproverPrompt";
import { buildPromptSdlcJudgePrompt } from "@/lib/promptOptimizer/buildPromptSdlcJudgePrompt";
import { buildPromptSdlcRunPrompt } from "@/lib/promptOptimizer/buildPromptSdlcRunPrompt";

const SAMPLE_GOAL =
  "Update src/app/api/notes/route.ts for cursor pagination; npm run test passes.";
const SAMPLE_PROMPT =
  "Add cursor pagination to the notes API and cover it in vitest.";
const SAMPLE_EVIDENCE =
  "git diff --stat\n src/app/api/notes/route.ts | 40 +++++";

describe("classic prompt SDLC builder rubric", () => {
  it("judge prompt scores evidence only", () => {
    const text = buildPromptSdlcJudgePrompt({
      goal: SAMPLE_GOAL,
      lookedAt: "git diff and src/app/api/notes/route.ts",
      evidence: SAMPLE_EVIDENCE,
      tokens: 1200,
      delayMs: 4500,
      passScore: 90,
    });
    expect(text).toContain("Score only the evidence");
    expect(text).toContain("Do not score the wording of the prompt");
    expect(text).toContain(SAMPLE_GOAL);
  });

  it("improver prompt forbids tools and returns prompt only", () => {
    const text = buildPromptSdlcImproverPrompt({
      goal: SAMPLE_GOAL,
      promptText: SAMPLE_PROMPT,
      score: 62,
      reasons: "Tests missing for edge cases.",
    });
    expect(text).toContain("Do not edit files");
    expect(text).toContain("Reply with only the improved prompt");
    expect(text).toContain("Judge score: 62");
  });

  it("run prompt forbids scoring and includes task text", () => {
    const text = buildPromptSdlcRunPrompt({
      promptText: SAMPLE_PROMPT,
      instructions: "Use page size 20 for the first page.",
    });
    expect(text).toContain("Do not score the work");
    expect(text).toContain(SAMPLE_PROMPT);
    expect(text).toContain("page size 20");
  });
});
