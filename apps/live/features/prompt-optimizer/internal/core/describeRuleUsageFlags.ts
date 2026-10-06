import { RULE_COMPARE_COPY } from "./ruleCompareCopy.constant";
import type {
  RuleCompareOverlap,
  RuleCompareUsageRow,
  RuleUsageFlag,
} from "./ruleCompare.type";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const daysSince = (iso: string, nowMs: number): number | null => {
  const then = Date.parse(iso);
  if (!Number.isFinite(then)) return null;
  return Math.max(0, Math.floor((nowMs - then) / MS_PER_DAY));
};

/** Pure flags for one usage row (never used / stale / overlap). */
export const describeRuleUsageFlags = (input: {
  readonly rule: RuleCompareUsageRow;
  readonly rulesById: ReadonlyMap<string, RuleCompareUsageRow>;
  readonly overlaps: readonly RuleCompareOverlap[];
  readonly nowMs?: number;
  readonly staleAfterDays?: number;
}): readonly RuleUsageFlag[] => {
  const nowMs = input.nowMs ?? Date.now();
  const staleAfterDays = input.staleAfterDays ?? 30;
  const flags: RuleUsageFlag[] = [];
  if (input.rule.hitCount === 0) {
    flags.push({ kind: "never_used" });
  } else if (input.rule.lastHitAt !== null) {
    const days = daysSince(input.rule.lastHitAt, nowMs);
    if (days !== null && days > staleAfterDays) {
      flags.push({ kind: "stale", days });
    }
  }
  for (const overlap of input.overlaps) {
    const otherId =
      overlap.ruleIdA === input.rule.ruleId
        ? overlap.ruleIdB
        : overlap.ruleIdB === input.rule.ruleId
          ? overlap.ruleIdA
          : null;
    if (otherId === null) continue;
    const other = input.rulesById.get(otherId);
    const title = other?.title ?? otherId;
    if (overlap.reason === "duplicate") {
      flags.push({ kind: "same_as", ruleTitle: title });
    } else {
      flags.push({ kind: "overlaps", ruleTitle: title });
    }
  }
  return flags;
};

export const formatRuleUsageFlagLabel = (flag: RuleUsageFlag): string => {
  switch (flag.kind) {
    case "never_used":
      return RULE_COMPARE_COPY.neverUsed;
    case "stale":
      return RULE_COMPARE_COPY.notUsedInDays(flag.days);
    case "same_as":
      return RULE_COMPARE_COPY.sameAs(flag.ruleTitle);
    case "overlaps":
      return RULE_COMPARE_COPY.overlapsWith(flag.ruleTitle);
    default: {
      const _exhaustive: never = flag;
      return _exhaustive;
    }
  }
};
