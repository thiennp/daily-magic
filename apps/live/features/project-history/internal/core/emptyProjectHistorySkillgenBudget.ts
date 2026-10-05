import type { ProjectHistorySkillgenBudgetRecord } from "./projectHistorySkillgenEpisode.type";
import { utcDayKey } from "./utcDayKey";

/** Default budget when missing or unreadable. */
export const emptyProjectHistorySkillgenBudget = (
  nowMs: number,
): ProjectHistorySkillgenBudgetRecord => ({
  dayKey: utcDayKey(nowMs),
  tokensUsedToday: 0,
  lastClosedAtMs: null,
  updatedAt: new Date(nowMs).toISOString(),
});
