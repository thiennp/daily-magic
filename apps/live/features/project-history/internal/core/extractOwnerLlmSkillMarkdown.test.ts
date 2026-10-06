import { describe, expect, it } from "vitest";

import { extractOwnerLlmSkillMarkdown } from "./extractOwnerLlmSkillMarkdown";

describe("extractOwnerLlmSkillMarkdown", () => {
  it("returns null for empty input", () => {
    expect(extractOwnerLlmSkillMarkdown("")).toBeNull();
    expect(extractOwnerLlmSkillMarkdown("   ")).toBeNull();
  });

  it("extracts a fenced markdown block", () => {
    const raw = "noise\n```markdown\n---\nname: x\n---\n## Steps\n1. a\n```\ntrail";
    expect(extractOwnerLlmSkillMarkdown(raw)).toContain("name: x");
  });

  it("extracts a frontmatter document", () => {
    const raw = "hello\n---\nname: y\n---\n## When to use\nGo\n";
    expect(extractOwnerLlmSkillMarkdown(raw)?.startsWith("---")).toBe(true);
  });

  it("accepts body with Steps section and no fence", () => {
    expect(extractOwnerLlmSkillMarkdown("## Steps\n1. do")).toContain("## Steps");
  });

  it("returns null when nothing skill-like is present", () => {
    expect(extractOwnerLlmSkillMarkdown("just chatter")).toBeNull();
  });
});
