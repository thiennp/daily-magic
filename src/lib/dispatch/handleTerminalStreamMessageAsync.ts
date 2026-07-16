import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import {
  releaseTerminalStreamSlot,
  tryAcquireTerminalStreamSlot,
} from "@/lib/agentWitch/agentWitchStreamSlotManager";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { broadcastTerminalStreamToRunParticipants } from "@/lib/dispatch/broadcastTerminalStreamToRunParticipants";
import { handleTerminalStreamChunkMessageAsync } from "@/lib/dispatch/handleTerminalStreamChunkMessageAsync";
import { requireTerminalStreamPublisher } from "@/lib/dispatch/requireTerminalStreamPublisher";

const readRunId = (payload: Record<string, unknown> | undefined): string =>
  typeof payload?.runId === "string" ? payload.runId : "";

const systemAck = (requestId: string | undefined): AgentWitchMessage => ({
  type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
  requestId,
});

export const handleTerminalStreamMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  const runId = readRunId(message.payload);
  if (!isNonEmptyString(runId)) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: { errorMessage: "terminal.stream.* requires payload.runId." },
      requestId: message.requestId,
    };
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_START) {
    const authorization = await requireTerminalStreamPublisher({
      sender,
      runId,
      requestId: message.requestId,
    });
    if (!authorization.ok) {
      return authorization.error;
    }

    const slot = tryAcquireTerminalStreamSlot(runId, authorization.publisher);
    return {
      type: slot.accepted
        ? AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_ACCEPTED
        : AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_REJECTED,
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
    const authorization = await requireTerminalStreamPublisher({
      sender,
      runId,
      requestId: message.requestId,
      requireActiveSlot: true,
    });
    if (!authorization.ok) {
      return authorization.error;
    }

    return handleTerminalStreamChunkMessageAsync(
      runtime,
      message,
      authorization,
    );
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_END) {
    const authorization = await requireTerminalStreamPublisher({
      sender,
      runId,
      requestId: message.requestId,
      allowNonRunning: true,
      requireActiveSlot: true,
    });
    if (!authorization.ok) {
      return authorization.error;
    }

    releaseTerminalStreamSlot(runId);
    broadcastTerminalStreamToRunParticipants(runtime, authorization.run, {
      type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_END,
      payload: { runId },
    });

    return systemAck(message.requestId);
  }

  return null;
};
