import type { ProjectHistoryPitfallFailureState } from "./projectHistoryPitfallFailureStates.constant";

export type ProjectHistoryLearnedPitfall = {
  readonly id: string;
  readonly symptom: string;
  readonly avoidance: string;
  readonly sourceEpisodeId: string;
  readonly sourceState: ProjectHistoryPitfallFailureState;
  readonly contentHash: string;
  readonly createdAt: string;
};

export type ProjectHistoryLearnedPitfallsFile = {
  readonly items: readonly ProjectHistoryLearnedPitfall[];
  readonly updatedAt: string;
};

/** Step 13 — local owner-notify when open drafts hit the cap (AWL UI Soft HOLD). */
export type ProjectHistorySkillgenDraftsReviewFlag = {
  readonly active: boolean;
  readonly openDraftCount: number;
  readonly maxOpenDrafts: number;
  readonly miningPaused: boolean;
  readonly notifiedAt: string;
  readonly summary: string;
};

export type ProjectHistorySkillgenFlagsFile = {
  readonly historyLearnedPitfalls: {
    readonly active: boolean;
    readonly count: number;
    readonly updatedAt: string;
    readonly summary: string;
  } | null;
  /** Draft-cap / mining-paused notify; null when under the cap. */
  readonly skillgenDraftsReview: ProjectHistorySkillgenDraftsReviewFlag | null;
  readonly updatedAt: string;
};
