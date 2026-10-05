import fs from "node:fs";
import path from "node:path";

import { emptyProjectHistorySkillgenBudget } from "./emptyProjectHistorySkillgenBudget";
import type { ProjectHistorySkillgenBudgetRecord } from "./projectHistorySkillgenEpisode.type";
import {
  PROJECT_HISTORY_SKILLGEN_BUDGET_FILE_NAME,
  PROJECT_HISTORY_SKILLGEN_DIR_NAME,
} from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";
import { utcDayKey } from "./utcDayKey";

const LOG_PREFIX = "[project-history-skillgen]";

const parseBudget = (
  raw: unknown,
  nowMs: number,
): ProjectHistorySkillgenBudgetRecord | null => {
  if (typeof raw !== "object" || raw === null) {
    return null;
  }
  const row = raw as Record<string, unknown>;
  if (typeof row.dayKey !== "string" || typeof row.tokensUsedToday !== "number") {
    return null;
  }
  if (
    !(row.lastClosedAtMs === null || typeof row.lastClosedAtMs === "number") ||
    typeof row.updatedAt !== "string"
  ) {
    return null;
  }
  const dayKey = utcDayKey(nowMs);
  if (row.dayKey !== dayKey) {
    return {
      dayKey,
      tokensUsedToday: 0,
      lastClosedAtMs: row.lastClosedAtMs,
      updatedAt: row.updatedAt,
    };
  }
  return {
    dayKey: row.dayKey,
    tokensUsedToday: Math.max(0, row.tokensUsedToday),
    lastClosedAtMs: row.lastClosedAtMs,
    updatedAt: row.updatedAt,
  };
};

/**
 * Reads `skillgen/budget.json`. Missing/corrupt → empty default (logged, never thrown).
 * Rolls tokens to 0 when the UTC day key changes.
 */
export const readProjectHistorySkillgenBudget = (input: {
  readonly projectId: string;
  readonly nowMs: number;
}): ProjectHistorySkillgenBudgetRecord => {
  const filePath = path.join(
    resolveProjectDataDir(input.projectId),
    PROJECT_HISTORY_SKILLGEN_DIR_NAME,
    PROJECT_HISTORY_SKILLGEN_BUDGET_FILE_NAME,
  );
  if (!fs.existsSync(filePath)) {
    return emptyProjectHistorySkillgenBudget(input.nowMs);
  }
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const budget = parseBudget(parsed, input.nowMs);
    if (budget === null) {
      console.error(LOG_PREFIX, "budget_corrupt", input.projectId);
      return emptyProjectHistorySkillgenBudget(input.nowMs);
    }
    return budget;
  } catch (error: unknown) {
    console.error(LOG_PREFIX, "budget_read_failed", input.projectId, error);
    return emptyProjectHistorySkillgenBudget(input.nowMs);
  }
};
