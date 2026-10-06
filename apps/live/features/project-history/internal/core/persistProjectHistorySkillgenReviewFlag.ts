import { PROJECT_HISTORY_SKILL_MAX_OPEN_DRAFTS } from "./projectHistory.constants";
import type { ProjectHistorySkillgenReviewFlag } from "./computeProjectHistorySkillgenReviewFlag";
import { readProjectHistorySkillgenFlags } from "./readProjectHistorySkillgenFlags";
import { writeProjectHistorySkillgenFlags } from "./writeProjectHistorySkillgenFlags";

/**
 * Step 13 — persist draft-waiting / mining-paused notify into skillgen/flags.json.
 * AWL UI Soft HOLD; local flag is enough for owner notify until UI lands.
 * Merges with existing flags (never drops pitfalls). Never throws.
 */
export const persistProjectHistorySkillgenReviewFlag = (input: {
  readonly projectId: string;
  readonly reviewFlag: ProjectHistorySkillgenReviewFlag;
  readonly nowMs: number;
  readonly maxOpenDrafts?: number;
}): void => {
  try {
    const nowIso = new Date(input.nowMs).toISOString();
    const max = input.maxOpenDrafts ?? PROJECT_HISTORY_SKILL_MAX_OPEN_DRAFTS;
    const existing = readProjectHistorySkillgenFlags(input.projectId);
    const { reviewFlag } = input;
    writeProjectHistorySkillgenFlags({
      projectId: input.projectId,
      file: {
        historyLearnedPitfalls: existing.historyLearnedPitfalls,
        skillgenDraftsReview: reviewFlag.miningPaused
          ? {
              active: true,
              openDraftCount: reviewFlag.draftWaitingCount,
              maxOpenDrafts: max,
              miningPaused: true,
              notifiedAt: nowIso,
              summary: `Mining paused: ${reviewFlag.draftWaitingCount}/${max} open skill drafts await review`,
            }
          : reviewFlag.draftWaitingCount > 0
            ? {
                active: true,
                openDraftCount: reviewFlag.draftWaitingCount,
                maxOpenDrafts: max,
                miningPaused: false,
                notifiedAt: nowIso,
                summary: `${reviewFlag.draftWaitingCount} skill draft(s) await owner review`,
              }
            : null,
        updatedAt: nowIso,
      },
    });
  } catch {
    // never fail the tick
  }
};
