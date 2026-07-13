import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import {
  releaseTerminalStreamSlot,
  tryAcquireTerminalStreamSlot,
} from "@/lib/agentWitch/agentWitchStreamSlotManager";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { unauthorizedAgentOnlyError } from "@/lib/agentWitch/agentWitchHubClientOperations";
import { getAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";

const readRunId = (payload: Record<string, unknown> | undefined): string =>
  typeof payload?.runId === "string" ? payload.runId : "";

const broadcastTerminalStream = (
  runtime: AgentWitchHubRuntime,
  runId: string,
  message: AgentWitchMessage,
): void => {
  const run = getAgentRunSession(runId);
  if (run === undefined) {
    return;
  }

  runtime.broadcastToDashboardUser(run.requesterUserId, message);
  if (run.executorUserId !== run.requesterUserId) {
    runtime.broadcastToDashboardUser(run.executorUserId, message);
  }
};

export const handleTerminalStreamMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "agent") {
    return unauthorizedAgentOnlyError(message.requestId);
  }

  const runId = readRunId(message.payload);
  if (!isNonEmptyString(runId)) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: { errorMessage: "terminal.stream.* requires payload.runId." },
      requestId: message.requestId,
    };
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_START) {
    const slot = tryAcquireTerminalStreamSlot(runId);
    const responseType = slot.accepted
      ? AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_ACCEPTED
      : AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_REJECTED;

    return {
      type: responseType,
      payload: {
        runId,
        activeStreams: slot.activeStreams,
        maxStreams: slot.maxStreams,
        retryAfterSeconds: slot.retryAfterSeconds,
      },
      requestId: message.requestId,
    };
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_CHUNK) {
    const chunk =
      typeof message.payload?.chunk === "string" ? message.payload.chunk : "";
    broadcastTerminalStream(runtime, runId, {
      type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_CHUNK,
      payload: { runId, chunk },
      requestId: message.requestId,
    });
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      requestId: message.requestId,
    };
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_END) {
    releaseTerminalStreamSlot(runId);
    broadcastTerminalStream(runtime, runId, {
      type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_END,
      payload: { runId },
      requestId: message.requestId,
    });
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      requestId: message.requestId,
    };
  }

  return null;
};
