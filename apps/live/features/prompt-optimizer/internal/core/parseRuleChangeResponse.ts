import { parseRuleUsageResponse } from "./parseRuleUsageResponse";
import type { RuleChangeResponse, RuleCompareUsageRow } from "./ruleCompare.type";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** Reuse usage-row shape from a single `rule` field on drop/restore JSON. */
const parseRuleField = (value: unknown): RuleCompareUsageRow | null => {
  const wrapped = parseRuleUsageResponse({
    ok: true,
    projectId: "x",
    windowDays: null,
    rules: [value],
    overlaps: [],
  });
  return wrapped?.rules[0] ?? null;
};

/** Pure parse of POST …/rules/{id}/drop|restore JSON. */
export const parseRuleChangeResponse = (
  body: unknown,
): RuleChangeResponse | null => {
  if (!isRecord(body) || body.ok !== true) return null;
  if (typeof body.projectId !== "string") return null;
  if (typeof body.changed !== "boolean") return null;
  const rule = parseRuleField(body.rule);
  if (rule === null) return null;
  return { ok: true, projectId: body.projectId, rule, changed: body.changed };
};
