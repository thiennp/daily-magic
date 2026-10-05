import type { ProjectHistoryMessageRecord } from "./writeProjectHistoryMessage";

/**
 * Best-effort plain text from a thin history message for skillgen transcripts.
 */
export const extractProjectHistoryMessageText = (
  record: ProjectHistoryMessageRecord,
): string => {
  const message = record.message;
  for (const key of ["summary", "text", "body", "content"] as const) {
    const value = message[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }
  return "";
};
