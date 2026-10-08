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

export type KnowledgeHeartbeatReport = {
  readonly capabilities: KnowledgeCapabilitiesReport;
  readonly daily: readonly KnowledgeDailyReport[];
};

/** Computer status shown to project owners (never blocks dispatch). */
export type KnowledgeComputerStatus =
  "ready" | "degraded" | "off" | "unavailable" | "unknown";
