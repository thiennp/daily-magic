import type { KnowledgeDailyRow } from "@/lib/knowledge/knowledgeImpactView.type";

export const sumKnowledgeRows = (
  rows: readonly KnowledgeDailyRow[],
  pick: (row: KnowledgeDailyRow) => number,
): number => rows.reduce((total, row) => total + pick(row), 0);

export const knowledgeRate = (part: number, total: number): number | null =>
  total === 0 ? null : part / total;
