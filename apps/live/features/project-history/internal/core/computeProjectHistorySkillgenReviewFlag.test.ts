import { describe, expect, it } from "vitest";

import { computeProjectHistorySkillgenReviewFlag } from "./computeProjectHistorySkillgenReviewFlag";

describe("computeProjectHistorySkillgenReviewFlag", () => {
  it("reports waiting count under the cap", () => {
    expect(computeProjectHistorySkillgenReviewFlag({ openDraftCount: 3 })).toEqual({
      draftWaitingCount: 3,
      capReached: false,
      miningPaused: false,
    });
  });

  it("pauses mining at the cap", () => {
    expect(
      computeProjectHistorySkillgenReviewFlag({ openDraftCount: 20 }),
    ).toEqual({
      draftWaitingCount: 20,
      capReached: true,
      miningPaused: true,
    });
  });
});
