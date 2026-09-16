import { removeAgentRunTerminalOutput } from "@/features/agent/utils/agentRunTerminalOutputStore";
import { removePersistedAgentLiveTerminalSessionByRunId } from "@/features/agent/utils/removePersistedAgentLiveTerminalSessionByRunId";
import { clearPreferredMacDeviceIdIfMatches } from "@/features/agent/utils/preferredMacDeviceStorage";
import {
  listAgentRunsLocalCache,
  removeAgentRunLocalCache,
} from "@/features/reports/agentRunLocalCache";
import { addAgentRunLocalCacheTombstone } from "@/features/reports/agentRunLocalCacheTombstones";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";

const isActiveAgentRunStatus = (status: string): boolean =>
  status === AgentRunStatus.RUNNING ||
  status === AgentRunStatus.PENDING_APPROVAL;

/** Clears docked New task / Home running rows for a Mac that was removed. */
export const purgeLocalAgentTasksForRevokedDevice = (
  deviceId: string,
): readonly string[] => {
  const trimmedDeviceId = deviceId.trim();
  if (trimmedDeviceId.length === 0) {
    return [];
  }

  clearPreferredMacDeviceIdIfMatches(trimmedDeviceId);

  const purgedRunIds: string[] = [];

  listAgentRunsLocalCache().forEach((run) => {
    if (
      run.deviceId !== trimmedDeviceId ||
      !isActiveAgentRunStatus(run.status)
    ) {
      return;
    }

    purgedRunIds.push(run.id);
    removeAgentRunLocalCache(run.id);
    addAgentRunLocalCacheTombstone(run.id);
    removePersistedAgentLiveTerminalSessionByRunId(run.id);
    removeAgentRunTerminalOutput(run.id);
  });

  return purgedRunIds;
};
