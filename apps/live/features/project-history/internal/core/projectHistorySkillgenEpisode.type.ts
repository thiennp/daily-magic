import type { ProjectHistorySkillgenState } from "./projectHistorySkillgenStateMachine";

export type ProjectHistorySkillgenEpisodeRecord = {
  readonly episodeId: string;
  readonly projectId: string;
  readonly state: ProjectHistorySkillgenState;
  readonly messageIds: readonly string[];
  readonly startedAtMs: number;
  readonly lastMessageAtMs: number;
  readonly closedAtMs: number | null;
  readonly reason: string | null;
  readonly scrubbedTranscript: string | null;
  readonly ownerMarkedSaveAsSkill: boolean;
  readonly hasSuccessSignal: boolean;
  readonly validateAttempts: number;
  readonly draftId: string | null;
  readonly contentHash: string | null;
  readonly mergeDraftId: string | null;
  readonly tokensUsed: number;
};

export type ProjectHistorySkillgenBudgetRecord = {
  readonly dayKey: string;
  readonly tokensUsedToday: number;
  readonly lastClosedAtMs: number | null;
  readonly updatedAt: string;
};

export type ProjectHistorySkillgenEpisodesFile = {
  readonly episodes: readonly ProjectHistorySkillgenEpisodeRecord[];
  readonly updatedAt: string;
};
