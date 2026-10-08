import { readTerminalStore } from "@/features/agent/utils/agentLiveTerminalLocalStoreIO";
import { resolveRestoredLiveTerminalStatus } from "@/features/agent/utils/resolveRestoredLiveTerminalStatus";
import { isInProgressAgentLiveTerminalStatus } from "@/features/agent/utils/isInProgressAgentLiveTerminalStatus";

export const hasPersistedInProgressAgentLiveTerminalSession = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  const session = readTerminalStore().current;
  if (session === null) {
    return false;
  }
  // ed42d8ce: a stored live session silent for hours must not reopen the floater.
  const status = resolveRestoredLiveTerminalStatus({
    status: session.status,
    lastAliveMs: [Date.parse(session.updatedAt)],
    nowMs: Date.now(),
  });
  return isInProgressAgentLiveTerminalStatus(status);
};
