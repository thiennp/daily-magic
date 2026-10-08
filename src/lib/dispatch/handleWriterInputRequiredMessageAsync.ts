import { unauthorizedAgentOnlyError } from "@/lib/agentWitch/agentWitchHubClientOperations";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { dispatchAgentRunInputRegistry } from "@/lib/dispatch/dispatchAgentRunInputRegistry";
import { answeredAgentRunInputMemory } from "@/lib/dispatch/answeredAgentRunInputMemory";
import { buildAgentRunInputContext } from "@/lib/dispatch/buildAgentRunInputContext";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { notifyDashboardUser } from "@/lib/dispatch/dispatchWriterRunToAgent";

const notifyRunParticipants = (
  runtime: AgentWitchHubRuntime,
  run: {
    readonly requesterUserId: string;
    readonly executorUserId: string;
  },
  message: AgentWitchMessage,
): void => {
  notifyDashboardUser(runtime, run.requesterUserId, message);
  if (run.executorUserId !== run.requesterUserId) {
    notifyDashboardUser(runtime, run.executorUserId, message);
  }
};

export const handleClaudeInputRequiredMessageAsync = async (
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
  const question =
    typeof message.payload?.question === "string"
      ? message.payload.question.trim()
      : "";
  const partialOutput =
    typeof message.payload?.partialOutput === "string"
      ? message.payload.partialOutput
      : "";

  if (agentRunId.length === 0 || question.length === 0) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage:
          "command.claude.input_required requires payload.agentRunId and payload.question.",
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
        errorMessage: "Agent run is not eligible for input requests.",
        errorCode: "run_not_awaiting_input",
        agentRunId,
      },
      requestId: message.requestId,
    };
  }

  // 2a17ba21: the host re-sent an ask that was just answered (it reconnected
  // before the answer arrived): hand it the same answer, don't reopen it.
  const replayAnswer = answeredAgentRunInputMemory.findReplayAnswer(
    agentRunId,
    question,
  );
  if (replayAnswer !== null) {
    sender.send(replayAnswer);
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      payload: { agentRunId, resumed: true },
      requestId: message.requestId,
    };
  }

  const context = await buildAgentRunInputContext(existingRun);

  dispatchAgentRunInputRegistry.register({
    agentRunId,
    requesterUserId: existingRun.requesterUserId,
    executorUserId: existingRun.executorUserId,
    question,
    partialOutput,
    requestId: message.requestId,
    context,
  });

  const broadcastMessage: AgentWitchMessage = {
    type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_INPUT_REQUIRED,
    payload: {
      agentRunId,
      question,
      partialOutput,
      context,
    },
    requestId: message.requestId,
  };

  notifyRunParticipants(runtime, existingRun, broadcastMessage);

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: { agentRunId, awaitingInput: true },
    requestId: message.requestId,
  };
};
