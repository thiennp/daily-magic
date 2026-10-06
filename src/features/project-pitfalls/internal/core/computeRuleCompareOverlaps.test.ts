import { describe, expect, it } from "vitest";

import { buildRuleUsageResponse } from "@/features/project-pitfalls/internal/core/buildRuleUsageResponse";
import { computeRuleCompareOverlaps } from "@/features/project-pitfalls/internal/core/computeRuleCompareOverlaps";
import { pitfallViewFixture } from "@/features/project-pitfalls/internal/core/projectPitfall.fixtures";
import { RULE_COMPARE_OVERLAP_JACCARD_THRESHOLD } from "@/features/project-pitfalls/internal/core/ruleCompareOverlap.constant";

describe("computeRuleCompareOverlaps", () => {
  it("flags exact normalized duplicates with score 1", () => {
    const a = pitfallViewFixture({
      id: "rule-a",
      symptom: "Do not force-push!",
      avoidance: "Use a new -r2 branch.",
    });
    const b = pitfallViewFixture({
      id: "rule-b",
      symptom: "do not force-push",
      avoidance: "use a new r2 branch",
    });
    expect(computeRuleCompareOverlaps([b, a])).toEqual([
      {
        ruleIdA: "rule-a",
        ruleIdB: "rule-b",
        reason: "duplicate",
        score: 1,
      },
    ]);
  });

  it("flags Jaccard overlaps above threshold and skips retired", () => {
    const shared =
      "never reset clean checkout worktree home stash dirty shared folder";
    const a = pitfallViewFixture({
      id: "alpha",
      symptom: shared,
      avoidance: "work in a tmp worktree only",
    });
    const b = pitfallViewFixture({
      id: "beta",
      symptom: shared,
      avoidance: "work in a separate git worktree under tmp",
    });
    const retired = pitfallViewFixture({
      id: "gone",
      source: "retired",
      symptom: shared,
      avoidance: "work in a tmp worktree only",
    });
    const overlaps = computeRuleCompareOverlaps([retired, b, a]);
    expect(overlaps).toHaveLength(1);
    expect(overlaps[0]?.reason).toBe("overlap");
    expect(overlaps[0]?.ruleIdA).toBe("alpha");
    expect(overlaps[0]?.ruleIdB).toBe("beta");
    expect(overlaps[0]?.score ?? 0).toBeGreaterThanOrEqual(
      RULE_COMPARE_OVERLAP_JACCARD_THRESHOLD,
    );
  });

  it("returns no pairs when texts are unrelated", () => {
    const a = pitfallViewFixture({
      id: "a",
      symptom: "Build fails on typecheck",
      avoidance: "Delete the next folder first",
    });
    const b = pitfallViewFixture({
      id: "b",
      symptom: "Invite email bounced",
      avoidance: "Ask the member to check spam",
    });
    expect(computeRuleCompareOverlaps([a, b])).toEqual([]);
  });
});

describe("buildRuleUsageResponse", () => {
  it("maps pitfalls to rules and sets windowDays null", () => {
    const pitfall = pitfallViewFixture({
      id: "stale-next",
      hitCount: 3,
      lastSeenAt: "2026-10-01T00:00:00.000Z",
    });
    const result = buildRuleUsageResponse({
      projectId: "p1",
      pitfalls: [pitfall],
    });
    expect(result).toMatchObject({
      ok: true,
      projectId: "p1",
      windowDays: null,
      rules: [
        {
          ruleId: "stale-next",
          title: pitfall.symptom,
          source: "seed",
          active: true,
          hitCount: 3,
          lastHitAt: "2026-10-01T00:00:00.000Z",
        },
      ],
      overlaps: [],
    });
  });
});
