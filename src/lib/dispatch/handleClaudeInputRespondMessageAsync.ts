import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { dispatchAgentRunInputRegistry } from "@/lib/dispatch/dispatchAgentRunInputRegistry";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";

export const handleClaudeInputRespondMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "dashboard" || !isNonEmptyString(sender.userId)) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage:
          "Only authenticated dashboard clients can answer agent input requests.",
      },
      requestId: message.requestId,
    };
  }

  const agentRunId =
    typeof message.payload?.agentRunId === "string"
      ? message.payload.agentRunId
      : "";
  const response =
    typeof message.payload?.response === "string"
      ? message.payload.response.trim()
      : "";

  if (agentRunId.length === 0 || response.length === 0) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage:
          "command.claude.input_respond requires payload.agentRunId and payload.response.",
      },
      requestId: message.requestId,
    };
  }

  const pending = dispatchAgentRunInputRegistry.get(agentRunId);

  if (pending === undefined) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "No pending input request was found for this run.",
      },
      requestId: message.requestId,
    };
  }

  const isParticipant =
    pending.requesterUserId === sender.userId ||
    pending.executorUserId === sender.userId;

  if (!isParticipant) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "You are not allowed to answer for this run.",
      },
      requestId: message.requestId,
    };
  }

  const agentClient = runtime.findAgentClientForUser(pending.executorUserId);

  if (agentClient === undefined) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "No Mac is connected for this run.",
      },
      requestId: message.requestId,
    };
  }

  const run = await getAgentRunById(agentRunId);
  const originalPrompt = run?.prompt ?? "";

  dispatchAgentRunInputRegistry.remove(agentRunId);

  agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_INPUT_RESPOND,
    payload: {
      agentRunId,
      response,
      originalPrompt,
      partialOutput: pending.partialOutput,
      question: pending.question,
    },
    requestId: message.requestId,
  });

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: { agentRunId, resumed: true },
    requestId: message.requestId,
  };
};
