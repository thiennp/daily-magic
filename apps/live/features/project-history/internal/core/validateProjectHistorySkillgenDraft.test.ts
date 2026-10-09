import { describe, expect, it } from "vitest";

import { validateProjectHistorySkillgenDraft } from "./validateProjectHistorySkillgenDraft";

const validDraft = `---
name: deploy-staging
description: Deploy current branch to staging and verify health.
version: 0.1.0
source_message_ids: [m1, m2]
status: draft
---
# When to use
Ship to staging.

## Steps
1. Build the app
2. Push to staging
3. Verify health

## Pitfalls
Do not skip health checks.

## Verification
Hit /health.
`;

describe("validateProjectHistorySkillgenDraft", () => {
  it("accepts a well-formed draft", () => {
    const result = validateProjectHistorySkillgenDraft({
      skillMarkdown: validDraft,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.name).toBe("deploy-staging");
      expect(result.stepCount).toBeGreaterThanOrEqual(2);
    }
  });

  it("rejects too few steps", () => {
    const md = validDraft.replace(
      /## Steps[\s\S]*?## Pitfalls/,
      "## Steps\n1. Only one\n\n## Pitfalls",
    );
    expect(validateProjectHistorySkillgenDraft({ skillMarkdown: md })).toEqual({
      ok: false,
      reason: "too_few_steps",
    });
  });

  it("rejects residual secrets", () => {
    const md = validDraft.replace(
      "Hit /health.",
      "Use sk-abcdefghijklmnopqrstuvwxyz12",
    );
    expect(validateProjectHistorySkillgenDraft({ skillMarkdown: md })).toEqual({
      ok: false,
      reason: "residual_secret",
    });
  });

  it("rejects missing frontmatter", () => {
    expect(
      validateProjectHistorySkillgenDraft({
        skillMarkdown: "## Steps\n1. a\n2. b\n",
      }),
    ).toEqual({ ok: false, reason: "missing_frontmatter" });
  });
});

describe("validateProjectHistorySkillgenDraft reusability", () => {
  const draft = (name: string, description: string, step: string): string =>
    [
      "---",
      `name: ${name}`,
      `description: ${description}`,
      "version: 0.1.0",
      "status: draft",
      'source_message_ids: ["m1"]',
      "---",
      "## Steps",
      `1. ${step}`,
      "2. Run <build-command>.",
    ].join("\n");

  it("rejects a description that repeats the name", () => {
    expect(
      validateProjectHistorySkillgenDraft({
        skillMarkdown: draft("run-checks", "run-checks", "Read <file>."),
      }),
    ).toEqual({ ok: false, reason: "description_repeats_name" });
  });

  it("rejects ticket keys, PRs and known names", () => {
    const reason = (markdown: string, knownNames?: readonly string[]) => {
      const result = validateProjectHistorySkillgenDraft({
        skillMarkdown: markdown,
        knownNames,
      });
      return result.ok ? "ok" : result.reason;
    };
    expect(
      reason(draft("review-patterns", "Use when reviewing.", "Fix NRG-3260.")),
    ).toBe("not_reusable");
    expect(
      reason(draft("review-patterns", "Use when reviewing.", "Merge PR 4745.")),
    ).toBe("not_reusable");
    expect(
      reason(draft("review-patterns", "Use when reviewing.", "Ask Thien."), [
        "Thien",
      ]),
    ).toBe("not_reusable");
    expect(
      reason(
        draft("review-patterns", "Use when reviewing.", "Ask <reviewer>."),
        ["Thien"],
      ),
    ).toBe("ok");
  });
});
