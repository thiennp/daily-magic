import {
  RULE_USAGE_DAYS_DEFAULT,
  RULE_USAGE_DAYS_MAX,
  RULE_USAGE_DAYS_MIN,
} from "@/features/project-pitfalls/internal/core/ruleCompareOverlap.constant";
import type { ProjectPitfallFailure } from "@/features/project-pitfalls/internal/core/projectPitfall.type";

/** Parse ?days=; default 30; clamp 1..90. Missing → default. Pure. */
export const parseRuleUsageDays = (
  raw: string | null,
): { readonly ok: true; readonly days: number } | ProjectPitfallFailure => {
  if (raw === null || raw.trim() === "") {
    return { ok: true, days: RULE_USAGE_DAYS_DEFAULT };
  }
  const parsed = Number(raw);
  if (!Number.isInteger(parsed)) {
    return { ok: false, code: "invalid_arguments", field: "days" };
  }
  if (parsed < RULE_USAGE_DAYS_MIN || parsed > RULE_USAGE_DAYS_MAX) {
    return { ok: false, code: "invalid_arguments", field: "days" };
  }
  return { ok: true, days: parsed };
};
