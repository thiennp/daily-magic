import { describe, expect, it } from "vitest";

import { validateDocSkillDraft } from "./validateDocSkillDraft";

const SHA = "b".repeat(40);
const doc = (extra = "", fm = ""): string =>
  `---\nname: ok-skill\ndescription: Do the thing\nversion: 0.1.0\nsource: docs/qa/a.md@${SHA}\n${fm}---\n\n1. one\n2. two\n3. three\n${extra}\n`;

describe("validateDocSkillDraft", () => {
  it("allows relative paths, ids and https urls", () => {
    expect(
      validateDocSkillDraft(
        doc(
          "See src/features/x.ts, ticket SKILL-001 and https://www.agentwitch.com",
        ),
      ),
    ).toMatchObject({ ok: true });
  });

  it("allows product paths such as ~/.agent-witch and /etc", () => {
    expect(
      validateDocSkillDraft(
        doc("Config lives in ~/.agent-witch/config.json, hosts in /etc/hosts"),
      ),
    ).toMatchObject({ ok: true });
  });

  it("rejects absolute paths and emails", () => {
    expect(validateDocSkillDraft(doc("open /Users/a/b"))).toEqual({
      ok: false,
      reason: "absolute_path_or_email",
    });
    expect(validateDocSkillDraft(doc("mail someone@example.com"))).toEqual({
      ok: false,
      reason: "absolute_path_or_email",
    });
  });

  it("rejects a leaked secret", () => {
    expect(
      validateDocSkillDraft(doc("key sk-abcdefghijklmnopqrstuvwxyz0123456789")),
    ).toEqual({ ok: false, reason: "residual_secret" });
  });

  it("needs a source stamp, a distinct description and three steps", () => {
    expect(validateDocSkillDraft(doc().replace(/source:.*\n/, ""))).toEqual({
      ok: false,
      reason: "missing_source",
    });
    expect(
      validateDocSkillDraft(doc().replace("Do the thing", "ok-skill")),
    ).toEqual({ ok: false, reason: "description_repeats_name" });
    expect(validateDocSkillDraft(doc().replace("3. three\n", ""))).toEqual({
      ok: false,
      reason: "too_few_steps",
    });
  });
});
