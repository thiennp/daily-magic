import { appendProjectHistorySkillgenMetrics } from "./appendProjectHistorySkillgenMetrics";
import type { AdvanceProjectHistorySkillgenEpisodeResult } from "./advanceProjectHistorySkillgenEpisode";
import type { ProjectHistorySkillgenBudgetRecord } from "./projectHistorySkillgenEpisode.type";
import type { ProjectHistorySkillgenEpisodesFile } from "./projectHistorySkillgenEpisode.type";
import { upsertProjectHistorySkillgenEpisode } from "./upsertProjectHistorySkillgenEpisode";
import { writeProjectHistorySkillgenBudget } from "./writeProjectHistorySkillgenBudget";
import { writeProjectHistorySkillgenEpisodes } from "./writeProjectHistorySkillgenEpisodes";

/**
 * Persists episode upsert, budget tokens, cursor, and metrics after one advance.
 */
export const persistProjectHistorySkillgenAdvance = (input: {
  readonly projectId: string;
  readonly episodesFile: ProjectHistorySkillgenEpisodesFile;
  readonly budget: ProjectHistorySkillgenBudgetRecord;
  readonly result: AdvanceProjectHistorySkillgenEpisodeResult;
  readonly nowMs: number;
}): void => {
  const { result, episodesFile, budget, projectId, nowMs } = input;
  let cursorMessageId = episodesFile.cursorMessageId;
  let cursorSavedAtMs = episodesFile.cursorSavedAtMs;
  if (
    result.episode.state !== "CAPTURING" &&
    result.episode.messageIds.length > 0
  ) {
    cursorMessageId =
      result.episode.messageIds[result.episode.messageIds.length - 1]!;
    // Pair the cursor id with that last message's savedAt, not closedAtMs.
    cursorSavedAtMs = result.episode.lastMessageAtMs ?? cursorSavedAtMs;
  }

  writeProjectHistorySkillgenEpisodes({
    projectId,
    file: {
      episodes: upsertProjectHistorySkillgenEpisode(
        episodesFile.episodes,
        result.episode,
      ),
      cursorMessageId,
      cursorSavedAtMs,
      updatedAt: new Date(nowMs).toISOString(),
    },
  });

  writeProjectHistorySkillgenBudget({
    projectId,
    budget: {
      dayKey: budget.dayKey,
      tokensUsedToday: budget.tokensUsedToday + result.tokensSpent,
      lastClosedAtMs: result.episode.closedAtMs ?? budget.lastClosedAtMs,
      updatedAt: new Date(nowMs).toISOString(),
    },
  });

  appendProjectHistorySkillgenMetrics({
    projectId,
    events: result.metrics,
  });
};
