import { readKnowledgeCount } from "@/lib/knowledge/readKnowledgeCount";
import type { KnowledgeDailyReport } from "@/lib/knowledge/knowledgeHeartbeat.type";

const DAY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const COUNT_FIELDS = [
  "runs",
  "holdoutRuns",
  "runsWith",
  "repeatsWith",
  "repeatsHoldout",
  "cardsInjected",
  "injectedTokens",
  "mistakesAvoided",
  "estTokensSaved",
  "correctionTurns",
] as const;

export const parseKnowledgeDailyRow = (
  value: unknown,
): KnowledgeDailyReport | null => {
  if (
    !isRecord(value) ||
    typeof value.projectId !== "string" ||
    value.projectId.length === 0 ||
    value.projectId.length > 80 ||
    typeof value.day !== "string" ||
    !DAY_PATTERN.test(value.day)
  ) {
    return null;
  }
  const counts = COUNT_FIELDS.map((field) => readKnowledgeCount(value[field]));
  if (counts.some((count) => count === null)) {
    return null;
  }
  const [
    runs,
    holdoutRuns,
    runsWith,
    repeatsWith,
    repeatsHoldout,
    cardsInjected,
    injectedTokens,
    mistakesAvoided,
    estTokensSaved,
    correctionTurns,
  ] = counts as number[];
  return {
    projectId: value.projectId,
    day: value.day,
    runs: runs ?? 0,
    holdoutRuns: holdoutRuns ?? 0,
    runsWith: runsWith ?? 0,
    repeatsWith: repeatsWith ?? 0,
    repeatsHoldout: repeatsHoldout ?? 0,
    cardsInjected: cardsInjected ?? 0,
    injectedTokens: injectedTokens ?? 0,
    mistakesAvoided: mistakesAvoided ?? 0,
    estTokensSaved: estTokensSaved ?? 0,
    correctionTurns: correctionTurns ?? 0,
  };
};
