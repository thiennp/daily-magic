import {
  loadOlderProjectHistoryMessages,
} from "@agent-witch/live-project-history";
import {
  isHostedDeviceHubProxyEnabled,
  isHostedDeviceHubProxySameHost,
} from "@/lib/projects/acl/messaging/messenger/hostedDeviceHubProxyFlag";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import { requestProjectHistoryPageFromDevice } from "@/lib/projects/acl/messaging/messenger/requestProjectHistoryPageFromDevice";

/**
 * History tip boundary: local AWL read when the project computer is live.
 *
 * Locked contract with AW History:
 *   input  { projectId, threadKey, beforeCursor?, limit, ownerUserId? }
 *   output { entries (newest-first), nextBeforeCursor, hasMore }
 *
 * Hosted (AWC_HOSTED_DEVICE_HUB_PROXY on, not same-host): asks the linked
 * device over the hub and returns its page. Soft-degrades to empty (Neon
 * path in the orchestrator) on timeout / error / cross-instance / old bundle.
 * Flag off or same-host: today's in-process History read.
 *
 * Bodies from the device may pass in transit (device→hosted→browser) but are
 * NEVER written to Neon, relay tables, or traffic-log summaries.
 */
export type LoadProjectMessengerOlderFromLocalInput = {
  readonly projectId: string;
  readonly threadKey: string;
  readonly beforeCursor?: string;
  readonly limit: number;
  /** Required for hub proxy path (owner's linked computer). */
  readonly ownerUserId?: string;
};

export type LoadProjectMessengerOlderFromLocalResult = {
  readonly entries: readonly ProjectMessengerTimelineEntry[];
  readonly nextBeforeCursor: string | null;
  readonly hasMore: boolean;
};

const readInProcess = (
  input: LoadProjectMessengerOlderFromLocalInput,
): LoadProjectMessengerOlderFromLocalResult => {
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

const emptyPage = (): LoadProjectMessengerOlderFromLocalResult => ({
  entries: [],
  nextBeforeCursor: null,
  hasMore: false,
});

export const loadProjectMessengerOlderFromLocal = async (
  input: LoadProjectMessengerOlderFromLocalInput,
): Promise<LoadProjectMessengerOlderFromLocalResult> => {
  // Explicit same-host / flag-off path — never accidental hub proxy.
  if (
    !isHostedDeviceHubProxyEnabled() ||
    isHostedDeviceHubProxySameHost() ||
    input.ownerUserId === undefined ||
    input.ownerUserId.length === 0
  ) {
    return readInProcess(input);
  }

  const proxied = await requestProjectHistoryPageFromDevice({
    projectId: input.projectId,
    ownerUserId: input.ownerUserId,
    threadKey: input.threadKey,
    beforeCursor: input.beforeCursor,
    limit: input.limit,
  });

  if (proxied.kind === "page") {
    return proxied.page;
  }

  // Soft-degrade (timeout / error / cross-instance / skipped): empty local
  // slice → orchestrator merges Neon meta / project_computer_offline.
  return emptyPage();
};
