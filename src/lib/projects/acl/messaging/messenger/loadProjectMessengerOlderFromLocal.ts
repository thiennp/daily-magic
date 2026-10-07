import {
  loadOlderProjectHistoryMessages,
} from "@agent-witch/live-project-history";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

/**
 * History tip boundary: local AWL read when the project computer is live.
 *
 * Locked contract with AW History:
 *   input  { projectId, threadKey, beforeCursor?, limit }
 *   output { entries (newest-first), nextBeforeCursor, hasMore }
 *
 * Delegates to History public-api `loadOlderProjectHistoryMessages`
 * (alias of `readProjectHistoryMessagesPage`).
 */
export type LoadProjectMessengerOlderFromLocalInput = {
  readonly projectId: string;
  readonly threadKey: string;
  readonly beforeCursor?: string;
  readonly limit: number;
};

export type LoadProjectMessengerOlderFromLocalResult = {
  readonly entries: readonly ProjectMessengerTimelineEntry[];
  readonly nextBeforeCursor: string | null;
  readonly hasMore: boolean;
};

export const loadProjectMessengerOlderFromLocal = async (
  input: LoadProjectMessengerOlderFromLocalInput,
): Promise<LoadProjectMessengerOlderFromLocalResult> => {
  const page = loadOlderProjectHistoryMessages({
    projectId: input.projectId,
    threadKey: input.threadKey,
    beforeCursor: input.beforeCursor,
    limit: input.limit,
  });
  return {
    entries: page.entries,
    nextBeforeCursor: page.nextBeforeCursor,
    hasMore: page.hasMore,
  };
};
