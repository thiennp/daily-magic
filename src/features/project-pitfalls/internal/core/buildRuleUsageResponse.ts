import { computeRuleCompareOverlaps } from "@/features/project-pitfalls/internal/core/computeRuleCompareOverlaps";
import { mapPitfallToRuleUsage } from "@/features/project-pitfalls/internal/core/mapPitfallToRuleUsage";
import type { ProjectPitfallView } from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import type { ProjectRuleUsageResult } from "@/features/project-pitfalls/internal/core/ruleUsage.type";

/**
 * Build rules/usage payload from merged pitfalls.
 * hitCount is all-time → windowDays always null. Pure.
 */
export const buildRuleUsageResponse = (input: {
  readonly projectId: string;
  readonly pitfalls: readonly ProjectPitfallView[];
}): ProjectRuleUsageResult => ({
  ok: true,
  projectId: input.projectId,
  windowDays: null,
  rules: input.pitfalls.map(mapPitfallToRuleUsage),
  overlaps: computeRuleCompareOverlaps(input.pitfalls),
});
