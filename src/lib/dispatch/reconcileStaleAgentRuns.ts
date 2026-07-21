import { broadcastAgentRunRecord } from "@/lib/dispatch/broadcastAgentRunRecord";
import { dispatchAgentRunInputRegistry } from "@/lib/dispatch/dispatchAgentRunInputRegistry";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import {
  updateNeverHeartbeatOrphanAgentRuns,
  updateStaleHeartbeatAgentRuns,
} from "@/lib/dispatch/updateStaleAgentRunQueries";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";

export const reconcileStaleAgentRuns = async (
  runtime: AgentWitchHubRuntime,
): Promise<readonly AgentRunRecord[]> => {
  if (isAgentWitchDevDashboardEnabled()) {
    return [];
  }

  const awaitingInputRunIds = dispatchAgentRunInputRegistry.listAgentRunIds();
  const rows = [
    ...(await updateStaleHeartbeatAgentRuns(awaitingInputRunIds)),
    ...(await updateNeverHeartbeatOrphanAgentRuns(awaitingInputRunIds)),
  ];

  const reconciled = rows.map((row) => mapAgentRunRow(row));
  for (const run of reconciled) {
    broadcastAgentRunRecord(runtime, run);
  }

  return reconciled;
};
