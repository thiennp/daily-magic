import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

/**
 * History tip boundary: local AWL read when the project computer is live.
 *
 * Locked contract with AW History:
 *   input  { projectId, threadKey, beforeCursor?, limit }
 *   output { entries (newest-first), nextBeforeCursor, hasMore }
 *
 * Dispatch stub until History lands the real local reader: always empty,
 * hasMore false. Orchestrator still sets page.localLive from the live check
 * and falls through to Neon / offline error.
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
  void input;
  return { entries: [], nextBeforeCursor: null, hasMore: false };
};
