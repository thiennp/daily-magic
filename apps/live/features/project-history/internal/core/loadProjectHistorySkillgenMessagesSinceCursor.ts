import type { AdvanceProjectHistorySkillgenMessage } from "./advanceProjectHistorySkillgenEpisode";
import { extractProjectHistoryMessageText } from "./extractProjectHistoryMessageText";
import { listProjectHistoryMessages } from "./listProjectHistoryMessages";

export type LoadProjectHistorySkillgenMessagesSinceCursorInput = {
  readonly projectId: string;
  readonly cursorMessageId: string | null;
  readonly cursorSavedAtMs: number | null;
};

const isAfterCursor = (
  savedAtMs: number,
  messageId: string,
  cursorSavedAtMs: number | null,
  cursorMessageId: string | null,
): boolean => {
  if (cursorSavedAtMs === null) {
    return true;
  }
  if (savedAtMs > cursorSavedAtMs) {
    return true;
  }
  if (savedAtMs < cursorSavedAtMs) {
    return false;
  }
  if (cursorMessageId === null) {
    return true;
  }
  return messageId.localeCompare(cursorMessageId) > 0;
};

/**
 * Loads durable history messages after the skillgen cursor for mining.
 */
export const loadProjectHistorySkillgenMessagesSinceCursor = (
  input: LoadProjectHistorySkillgenMessagesSinceCursorInput,
): readonly AdvanceProjectHistorySkillgenMessage[] => {
  const records = listProjectHistoryMessages(input.projectId);
  const out: AdvanceProjectHistorySkillgenMessage[] = [];
  for (const record of records) {
    const savedAtMs = Date.parse(record.savedAt);
    if (Number.isNaN(savedAtMs)) {
      continue;
    }
    if (
      !isAfterCursor(
        savedAtMs,
        record.messageId,
        input.cursorSavedAtMs,
        input.cursorMessageId,
      )
    ) {
      continue;
    }
    out.push({
      messageId: record.messageId,
      createdAtMs: savedAtMs,
      text: extractProjectHistoryMessageText(record),
    });
  }
  return out;
};
