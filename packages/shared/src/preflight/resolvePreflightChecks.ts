import type { ProjectPitfallView } from "../pitfalls/ProjectPitfall.type";
import {
  PREFLIGHT_ACTION_REQUIRED_CHECKS,
  PREFLIGHT_RERUN_HINT,
  type PreflightActionId,
} from "./preflightAction.constant";
import { PREFLIGHT_CHECK_BY_ID } from "./preflightCheckCatalog.constant";
import type { ResolvedPreflightCheck } from "./PreflightResult.type";

const isActiveBlockPitfall = (pitfall: ProjectPitfallView): boolean =>
  pitfall.source !== "retired" && pitfall.severity === "block";

const fromCatalog = (checkId: string): ResolvedPreflightCheck | null => {
  const check = PREFLIGHT_CHECK_BY_ID[checkId];
  if (check === undefined) {
    return null;
  }
  return {
    checkId: check.id,
    name: check.name,
    defaultClass: check.defaultClass,
    intent: check.intent,
    fix: check.fix,
    rerunHint: check.rerunHint,
    pitfallId: null,
  };
};

const fromPitfall = (pitfall: ProjectPitfallView): ResolvedPreflightCheck => ({
  checkId: `pit.${pitfall.id}`,
  name: pitfall.symptom,
  defaultClass: "block",
  intent: pitfall.cause,
  fix: pitfall.avoidance,
  rerunHint: PREFLIGHT_RERUN_HINT,
  pitfallId: pitfall.id,
});

/**
 * Required catalog checks for the action, unioned with active block pitfalls
 * that define a check (as `pit.<id>`). Dedupes by checkId.
 */
export const resolvePreflightChecks = (
  actionId: PreflightActionId,
  pitfalls: readonly ProjectPitfallView[],
): readonly ResolvedPreflightCheck[] => {
  const byId = new Map<string, ResolvedPreflightCheck>();
  for (const checkId of PREFLIGHT_ACTION_REQUIRED_CHECKS[actionId]) {
    const resolved = fromCatalog(checkId);
    if (resolved !== null) {
      byId.set(resolved.checkId, resolved);
    }
  }
  for (const pitfall of pitfalls) {
    if (!isActiveBlockPitfall(pitfall)) {
      continue;
    }
    if (pitfall.check.value.trim().length === 0) {
      continue;
    }
    const resolved = fromPitfall(pitfall);
    if (!byId.has(resolved.checkId)) {
      byId.set(resolved.checkId, resolved);
    }
  }
  return [...byId.values()];
};
