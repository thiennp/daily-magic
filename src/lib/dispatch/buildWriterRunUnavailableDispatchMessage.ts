import {
  AGENT_WITCH_DISPATCH_ERROR_CODES,
  MAC_RECONNECTING_RETRY_ERROR,
} from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { buildAgentWitchDispatchUnavailableResult } from "@/lib/agentWitch/buildAgentWitchDispatchUnavailableResult";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";

export const buildWriterRunUnavailableDispatchMessage = async (input: {
  readonly deviceId: string;
  readonly requestId?: string;
}): Promise<AgentWitchMessage> => {
  const unavailable = await buildAgentWitchDispatchUnavailableResult({
    deviceId: input.deviceId,
    reconnectingMessage: MAC_RECONNECTING_RETRY_ERROR,
  });

  if (unavailable.kind === "retry") {
    return buildDispatchError(
      unavailable.errorMessage,
      input.requestId,
      AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_RECONNECTING,
    );
  }

  return buildDispatchError(
    unavailable.errorMessage,
    input.requestId,
    unavailable.errorCode,
  );
};
