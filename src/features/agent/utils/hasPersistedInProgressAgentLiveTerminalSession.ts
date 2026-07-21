import { readTerminalStore } from "@/features/agent/utils/agentLiveTerminalLocalStoreIO";
import { isInProgressAgentLiveTerminalStatus } from "@/features/agent/utils/isInProgressAgentLiveTerminalStatus";

export const hasPersistedInProgressAgentLiveTerminalSession = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  const session = readTerminalStore().current;
  return (
    session !== null && isInProgressAgentLiveTerminalStatus(session.status)
  );
};
