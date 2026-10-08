import { broadcastAgentRunRecord } from "@/lib/dispatch/broadcastAgentRunRecord";
import { dispatchAgentRunInputRegistry } from "@/lib/dispatch/dispatchAgentRunInputRegistry";
import { failLongSilentAgentRuns } from "@/lib/dispatch/failLongSilentAgentRuns";
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
    ...(await failLongSilentAgentRuns()),
  ];

  const reconciled = rows.map((row) => mapAgentRunRow(row));
  for (const run of reconciled) {
    broadcastAgentRunRecord(runtime, run);
  }

  return reconciled;
};

const reconcileGlobal = globalThis as typeof globalThis & {
  __dailyMagicLastStaleRunReconcileMs?: number;
};

/** At most once a minute per process; run and device heartbeats both call it. */
export const maybeReconcileStaleAgentRuns = async (
  runtime: AgentWitchHubRuntime,
): Promise<void> => {
  const nowMs = Date.now();
  const lastMs = reconcileGlobal.__dailyMagicLastStaleRunReconcileMs ?? 0;
  if (nowMs - lastMs < 60_000) {
    return;
  }
  reconcileGlobal.__dailyMagicLastStaleRunReconcileMs = nowMs;
  await reconcileStaleAgentRuns(runtime);
};
