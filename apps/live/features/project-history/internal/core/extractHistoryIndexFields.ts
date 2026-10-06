import type { ProjectHistoryIndexableRecord } from "./projectHistoryIndexRecord.type";

const readOptionalString = (value: unknown): string | null => {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const readFromMessage = (
  message: Readonly<Record<string, unknown>>,
  keys: readonly string[],
): string | null => {
  for (const key of keys) {
    const found = readOptionalString(message[key]);
    if (found !== null) {
      return found;
    }
  }
  return null;
};

/**
 * Resolve threadKey + createdAt for index rows.
 * Prefer top-level v2 fields; else peek opaque message; else createdAt=savedAt,
 * threadKey=null (S12 thread_key tip may not exist yet).
 */
export const extractHistoryIndexFields = (
  record: ProjectHistoryIndexableRecord,
): { readonly threadKey: string | null; readonly createdAt: string } => {
  const top = record as {
    readonly threadKey?: unknown;
    readonly createdAt?: unknown;
  };
  const threadKey =
    readOptionalString(top.threadKey) ??
    readFromMessage(record.message, ["threadKey", "thread_key"]);
  const createdAt =
    readOptionalString(top.createdAt) ??
    readFromMessage(record.message, ["createdAt", "created_at"]) ??
    record.savedAt;
  return { threadKey, createdAt };
};
