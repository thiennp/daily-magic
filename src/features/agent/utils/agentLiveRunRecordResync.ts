import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/** S7: when the live floater re-reads its run record from the server. */
export type AgentLiveRunRecordResyncTrigger = "reconnected" | "stalled";

const TERMINAL_RUN_STATUSES: ReadonlySet<string> = new Set([
  AgentRunStatus.COMPLETED,
  AgentRunStatus.FAILED,
  AgentRunStatus.EXPIRED,
  AgentRunStatus.DENIED,
]);

export const isTerminalAgentRunRecordStatus = (status: string): boolean =>
  TERMINAL_RUN_STATUSES.has(status);

/**
 * Re-read the active run only while the floater still thinks it is working:
 * after the dashboard socket comes back (it may have missed AGENT_RUN_RECORD)
 * or once progress has stalled long enough to look stuck.
 */
export const shouldResyncAgentLiveRunRecord = (input: {
  readonly trigger: AgentLiveRunRecordResyncTrigger;
  readonly previousConnectionStatus: WsTestConnectionStatus | null;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly activeRunId: string | null;
  readonly isWorking: boolean;
}): boolean => {
  if (
    input.activeRunId === null ||
    input.activeRunId.length === 0 ||
    !input.isWorking
  ) {
    return false;
  }
  if (input.trigger === "stalled") {
    return true;
  }
  return (
    input.connectionStatus === "connected" &&
    input.previousConnectionStatus !== null &&
    input.previousConnectionStatus !== "connected"
  );
};

/** Same envelope the hub broadcasts, so the floater reuses its socket reducer. */
export const buildAgentRunRecordSocketMessage = (run: AgentRunRecord): string =>
  JSON.stringify({
    type: AGENT_WITCH_MESSAGE_TYPES.AGENT_RUN_RECORD,
    payload: { run },
  });
