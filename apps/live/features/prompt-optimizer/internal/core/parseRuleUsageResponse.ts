import type {
  RuleCompareOverlap,
  RuleCompareUsageRow,
  RuleUsageResponse,
} from "./ruleCompare.type";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseRule = (value: unknown): RuleCompareUsageRow | null => {
  if (!isRecord(value)) return null;
  if (typeof value.ruleId !== "string" || typeof value.title !== "string") {
    return null;
  }
  if (typeof value.source !== "string" || typeof value.active !== "boolean") {
    return null;
  }
  if (typeof value.hitCount !== "number" || !Number.isFinite(value.hitCount)) {
    return null;
  }
  if (value.lastHitAt !== null && typeof value.lastHitAt !== "string") {
    return null;
  }
  return {
    ruleId: value.ruleId,
    title: value.title,
    source: value.source,
    active: value.active,
    hitCount: value.hitCount,
    lastHitAt: value.lastHitAt,
  };
};

const parseOverlap = (value: unknown): RuleCompareOverlap | null => {
  if (!isRecord(value)) return null;
  if (typeof value.ruleIdA !== "string" || typeof value.ruleIdB !== "string") {
    return null;
  }
  if (value.reason !== "duplicate" && value.reason !== "overlap") return null;
  if (typeof value.score !== "number" || !Number.isFinite(value.score)) {
    return null;
  }
  return {
    ruleIdA: value.ruleIdA,
    ruleIdB: value.ruleIdB,
    reason: value.reason,
    score: value.score,
  };
};

/** Pure parse of GET …/rules/usage JSON. */
export const parseRuleUsageResponse = (
  body: unknown,
): RuleUsageResponse | null => {
  if (!isRecord(body) || body.ok !== true) return null;
  if (typeof body.projectId !== "string") return null;
  if (body.windowDays !== null) return null;
  if (!Array.isArray(body.rules) || !Array.isArray(body.overlaps)) return null;
  const rules: RuleCompareUsageRow[] = [];
  for (const row of body.rules) {
    const parsed = parseRule(row);
    if (parsed === null) return null;
    rules.push(parsed);
  }
  const overlaps: RuleCompareOverlap[] = [];
  for (const row of body.overlaps) {
    const parsed = parseOverlap(row);
    if (parsed === null) return null;
    overlaps.push(parsed);
  }
  return {
    ok: true,
    projectId: body.projectId,
    windowDays: null,
    rules,
    overlaps,
  };
};
