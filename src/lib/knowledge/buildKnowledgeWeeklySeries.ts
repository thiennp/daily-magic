import type {
  KnowledgeDailyRow,
  KnowledgeWeeklyView,
} from "@/lib/knowledge/knowledgeImpactView.type";
import { sumKnowledgeRows } from "@/lib/knowledge/sumKnowledgeRows";

export const startOfUtcWeekFromDay = (day: string): string => {
  const date = new Date(`${day}T00:00:00Z`);
  const offset = (date.getUTCDay() + 6) % 7;
  date.setUTCDate(date.getUTCDate() - offset);
  return date.toISOString().slice(0, 10);
};

export const buildKnowledgeWeeklySeries = (
  rows: readonly KnowledgeDailyRow[],
): KnowledgeWeeklyView[] => {
  const weeks = new Map<string, KnowledgeDailyRow[]>();
  for (const row of rows) {
    const key = startOfUtcWeekFromDay(row.day);
    weeks.set(key, [...(weeks.get(key) ?? []), row]);
  }
  return Array.from(weeks.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([weekStart, weekRows]) => {
      const runsWith = sumKnowledgeRows(weekRows, (row) => row.runsWith);
      return {
        weekStart,
        runsWith,
        repeatsWith: sumKnowledgeRows(weekRows, (row) => row.repeatsWith),
        runsHoldout: sumKnowledgeRows(weekRows, (row) => row.holdoutRuns),
        repeatsHoldout: sumKnowledgeRows(weekRows, (row) => row.repeatsHoldout),
        injectedTokensPerRun:
          runsWith === 0
            ? 0
            : Math.round(
                sumKnowledgeRows(weekRows, (row) => row.injectedTokens) /
                  runsWith,
              ),
      };
    });
};
