export type KnowledgeCapabilitiesReport = {
  readonly enabled: boolean;
  readonly storage: "sqlite" | "none";
  readonly ollama: "ready" | "missing";
  readonly embedModel: string;
  readonly cardCount: number;
};

export type KnowledgeDailyReport = {
  readonly projectId: string;
  readonly day: string;
  readonly runs: number;
  readonly holdoutRuns: number;
  readonly runsWith: number;
  readonly repeatsWith: number;
  readonly repeatsHoldout: number;
  readonly cardsInjected: number;
  readonly injectedTokens: number;
  readonly mistakesAvoided: number;
  readonly estTokensSaved: number;
  readonly correctionTurns: number;
};

export type KnowledgeSharedCardReport = {
  readonly projectId: string;
  readonly cardId: string;
  readonly kind: string;
  readonly takeaway: string;
  readonly files: readonly string[];
  readonly outcome: string;
  readonly commitSha: string | null;
  readonly hits: number;
  readonly occurrences: number;
  readonly updatedAt: string;
};

export type SkillSavingsReport = {
  readonly skillId: string;
  readonly calls: number;
  readonly saved: number;
  readonly baseline: number | null;
  readonly samples: number;
  readonly holdouts: number;
  readonly estimate: boolean;
  readonly missRate: number;
  readonly hasScripts: boolean;
  readonly scriptCount: number;
};

export type SkillWeeklyReport = {
  readonly weekStart: string;
  readonly chosen: number;
  readonly missed: number;
};

/** One project's skill stats from one computer (a full snapshot). */
export type SkillStatsReport = {
  readonly projectId: string;
  readonly skills: readonly SkillSavingsReport[];
  readonly weekly: readonly SkillWeeklyReport[];
};

export type KnowledgeHeartbeatReport = {
  readonly capabilities: KnowledgeCapabilitiesReport;
  readonly daily: readonly KnowledgeDailyReport[];
  readonly cards: readonly KnowledgeSharedCardReport[];
  readonly shareOffProjectIds: readonly string[];
  readonly skillStats: readonly SkillStatsReport[];
};

/** Computer status shown to project owners (never blocks dispatch). */
export type KnowledgeComputerStatus =
  "ready" | "degraded" | "off" | "unavailable" | "unknown";
