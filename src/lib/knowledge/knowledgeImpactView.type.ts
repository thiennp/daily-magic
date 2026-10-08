import type { KnowledgeComputerStatus } from "@/lib/knowledge/knowledgeHeartbeat.type";

export type KnowledgeDailyRow = {
  readonly day: string;
  readonly deviceId: string;
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

export type KnowledgeComputerRow = {
  readonly deviceId: string;
  readonly label: string;
  readonly ownerName: string | null;
  readonly status: KnowledgeComputerStatus;
  readonly cardCount: number;
  readonly installBundleVersion: string | null;
  readonly lastReportAt: string | null;
};

export type KnowledgeSharedCardRow = {
  readonly cardId: string;
  readonly kind: string;
  readonly takeaway: string;
  readonly files: readonly string[];
  readonly outcome: string;
  readonly commitSha: string | null;
  readonly occurrences: number;
  readonly computerLabel: string;
  readonly updatedAt: string;
};

export type KnowledgeImpactTotals = {
  readonly runs: number;
  readonly holdoutRuns: number;
  readonly injectedTokens: number;
  readonly injectedTokensPerRun: number;
  readonly mistakesAvoided: number;
  readonly estTokensSaved: number;
  readonly correctionTurns: number;
  /** null when no runs in that group yet. */
  readonly repeatRateWithKnowledge: number | null;
  readonly repeatRateHoldout: number | null;
};

export type KnowledgeWeeklyView = {
  readonly weekStart: string;
  readonly runsWith: number;
  readonly repeatsWith: number;
  readonly runsHoldout: number;
  readonly repeatsHoldout: number;
  readonly injectedTokensPerRun: number;
};

export type KnowledgeComputerSummary = {
  readonly total: number;
  readonly ready: number;
  readonly degraded: number;
  readonly other: number;
};

export type ProjectKnowledgeImpactView = {
  readonly windowDays: number;
  readonly totals: KnowledgeImpactTotals;
  readonly weekly: readonly KnowledgeWeeklyView[];
  readonly computerSummary: KnowledgeComputerSummary;
  /** Owner only. */
  readonly computers: readonly KnowledgeComputerRow[] | null;
  /** Owner only; note text from computers with sharing on. */
  readonly sharedCards: readonly KnowledgeSharedCardRow[] | null;
};
