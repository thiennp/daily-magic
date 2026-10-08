import { readKnowledgeCount } from "@/lib/knowledge/readKnowledgeCount";
import type { KnowledgeSharedCardReport } from "@/lib/knowledge/knowledgeHeartbeat.type";

const MAX_CARDS = 100;
const MAX_TAKEAWAY_CHARS = 400;
const MAX_FILES = 4;
const MAX_FILE_CHARS = 200;
const VALID_KINDS = ["mistake", "fix", "decision", "lesson"];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseCard = (value: unknown): KnowledgeSharedCardReport | null => {
  if (
    !isRecord(value) ||
    typeof value.projectId !== "string" ||
    typeof value.cardId !== "string" ||
    typeof value.takeaway !== "string" ||
    typeof value.outcome !== "string" ||
    typeof value.updatedAt !== "string" ||
    typeof value.kind !== "string" ||
    !VALID_KINDS.includes(value.kind) ||
    Number.isNaN(Date.parse(value.updatedAt))
  ) {
    return null;
  }
  const hits = readKnowledgeCount(value.hits);
  const occurrences = readKnowledgeCount(value.occurrences);
  if (hits === null || occurrences === null || value.cardId.length > 80) {
    return null;
  }
  return {
    projectId: value.projectId.slice(0, 80),
    cardId: value.cardId,
    kind: value.kind,
    takeaway: value.takeaway.slice(0, MAX_TAKEAWAY_CHARS),
    files: Array.isArray(value.files)
      ? value.files
          .filter((file): file is string => typeof file === "string")
          .slice(0, MAX_FILES)
          .map((file) => file.slice(0, MAX_FILE_CHARS))
      : [],
    outcome: value.outcome.slice(0, 20),
    commitSha:
      typeof value.commitSha === "string" ? value.commitSha.slice(0, 40) : null,
    hits,
    occurrences,
    updatedAt: value.updatedAt,
  };
};

export const parseKnowledgeSharedCards = (
  value: unknown,
): KnowledgeSharedCardReport[] =>
  Array.isArray(value)
    ? value
        .slice(0, MAX_CARDS)
        .map(parseCard)
        .filter((card): card is KnowledgeSharedCardReport => card !== null)
    : [];

export const parseShareOffProjectIds = (value: unknown): string[] =>
  Array.isArray(value)
    ? value
        .filter((id): id is string => typeof id === "string" && id.length <= 80)
        .slice(0, MAX_CARDS)
    : [];
