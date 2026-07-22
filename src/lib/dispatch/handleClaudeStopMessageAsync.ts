import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import { MAC_OFFLINE_FOR_ACCOUNT_ERROR } from "@/lib/agentWitch/macOfflineForAccountErrorMessage.constant";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";

export const handleClaudeStopMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "dashboard" || !isNonEmptyString(sender.userId)) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage:
          "Only authenticated dashboard clients can stop agent runs.",
      },
      requestId: message.requestId,
    };
  }

  const agentRunId =
    typeof message.payload?.agentRunId === "string"
      ? message.payload.agentRunId
      : "";

  if (agentRunId.length === 0) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "command.claude.stop requires payload.agentRunId.",
      },
      requestId: message.requestId,
    };
  }

  const run = await getAgentRunById(agentRunId);

  if (run === null) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: { errorMessage: "Run not found." },
      requestId: message.requestId,
    };
  }

  const isParticipant =
    run.requesterUserId === sender.userId ||
    run.executorUserId === sender.userId;

  if (!isParticipant) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "You are not allowed to stop this run.",
      },
      requestId: message.requestId,
    };
  }

  if (
    run.status !== AgentRunStatus.RUNNING &&
    run.status !== AgentRunStatus.PENDING_APPROVAL
  ) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "This run is not active anymore.",
      },
      requestId: message.requestId,
    };
  }

  const targetDeviceId =
    run.deviceId !== null && run.deviceId !== undefined
      ? run.deviceId
      : undefined;

  const agentClient = runtime.findAgentClientForUser(
    run.executorUserId,
    targetDeviceId,
  );

  if (agentClient === undefined) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage:
          targetDeviceId !== undefined
            ? "The Mac for this run is not online right now."
            : MAC_OFFLINE_FOR_ACCOUNT_ERROR,
      },
      requestId: message.requestId,
    };
  }

  agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_STOP,
    payload: { agentRunId },
    requestId: message.requestId,
  });

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: { agentRunId, stopped: true },
    requestId: message.requestId,
  };
};
