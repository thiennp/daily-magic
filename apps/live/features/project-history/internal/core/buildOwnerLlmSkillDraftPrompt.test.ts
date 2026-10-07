import { describe, expect, it } from "vitest";

import {
  buildOwnerLlmSkillReflectPrompt,
  buildOwnerLlmSkillWritePrompt,
} from "./buildOwnerLlmSkillDraftPrompt";

describe("buildOwnerLlmSkillDraftPrompt", () => {
  it("builds a reflect prompt with hints", () => {
    const text = buildOwnerLlmSkillReflectPrompt({
      scrubbedTranscript: "done tests green",
      similarDraftHints: [{ name: "deploy", description: "ship it" }],
    });
    expect(text).toContain("reflection");
    expect(text).toContain("deploy");
    expect(text).toContain("done tests green");
  });

  it("builds a write prompt without reflection and empty hints", () => {
    const text = buildOwnerLlmSkillWritePrompt({
      scrubbedTranscript: "body",
      similarDraftHints: [],
      mode: "write",
    });
    expect(text).toContain("SKILL.md");
    expect(text).toContain("(none)");
    expect(text).not.toContain("Prior reflection");
  });

  it("does not ask the LLM for source_message_ids (code stamps them)", () => {
    const text = buildOwnerLlmSkillWritePrompt({
      scrubbedTranscript: "body",
      similarDraftHints: [],
      mode: "write",
    });
    expect(text).not.toContain("leave empty array");
    expect(text).toContain("Do NOT write source_message_ids");
  });

  it("includes prior reflection for reflect_then_write", () => {
    const text = buildOwnerLlmSkillWritePrompt({
      scrubbedTranscript: "body",
      similarDraftHints: [],
      mode: "reflect_then_write",
      reflection: "outline here",
    });
    expect(text).toContain("Prior reflection");
    expect(text).toContain("outline here");
  });
});
