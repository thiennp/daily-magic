import { describe, expect, it } from "vitest";

import { createOwnerLlmDraftWriter } from "./createOwnerLlmDraftWriter";
import { stampProjectHistorySkillgenSourceMessageIds } from "./stampProjectHistorySkillgenSourceMessageIds";
import { validateProjectHistorySkillgenDraft } from "./validateProjectHistorySkillgenDraft";

const draft = (sourceLine: string | null): string =>
  [
    "---",
    "name: deploy-staging",
    "description: Deploy and verify.",
    "version: 0.1.0",
    ...(sourceLine === null ? [] : [sourceLine]),
    "status: draft",
    "---",
    "## Steps",
    "1. Build",
    "2. Deploy",
    "",
  ].join("\n");

const stamp = (skillMarkdown: string, sourceMessageIds: readonly string[]) =>
  stampProjectHistorySkillgenSourceMessageIds({ skillMarkdown, sourceMessageIds });

describe("stampProjectHistorySkillgenSourceMessageIds", () => {
  it("fills the empty list the LLM wrote with the fed ids so validation passes", () => {
    const out = stamp(draft("source_message_ids: []"), ["m1", "m2"]);
    const validated = validateProjectHistorySkillgenDraft({ skillMarkdown: out });
    expect(validated.ok).toBe(true);
    if (validated.ok) {
      expect(validated.sourceMessageIds).toEqual(["m1", "m2"]);
      expect(validated.stepCount).toBe(2);
    }
    expect(out.match(/source_message_ids:/g)).toHaveLength(1);
    expect(out.endsWith("## Steps\n1. Build\n2. Deploy\n")).toBe(true);
  });

  it("never trusts ids the LLM invented (inline or YAML block list)", () => {
    const inline = stamp(draft("source_message_ids: [fake1, fake2]"), ["m9"]);
    const block = stamp(
      draft("source_message_ids:\n  - fake1\n  - fake2"),
      ["m9"],
    );
    for (const out of [inline, block]) {
      expect(out).not.toContain("fake");
      const validated = validateProjectHistorySkillgenDraft({ skillMarkdown: out });
      expect(validated.ok && validated.sourceMessageIds).toEqual(["m9"]);
    }
  });

  it("adds the key when the LLM left it out, trimming blanks and duplicates", () => {
    const out = stamp(draft(null), [" m1 ", "", "m2", "m1"]);
    expect(out).toContain('source_message_ids: ["m1","m2"]');
    const validated = validateProjectHistorySkillgenDraft({ skillMarkdown: out });
    expect(validated.ok && validated.sourceMessageIds).toEqual(["m1", "m2"]);
  });

  it("empty input ids fail validation cleanly with missing_source_message_ids", () => {
    const out = stamp(draft("source_message_ids: [m1]"), ["", "  "]);
    expect(out).toContain("source_message_ids: []");
    expect(validateProjectHistorySkillgenDraft({ skillMarkdown: out })).toEqual({
      ok: false,
      reason: "missing_source_message_ids",
    });
  });

  it("returns markdown without frontmatter unchanged", () => {
    expect(stamp("## Steps\n1. a\n2. b\n", ["m1"])).toBe("## Steps\n1. a\n2. b\n");
    expect(stamp("---\nname: x\n", ["m1"])).toBe("---\nname: x\n");
  });

  it("makes the dry-run writer stub validate once stamped", async () => {
    const result = await createOwnerLlmDraftWriter({ dryRun: true })({
      scrubbedTranscript: "x",
      similarDraftHints: [],
      mode: "write",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      const before = validateProjectHistorySkillgenDraft({
        skillMarkdown: result.skillMarkdown,
      });
      expect(before).toEqual({ ok: false, reason: "missing_source_message_ids" });
      const after = validateProjectHistorySkillgenDraft({
        skillMarkdown: stamp(result.skillMarkdown, ["m1"]),
      });
      expect(after.ok).toBe(true);
    }
  });
});
