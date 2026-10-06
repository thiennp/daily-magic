import { readProjectHistoryMessage } from "./readProjectHistoryMessage";
import type { ProjectHistoryMessageRecord } from "./writeProjectHistoryMessage";

/**
 * Read one durable local chat message body (file). Store API surface for History/S13.
 */
export const getLocalChatMessage = (input: {
  readonly projectId: string;
  readonly messageId: string;
}): ProjectHistoryMessageRecord | null =>
  readProjectHistoryMessage(input);
