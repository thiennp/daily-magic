import { describe, expect, it } from "vitest";

import { parseRuleUsageResponse } from "./parseRuleUsageResponse";

describe("parseRuleUsageResponse", () => {
  it("parses a valid usage payload", () => {
    const parsed = parseRuleUsageResponse({
      ok: true,
      projectId: "p1",
      windowDays: null,
      rules: [
        {
          ruleId: "stale-next",
          title: "Stale cache",
          source: "seed",
          active: true,
          hitCount: 0,
          lastHitAt: null,
        },
      ],
      overlaps: [
        {
          ruleIdA: "a",
          ruleIdB: "b",
          reason: "duplicate",
          score: 1,
        },
      ],
    });
    expect(parsed?.rules[0]?.ruleId).toBe("stale-next");
    expect(parsed?.overlaps[0]?.reason).toBe("duplicate");
  });

  it("rejects invalid bodies", () => {
    expect(parseRuleUsageResponse(null)).toBeNull();
    expect(parseRuleUsageResponse({ ok: false })).toBeNull();
    expect(
      parseRuleUsageResponse({
        ok: true,
        projectId: "p1",
        windowDays: 30,
        rules: [],
        overlaps: [],
      }),
    ).toBeNull();
  });
});
