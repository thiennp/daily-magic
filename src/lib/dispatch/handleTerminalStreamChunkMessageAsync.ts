import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { broadcastTerminalStreamToRunParticipants } from "@/lib/dispatch/broadcastTerminalStreamToRunParticipants";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import type { RequireTerminalStreamPublisherResult } from "@/lib/dispatch/requireTerminalStreamPublisher";
import { validateTerminalStreamChunkLimits } from "@/lib/dispatch/terminalStreamLimits";

type AuthorizedTerminalStreamPublisher = Extract<
  RequireTerminalStreamPublisherResult,
  { readonly ok: true }
>;

export const handleTerminalStreamChunkMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  authorization: AuthorizedTerminalStreamPublisher,
): Promise<AgentWitchMessage> => {
  const runId = authorization.run.id;
  const chunk =
    typeof message.payload?.chunk === "string" ? message.payload.chunk : "";

  if (chunk.length > 0) {
    const limitResult = validateTerminalStreamChunkLimits(runId, chunk);
    if (!limitResult.ok) {
      return buildDispatchError(limitResult.errorMessage, message.requestId);
    }

    broadcastTerminalStreamToRunParticipants(runtime, authorization.run, {
      type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_CHUNK,
      payload: { runId, chunk },
    });
  }

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    requestId: message.requestId,
  };
};
