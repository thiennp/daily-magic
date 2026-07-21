import { unauthorizedAgentOnlyError } from "@/lib/agentWitch/agentWitchHubClientOperations";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { notifyDashboardUser } from "@/lib/dispatch/dispatchClaudeRunToAgent";
import { reconcileStaleAgentRuns } from "@/lib/dispatch/reconcileStaleAgentRuns";
import { touchAgentRunHeartbeatAt } from "@/lib/dispatch/touchAgentRunHeartbeatAt";

const reconcileGlobal = globalThis as typeof globalThis & {
  __dailyMagicLastStaleRunReconcileMs?: number;
};

const maybeReconcileStaleRuns = async (
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

export const handleAgentRunHeartbeatMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "agent") {
    return unauthorizedAgentOnlyError(message.requestId);
  }

  const agentRunId =
    typeof message.payload?.agentRunId === "string"
      ? message.payload.agentRunId
      : "";

  if (agentRunId.length === 0) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "run.heartbeat requires payload.agentRunId.",
      },
      requestId: message.requestId,
    };
  }

  const existingRun = await getAgentRunById(agentRunId);

  if (
    existingRun === null ||
    existingRun.executorUserId !== sender.userId ||
    existingRun.status !== AgentRunStatus.RUNNING
  ) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "Agent run is not eligible for run heartbeats.",
      },
      requestId: message.requestId,
    };
  }

  const awaitingInput = message.payload?.awaitingInput === true;

  await touchAgentRunHeartbeatAt(runtime, agentRunId);

  const heartbeatMessage: AgentWitchMessage = {
    type: AGENT_WITCH_MESSAGE_TYPES.RUN_HEARTBEAT,
    payload: {
      agentRunId,
      at: new Date().toISOString(),
      ...(awaitingInput ? { awaitingInput: true } : {}),
    },
    requestId: message.requestId,
  };

  notifyDashboardUser(runtime, existingRun.requesterUserId, heartbeatMessage);
  if (existingRun.executorUserId !== existingRun.requesterUserId) {
    notifyDashboardUser(runtime, existingRun.executorUserId, heartbeatMessage);
  }

  void maybeReconcileStaleRuns(runtime);

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: {
      agentRunId,
      heartbeat: true,
      ...(awaitingInput ? { awaitingInput: true } : {}),
    },
    requestId: message.requestId,
  };
};
