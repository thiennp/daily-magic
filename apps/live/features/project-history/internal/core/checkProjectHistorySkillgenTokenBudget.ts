import {
  PROJECT_HISTORY_SKILL_DAY_TOKEN_CAP,
  PROJECT_HISTORY_SKILL_RUN_TOKEN_CAP,
} from "./projectHistory.constants";

export type CheckProjectHistorySkillgenTokenBudgetInput = {
  readonly tokensUsedToday: number;
  /** Estimated tokens for this run (0 = only check remaining day budget). */
  readonly estimatedRunTokens?: number;
  readonly runCap?: number;
  readonly dayCap?: number;
};

export type CheckProjectHistorySkillgenTokenBudgetResult =
  | { readonly ok: true; readonly remainingToday: number; readonly runCap: number }
  | {
      readonly ok: false;
      readonly reason: "day_cap" | "run_cap";
      readonly remainingToday: number;
    };

/**
 * Step 3 — token budget check. Pure counters only; never inspects bodies.
 */
export const checkProjectHistorySkillgenTokenBudget = (
  input: CheckProjectHistorySkillgenTokenBudgetInput,
): CheckProjectHistorySkillgenTokenBudgetResult => {
  const runCap = input.runCap ?? PROJECT_HISTORY_SKILL_RUN_TOKEN_CAP;
  const dayCap = input.dayCap ?? PROJECT_HISTORY_SKILL_DAY_TOKEN_CAP;
  const used = Math.max(0, input.tokensUsedToday);
  const remainingToday = Math.max(0, dayCap - used);
  const estimated = Math.max(0, input.estimatedRunTokens ?? 0);

  if (remainingToday <= 0) {
    return { ok: false, reason: "day_cap", remainingToday: 0 };
  }
  if (estimated > runCap) {
    return { ok: false, reason: "run_cap", remainingToday };
  }
  if (estimated > remainingToday) {
    return { ok: false, reason: "day_cap", remainingToday };
  }
  return { ok: true, remainingToday, runCap: Math.min(runCap, remainingToday) };
};
