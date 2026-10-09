import { describe, expect, it } from "vitest";

import { buildDocSkillMarkdown } from "./buildDocSkillMarkdown";
import { convertDocToSkillDraft } from "./convertDocToSkillDraft";
import { COMMAND_DOC, QA_DOC } from "./docSkillFixtures.testutil";
import { validateDocSkillDraft } from "./validateDocSkillDraft";

const SHA = "a".repeat(40);

describe("convertDocToSkillDraft", () => {
  it("turns a Q&A doc into a skill: stem name, aliases as keywords, short answer as description", () => {
    const draft = convertDocToSkillDraft({
      relPath: "docs/qa/release-notes.md",
      kind: "qa",
      text: QA_DOC,
      sha: SHA,
    });
    expect(draft.name).toBe("release-notes");
    expect(draft.description).toBe(
      "What is X? Write release notes from merged pull requests.",
    );
    expect(draft.keywords).toEqual(
      expect.arrayContaining(["release", "notes", "workflow"]),
    );
    expect(draft.body).toContain(
      "Use when asked about: release notes workflow",
    );
    expect(draft.body).not.toContain("Query aliases");
  });

  it("reads a folded YAML description (key: >-) instead of the marker", () => {
    const draft = convertDocToSkillDraft({
      relPath: ".cursor/skills/folded/SKILL.md",
      kind: "skill",
      text: "---\nname: folded\ndescription: >-\n  First part of the\n  description.\n---\n\n1. a\n2. b\n3. c\n",
      sha: SHA,
    });
    expect(draft.description).toBe("First part of the description.");
  });

  it("keeps a command's own front matter name and description", () => {
    const draft = convertDocToSkillDraft({
      relPath: ".cursor/commands/command-quick-commit.md",
      kind: "command",
      text: COMMAND_DOC,
      sha: SHA,
    });
    expect(draft.name).toBe("command-quick-commit");
    expect(draft.description).toBe("Quick commit with local verification");
  });

  it("stamps provenance and passes the doc-mode validator", () => {
    const markdown = buildDocSkillMarkdown(
      convertDocToSkillDraft({
        relPath: "docs/qa/release-notes.md",
        kind: "qa",
        text: QA_DOC,
        sha: SHA,
      }),
    );
    expect(markdown).toContain(`source: docs/qa/release-notes.md@${SHA}`);
    expect(markdown).toContain("origin: folder-doc");
    expect(validateDocSkillDraft(markdown)).toEqual({ ok: true, stepCount: 4 });
  });
});
