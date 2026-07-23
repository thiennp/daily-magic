import {
  readTerminalStore,
  writeTerminalStore,
} from "@/features/agent/utils/agentLiveTerminalLocalStoreIO";

/** Drop archived/current live-terminal session for a deleted run id. */
export const removePersistedAgentLiveTerminalSessionByRunId = (
  runId: string,
): void => {
  const trimmedRunId = runId.trim();
  if (trimmedRunId.length === 0) {
    return;
  }

  const store = readTerminalStore();
  const hasArchivedSession = trimmedRunId in store.byRunId;
  const isCurrentSession = store.current?.activeRunId === trimmedRunId;

  if (!hasArchivedSession && !isCurrentSession) {
    return;
  }

  const remainingByRunId = { ...store.byRunId };
  delete remainingByRunId[trimmedRunId];

  writeTerminalStore({
    current: isCurrentSession ? null : store.current,
    byRunId: remainingByRunId,
  });
};
