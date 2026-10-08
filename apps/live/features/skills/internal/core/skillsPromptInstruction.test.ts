import { describe, expect, it } from "vitest";

import {
  SKILLS_FIND_INSTRUCTION,
  appendSkillsFindInstruction,
  shouldAddSkillsInstruction,
} from "./skillsPromptInstruction";

describe("skills_find prompt instruction", () => {
  it("is added for codex and cursor when skills are indexed", () => {
    for (const writerAgent of ["codex", "cursor"]) {
      const out = appendSkillsFindInstruction("Do the task", {
        writerAgent,
        indexedSkillCount: 3,
      });
      expect(out).toBe(`Do the task\n\n${SKILLS_FIND_INSTRUCTION}\n`);
    }
  });

  it("is left out without indexed skills or without MCP tools for the writer", () => {
    expect(
      shouldAddSkillsInstruction({
        writerAgent: "codex",
        indexedSkillCount: 0,
      }),
    ).toBe(false);
    for (const writerAgent of ["claude-cli", "antigravity", "unknown"]) {
      expect(
        shouldAddSkillsInstruction({ writerAgent, indexedSkillCount: 5 }),
      ).toBe(false);
    }
  });

  it("is added once", () => {
    const input = { writerAgent: "codex", indexedSkillCount: 1 };
    const once = appendSkillsFindInstruction("Task", input);
    expect(appendSkillsFindInstruction(once, input)).toBe(once);
  });

  it("can never be mistaken for a protocol marker", () => {
    expect(SKILLS_FIND_INSTRUCTION).not.toMatch(/\[\[|\]\]/);
    expect(SKILLS_FIND_INSTRUCTION).not.toMatch(
      /AWAITING_INPUT|WAVE_PLAN|WORKING_ESTIMATE/,
    );
    expect(SKILLS_FIND_INSTRUCTION.split("\n")).toHaveLength(1);
  });
});
