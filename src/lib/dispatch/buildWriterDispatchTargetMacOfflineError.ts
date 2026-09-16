import { isDeviceLiveOnAnotherInstance } from "@/lib/agentWitch/agentWitchConnectionRegistry";
import {
  AGENT_WITCH_DISPATCH_ERROR_CODES,
  MAC_RECONNECTING_RETRY_ERROR,
  MAC_REPLACED_ERROR,
} from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { classifyAgentWitchDispatchUnavailability } from "@/lib/agentWitch/classifyAgentWitchDispatchUnavailability";
import { MAC_OFFLINE_FOR_ACCOUNT_ERROR } from "@/lib/agentWitch/macOfflineForAccountErrorMessage.constant";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";

/**
 * Writer dispatch must fail closed without creating a run when no live hub client
 * exists on this process (ADR 0005 / AGENT-022).
 */
export const buildWriterDispatchTargetMacOfflineError = async (input: {
  readonly executorUserId: string;
  readonly deviceId: string;
  readonly requestId?: string;
}): Promise<AgentWitchMessage> => {
  if (
    await isDeviceLiveOnAnotherInstance(input.executorUserId, input.deviceId)
  ) {
    return buildDispatchError(
      MAC_RECONNECTING_RETRY_ERROR,
      input.requestId,
      AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_RECONNECTING,
    );
  }

  const unavailability = await classifyAgentWitchDispatchUnavailability(
    input.deviceId,
  );

  if (unavailability === "reconnecting") {
    return buildDispatchError(
      MAC_RECONNECTING_RETRY_ERROR,
      input.requestId,
      AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_RECONNECTING,
    );
  }

  if (unavailability === "replaced") {
    return buildDispatchError(
      MAC_REPLACED_ERROR,
      input.requestId,
      AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_REPLACED,
    );
  }

  return buildDispatchError(
    MAC_OFFLINE_FOR_ACCOUNT_ERROR,
    input.requestId,
    AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_OFFLINE,
  );
};
