import type { AdvanceProjectHistorySkillgenEpisodeDeps } from "./advanceProjectHistorySkillgenEpisode";
import { advanceProjectHistorySkillgenEpisode } from "./advanceProjectHistorySkillgenEpisode";
import type { ProjectHistorySkillgenEpisodeRecord } from "./projectHistorySkillgenEpisode.type";
import type { ProjectHistorySkillgenBudgetRecord } from "./projectHistorySkillgenEpisode.type";
import type { AdvanceProjectHistorySkillgenMessage } from "./advanceProjectHistorySkillgenEpisode";
import type { ProjectHistorySkillgenMetricsEvent } from "./recordProjectHistorySkillgenMetrics";
import type { ProjectHistorySkillgenReviewFlag } from "./computeProjectHistorySkillgenReviewFlag";
import type { WriteProjectHistorySkillgenDraftResult } from "./writeProjectHistorySkillgenDraft";

export type RunProjectHistorySkillgenTickInput = {
  readonly projectId: string;
  readonly episode: ProjectHistorySkillgenEpisodeRecord;
  readonly messages: readonly AdvanceProjectHistorySkillgenMessage[];
  readonly budget: ProjectHistorySkillgenBudgetRecord;
  readonly nowMs: number;
  readonly deps: AdvanceProjectHistorySkillgenEpisodeDeps;
};

export type RunProjectHistorySkillgenTickResult = {
  readonly episode: ProjectHistorySkillgenEpisodeRecord;
  readonly metrics: readonly ProjectHistorySkillgenMetricsEvent[];
  readonly reviewFlag: ProjectHistorySkillgenReviewFlag;
  readonly draftWritten: WriteProjectHistorySkillgenDraftResult | null;
  readonly tokensSpent: number;
};

/**
 * Skillgen side of the History tick (DI entry). Isolates mining from ack/delete.
 * Persistence of episode/budget/metrics is the caller's responsibility in phase 1
 * when using this pure-IO advance; disk store helpers can wrap it later.
 */
export const runProjectHistorySkillgenTick = async (
  input: RunProjectHistorySkillgenTickInput,
): Promise<RunProjectHistorySkillgenTickResult> => {
  if (input.episode.projectId !== input.projectId) {
    throw new Error("project_id_mismatch");
  }
  return advanceProjectHistorySkillgenEpisode({
    episode: input.episode,
    messages: input.messages,
    tokensUsedToday: input.budget.tokensUsedToday,
    lastClosedAtMs: input.budget.lastClosedAtMs,
    nowMs: input.nowMs,
    deps: input.deps,
  });
};
