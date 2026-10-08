const MAX_COUNT = 100_000_000;

export const readKnowledgeCount = (value: unknown): number | null =>
  typeof value === "number" &&
  Number.isInteger(value) &&
  value >= 0 &&
  value <= MAX_COUNT
    ? value
    : null;
