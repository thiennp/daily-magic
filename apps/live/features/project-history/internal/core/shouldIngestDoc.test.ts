import { describe, expect, it } from "vitest";

import { convertDocToSkillDraft } from "./convertDocToSkillDraft";
import { COMMAND_DOC, POINTER_SKILL } from "./docSkillFixtures.testutil";
import { shouldIngestDoc } from "./shouldIngestDoc";

const draftOf = (text: string, kind: "skill" | "command", relPath: string) =>
  convertDocToSkillDraft({ relPath, kind, text, sha: "c".repeat(40) });

describe("shouldIngestDoc", () => {
  const command = draftOf(COMMAND_DOC, "command", ".cursor/commands/q.md");

  it("keeps a numbered workflow", () => {
    expect(shouldIngestDoc(command, [])).toEqual({ ok: true });
  });

  it("skips a pointer-only page", () => {
    const pointer = draftOf(
      POINTER_SKILL,
      "skill",
      ".cursor/skills/p/SKILL.md",
    );
    expect(shouldIngestDoc(pointer, [])).toEqual({
      ok: false,
      reason: "mostly_links",
    });
  });

  it("skips a doc already covered by a skill, including a suffixed copy", () => {
    expect(shouldIngestDoc(command, ["command-quick-commit"])).toMatchObject({
      reason: "already_covered",
    });
    expect(
      shouldIngestDoc(command, ["command-quick-commit-e4d6"]),
    ).toMatchObject({
      reason: "already_covered",
    });
    expect(shouldIngestDoc(command, ["something-else"])).toEqual({ ok: true });
  });

  it("a Q&A doc needs numbered steps; bullet facts are not a procedure", () => {
    const facts = {
      ...command,
      kind: "qa" as const,
      body: "- fact one\n- fact two\n- fact three",
    };
    expect(shouldIngestDoc(facts, [])).toMatchObject({
      reason: "too_few_steps",
    });
    expect(shouldIngestDoc({ ...facts, body: "1. a\n2. b\n3. c" }, [])).toEqual(
      { ok: true },
    );
  });

  it("skips a doc with fewer than three steps", () => {
    const short = { ...command, body: "1. only one\n2. two" };
    expect(shouldIngestDoc(short, [])).toMatchObject({
      reason: "too_few_steps",
    });
  });
});
