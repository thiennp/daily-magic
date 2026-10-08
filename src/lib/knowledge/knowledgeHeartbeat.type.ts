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

export type KnowledgeHeartbeatReport = {
  readonly capabilities: KnowledgeCapabilitiesReport;
  readonly daily: readonly KnowledgeDailyReport[];
  readonly cards: readonly KnowledgeSharedCardReport[];
  readonly shareOffProjectIds: readonly string[];
};

/** Computer status shown to project owners (never blocks dispatch). */
export type KnowledgeComputerStatus =
  "ready" | "degraded" | "off" | "unavailable" | "unknown";
