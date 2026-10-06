import { deriveProjectHistorySenderLabel } from "./deriveProjectHistorySenderLabel";
import { deriveProjectHistoryThreadKey } from "./deriveProjectHistoryThreadKey";
import { PROJECT_HISTORY_MESSAGE_RECORD_VERSION } from "./projectHistory.constants";
import { readOptionalHistoryStringKeys } from "./readOptionalHistoryString";
import type { ProjectHistoryMessageRecord } from "./writeProjectHistoryMessage";

export type ProjectHistoryMessageRecordV2 = ProjectHistoryMessageRecord & {
  readonly version: typeof PROJECT_HISTORY_MESSAGE_RECORD_VERSION;
  readonly threadKey: string | null;
  readonly createdAt: string;
  readonly senderLabel: string | null;
};

/**
 * Pure v2 record builder. `createdAt` prefers the message's original time;
 * falls back to `savedAt` only when absent (matches Mac peek).
 */
export const buildProjectHistoryMessageRecordV2 = (input: {
  readonly messageId: string;
  readonly projectId: string;
  readonly message: Readonly<Record<string, unknown>>;
  readonly savedAt: string;
  readonly botIds?: ReadonlySet<string>;
  readonly wholeMessageIds?: ReadonlySet<string>;
}): ProjectHistoryMessageRecordV2 => {
  const createdAt =
    readOptionalHistoryStringKeys(input.message, ["createdAt", "created_at"]) ??
    input.savedAt;
  return {
    messageId: input.messageId,
    projectId: input.projectId,
    message: input.message,
    savedAt: input.savedAt,
    version: PROJECT_HISTORY_MESSAGE_RECORD_VERSION,
    threadKey: deriveProjectHistoryThreadKey({
      message: input.message,
      botIds: input.botIds,
      wholeMessageIds: input.wholeMessageIds,
    }),
    createdAt,
    senderLabel: deriveProjectHistorySenderLabel(input.message),
  };
};
