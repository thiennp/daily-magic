import { buildKnowledgeWeeklySeries } from "@/lib/knowledge/buildKnowledgeWeeklySeries";
import type {
  KnowledgeComputerRow,
  KnowledgeDailyRow,
  ProjectKnowledgeImpactView,
} from "@/lib/knowledge/knowledgeImpactView.type";
import {
  knowledgeRate,
  sumKnowledgeRows as sum,
} from "@/lib/knowledge/sumKnowledgeRows";

export { startOfUtcWeekFromDay } from "@/lib/knowledge/buildKnowledgeWeeklySeries";
export type * from "@/lib/knowledge/knowledgeImpactView.type";

export const buildProjectKnowledgeImpactView = (input: {
  readonly rows: readonly KnowledgeDailyRow[];
  readonly computers: readonly KnowledgeComputerRow[];
  readonly windowDays: number;
  readonly includeComputers: boolean;
}): ProjectKnowledgeImpactView => {
  const { rows } = input;
  const runsWith = sum(rows, (row) => row.runsWith);
  const injectedTokens = sum(rows, (row) => row.injectedTokens);
  const holdoutRuns = sum(rows, (row) => row.holdoutRuns);

  return {
    windowDays: input.windowDays,
    totals: {
      runs: sum(rows, (row) => row.runs),
      holdoutRuns,
      injectedTokens,
      injectedTokensPerRun:
        runsWith === 0 ? 0 : Math.round(injectedTokens / runsWith),
      mistakesAvoided: sum(rows, (row) => row.mistakesAvoided),
      estTokensSaved: sum(rows, (row) => row.estTokensSaved),
      correctionTurns: sum(rows, (row) => row.correctionTurns),
      repeatRateWithKnowledge: knowledgeRate(
        sum(rows, (row) => row.repeatsWith),
        runsWith,
      ),
      repeatRateHoldout: knowledgeRate(
        sum(rows, (row) => row.repeatsHoldout),
        holdoutRuns,
      ),
    },
    weekly: buildKnowledgeWeeklySeries(rows),
    computerSummary: {
      total: input.computers.length,
      ready: input.computers.filter((c) => c.status === "ready").length,
      degraded: input.computers.filter((c) => c.status === "degraded").length,
      other: input.computers.filter(
        (c) => c.status !== "ready" && c.status !== "degraded",
      ).length,
    },
    computers: input.includeComputers ? input.computers : null,
    sharedCards: null,
  };
};
