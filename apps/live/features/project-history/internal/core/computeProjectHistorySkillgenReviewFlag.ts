import { PROJECT_HISTORY_SKILL_MAX_OPEN_DRAFTS } from "./projectHistory.constants";

export type ComputeProjectHistorySkillgenReviewFlagInput = {
  readonly openDraftCount: number;
  readonly maxOpenDrafts?: number;
};

export type ProjectHistorySkillgenReviewFlag = {
  /** Step 13 — local-only: how many drafts await owner review. */
  readonly draftWaitingCount: number;
  /** True when open drafts are at the cap (mining must pause). */
  readonly capReached: boolean;
  /** Same as capReached; explicit pause signal for the tick. */
  readonly miningPaused: boolean;
};

/**
 * Step 13 — draft-waiting count and cap-reached flag (no UI in phase 1).
 */
export const computeProjectHistorySkillgenReviewFlag = (
  input: ComputeProjectHistorySkillgenReviewFlagInput,
): ProjectHistorySkillgenReviewFlag => {
  const max = input.maxOpenDrafts ?? PROJECT_HISTORY_SKILL_MAX_OPEN_DRAFTS;
  const count = Math.max(0, input.openDraftCount);
  const capReached = count >= max;
  return {
    draftWaitingCount: count,
    capReached,
    miningPaused: capReached,
  };
};
