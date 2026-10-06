import { compareRuleOverlapPair } from "@/features/project-pitfalls/internal/core/compareRuleOverlapPair";
import { ruleCompareTextForOverlap } from "@/features/project-pitfalls/internal/core/ruleCompareTextForOverlap";
import type { ProjectPitfallView } from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import type { RuleCompareOverlap } from "@/features/project-pitfalls/internal/core/ruleUsage.type";

/**
 * Deterministic duplicate/overlap pairs among active pitfalls.
 * Pairs ordered by ruleId ascending; no model/network. Pure.
 */
export const computeRuleCompareOverlaps = (
  pitfalls: readonly ProjectPitfallView[],
): readonly RuleCompareOverlap[] => {
  const active = [...pitfalls]
    .filter((row) => row.source !== "retired")
    .sort((a, b) => a.id.localeCompare(b.id));
  const overlaps: RuleCompareOverlap[] = [];
  active.forEach((left, index) => {
    active.slice(index + 1).forEach((right) => {
      const pair = compareRuleOverlapPair({
        ruleIdA: left.id,
        ruleIdB: right.id,
        textA: ruleCompareTextForOverlap(left),
        textB: ruleCompareTextForOverlap(right),
      });
      if (pair !== null) {
        overlaps.push(pair);
      }
    });
  });
  return overlaps;
};
