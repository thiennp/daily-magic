import {
  PROJECT_MESSENGER_WHOLE_THREAD_KEY,
  type ProjectMessengerTimelineEntry,
} from "../../../../adapters/projectHistorySharedMappers";

import type { ProjectHistoryAiSessionRecord } from "./projectHistoryAiSessionRecord.type";

export const PROJECT_HISTORY_AI_SESSION_KIND = "ai.session";

/**
 * Timeline / cursor id for a session row: raw agentRunId (no prefix).
 * Falls back to taskId only when agentRunId was never set (should not happen
 * for C1 writes that require a run id).
 */
export const timelineMessageIdForAiSession = (
  record: ProjectHistoryAiSessionRecord,
): string => {
  if (record.agentRunId !== null && record.agentRunId.trim().length > 0) {
    return record.agentRunId.trim();
  }
  return record.taskId;
};

/**
 * Map a C1 task record to TimelineEntry.
 * Contract: entryKind `session`, kind `ai.session`, messageId = raw agentRunId,
 * nested `session: { status, writerAgent, agentRunId }`.
 * Cursor: base64url({ t: createdAt, id: agentRunId }).
 */
export const mapAiSessionRecordToTimelineEntry = (
  record: ProjectHistoryAiSessionRecord,
): ProjectMessengerTimelineEntry => {
  const agentRunId = timelineMessageIdForAiSession(record);
  const text =
    record.resultSummary.trim().length > 0
      ? record.resultSummary
      : record.promptSummary;
  return {
    messageId: agentRunId,
    createdAt: record.createdAt,
    author: {
      kind: "bot",
      membershipId: null,
      displayName: record.writerAgent,
    },
    kind: PROJECT_HISTORY_AI_SESSION_KIND,
    entryKind: "session",
    session: {
      status: record.status,
      writerAgent: record.writerAgent,
      agentRunId,
    },
    text,
    needsReply: false,
    inReplyTo: null,
    states: [],
  };
};

/**
 * Sessions only appear on the Whole project thread (`threadKey === "whole"`).
 * Other threads get messages only (Dispatch Neon same rule).
 */
export const aiSessionMatchesThreadKey = (
  _record: ProjectHistoryAiSessionRecord,
  threadKey: string,
): boolean => threadKey === PROJECT_MESSENGER_WHOLE_THREAD_KEY;
