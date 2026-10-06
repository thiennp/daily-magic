import type { ProjectPitfallView } from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import type { RuleUsageRow } from "@/features/project-pitfalls/internal/core/ruleUsage.type";

/** Map a merged pitfall view to the rule-usage wire row. Pure. */
export const mapPitfallToRuleUsage = (
  pitfall: ProjectPitfallView,
): RuleUsageRow => ({
  ruleId: pitfall.id,
  title: pitfall.symptom,
  source: pitfall.source,
  active: pitfall.source !== "retired",
  hitCount: pitfall.hitCount,
  lastHitAt: pitfall.lastSeenAt,
});
