import { describe, expect, it } from "vitest";

import {
  describeRuleUsageFlags,
  formatRuleUsageFlagLabel,
} from "./describeRuleUsageFlags";
import type { RuleCompareUsageRow } from "./ruleCompare.type";

const row = (
  overrides: Partial<RuleCompareUsageRow> & { ruleId: string },
): RuleCompareUsageRow => ({
  title: overrides.title ?? overrides.ruleId,
  source: "seed",
  active: true,
  hitCount: 0,
  lastHitAt: null,
  ...overrides,
});

describe("describeRuleUsageFlags", () => {
  it("marks never used and stale", () => {
    const never = row({ ruleId: "a", hitCount: 0 });
    expect(describeRuleUsageFlags({
      rule: never,
      rulesById: new Map([["a", never]]),
      overlaps: [],
    })).toEqual([{ kind: "never_used" }]);

    const stale = row({
      ruleId: "b",
      hitCount: 2,
      lastHitAt: "2026-01-01T00:00:00.000Z",
    });
    const flags = describeRuleUsageFlags({
      rule: stale,
      rulesById: new Map([["b", stale]]),
      overlaps: [],
      nowMs: Date.parse("2026-10-06T00:00:00.000Z"),
    });
    expect(flags[0]).toMatchObject({ kind: "stale" });
    expect(formatRuleUsageFlagLabel(flags[0]!)).toContain("Not used in");
  });

  it("describes duplicate and overlap", () => {
    const a = row({ ruleId: "a", title: "Alpha", hitCount: 1, lastHitAt: "2026-10-01T00:00:00.000Z" });
    const b = row({ ruleId: "b", title: "Beta", hitCount: 1, lastHitAt: "2026-10-01T00:00:00.000Z" });
    const flags = describeRuleUsageFlags({
      rule: a,
      rulesById: new Map([["a", a], ["b", b]]),
      overlaps: [
        { ruleIdA: "a", ruleIdB: "b", reason: "duplicate", score: 1 },
        { ruleIdA: "b", ruleIdB: "a", reason: "overlap", score: 0.5 },
      ],
      nowMs: Date.parse("2026-10-06T00:00:00.000Z"),
    });
    expect(flags.map(formatRuleUsageFlagLabel)).toEqual([
      "Same as Beta",
      "Overlaps with Beta",
    ]);
  });
});
