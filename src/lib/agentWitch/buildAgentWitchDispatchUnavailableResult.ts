import {
  AGENT_WITCH_DISPATCH_ERROR_CODES,
  MAC_OFFLINE_ERROR,
  MAC_REPLACED_ERROR,
} from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { classifyAgentWitchDispatchUnavailability } from "@/lib/agentWitch/classifyAgentWitchDispatchUnavailability";

export type AgentWitchDispatchUnavailableResult =
  | {
      readonly kind: "retry";
      readonly errorMessage: string;
      readonly errorCode: typeof AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_RECONNECTING;
    }
  | {
      readonly kind: "offline";
      readonly errorMessage: string;
      readonly errorCode:
        | typeof AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_OFFLINE
        | typeof AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_REPLACED;
    };

export const buildAgentWitchDispatchUnavailableResult = async (input: {
  readonly deviceId: string;
  readonly reconnectingMessage: string;
}): Promise<AgentWitchDispatchUnavailableResult> => {
  const unavailability = await classifyAgentWitchDispatchUnavailability(
    input.deviceId,
  );

  if (unavailability === "reconnecting") {
    return {
      kind: "retry",
      errorMessage: input.reconnectingMessage,
      errorCode: AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_RECONNECTING,
    };
  }

  if (unavailability === "replaced") {
    return {
      kind: "offline",
      errorMessage: MAC_REPLACED_ERROR,
      errorCode: AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_REPLACED,
    };
  }

  return {
    kind: "offline",
    errorMessage: MAC_OFFLINE_ERROR,
    errorCode: AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_OFFLINE,
  };
};
