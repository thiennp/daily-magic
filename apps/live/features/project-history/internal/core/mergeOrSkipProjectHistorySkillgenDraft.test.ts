import { describe, expect, it } from "vitest";

import { mergeOrSkipProjectHistorySkillgenDraft } from "./mergeOrSkipProjectHistorySkillgenDraft";

describe("mergeOrSkipProjectHistorySkillgenDraft", () => {
  const draft = {
    id: "d1",
    contentHash: "sha256:aaa",
    name: "deploy-staging",
    stepLines: ["build the app", "push to staging", "verify health"],
  };

  it("skips on exact contentHash against a draft", () => {
    expect(
      mergeOrSkipProjectHistorySkillgenDraft({
        contentHash: "sha256:aaa",
        name: "other",
        stepLines: ["x"],
        existingDrafts: [draft],
        existingPublished: [],
      }),
    ).toEqual({
      action: "skip_exact",
      matchKind: "draft",
      matchId: "d1",
    });
  });

  it("updates when the name matches", () => {
    expect(
      mergeOrSkipProjectHistorySkillgenDraft({
        contentHash: "sha256:bbb",
        name: "Deploy Staging",
        stepLines: ["totally different"],
        existingDrafts: [draft],
        existingPublished: [],
      }),
    ).toEqual({
      action: "update_draft",
      draftId: "d1",
      reason: "same_name",
    });
  });

  it("updates when steps are near-duplicates", () => {
    expect(
      mergeOrSkipProjectHistorySkillgenDraft({
        contentHash: "sha256:ccc",
        name: "ship-it",
        stepLines: ["build the app", "push to staging", "verify health", "notify"],
        existingDrafts: [draft],
        existingPublished: [],
      }),
    ).toMatchObject({ action: "update_draft", reason: "similar_steps" });
  });

  it("creates new when nothing matches", () => {
    expect(
      mergeOrSkipProjectHistorySkillgenDraft({
        contentHash: "sha256:ddd",
        name: "fresh-skill",
        stepLines: ["one", "two", "three"],
        existingDrafts: [draft],
        existingPublished: [],
      }),
    ).toEqual({ action: "create_new" });
  });
});
