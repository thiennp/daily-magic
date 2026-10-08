export type AutoSkillJudgePref = "auto" | "ollama" | "agent" | "bot";
export type AutoSkillPublishMode = "draft" | "publish";
export type AutoSkillSuggestionStatus =
  "pending" | "saved" | "not_now" | "never";
export type AutoSkillAnswer = "save" | "not_now" | "never";

export interface AutoSkillsSettings {
  readonly enabled: boolean;
  readonly judgePref: AutoSkillJudgePref;
  readonly publishMode: AutoSkillPublishMode;
}

export interface AutoSkillsStatus {
  readonly judgeKind: string | null;
  readonly judgeLabel: string | null;
  readonly pausedReason: string | null;
  readonly statusNote: string | null;
  readonly lastCheckedAt: string | null;
}

export interface AutoSkillSuggestionMatch {
  readonly runId: string;
  readonly completedAt: string;
  readonly summary: string;
}

export interface AutoSkillSuggestion {
  readonly id: string;
  readonly clusterId: string;
  readonly status: AutoSkillSuggestionStatus;
  readonly title: string;
  readonly prompt: string;
  readonly occurrences: number;
  readonly matches: readonly AutoSkillSuggestionMatch[];
  readonly draftName: string;
  readonly draftBody: string;
  readonly judgeLabel: string | null;
  readonly skillId: string | null;
  readonly createdAt: string;
}

/** What the Library strip renders. */
export interface AutoSkillsOverview
  extends AutoSkillsSettings, AutoSkillsStatus {
  readonly pending: readonly AutoSkillSuggestion[];
  /** skillIds that were saved from an auto question (Library "Auto" chip). */
  readonly autoSkillIds: readonly string[];
}
