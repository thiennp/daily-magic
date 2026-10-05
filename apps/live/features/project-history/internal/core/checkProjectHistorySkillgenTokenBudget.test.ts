import { describe, expect, it } from "vitest";

import { checkProjectHistorySkillgenTokenBudget } from "./checkProjectHistorySkillgenTokenBudget";

describe("checkProjectHistorySkillgenTokenBudget", () => {
  it("allows a run within day and run caps", () => {
    expect(
      checkProjectHistorySkillgenTokenBudget({
        tokensUsedToday: 10_000,
        estimatedRunTokens: 5_000,
      }),
    ).toMatchObject({ ok: true, remainingToday: 90_000 });
  });

  it("blocks when the day cap is spent", () => {
    expect(
      checkProjectHistorySkillgenTokenBudget({
        tokensUsedToday: 100_000,
        estimatedRunTokens: 1,
      }),
    ).toEqual({ ok: false, reason: "day_cap", remainingToday: 0 });
  });

  it("blocks when the estimate exceeds the run cap", () => {
    expect(
      checkProjectHistorySkillgenTokenBudget({
        tokensUsedToday: 0,
        estimatedRunTokens: 30_001,
      }),
    ).toMatchObject({ ok: false, reason: "run_cap" });
  });
});
