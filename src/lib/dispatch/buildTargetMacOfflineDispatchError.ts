import {
  AGENT_WITCH_DISPATCH_ERROR_CODES,
  MAC_OFFLINE_ERROR,
  MAC_RECONNECTING_RETRY_ERROR,
  MAC_REPLACED_ERROR,
} from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { isDeviceLiveOnAnotherInstance } from "@/lib/agentWitch/agentWitchConnectionRegistryQueries";
import { classifyAgentWitchDispatchUnavailability } from "@/lib/agentWitch/classifyAgentWitchDispatchUnavailability";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";

export const buildTargetMacOfflineDispatchError = async (
  targetDeviceId: string,
  executorUserId: string,
  requestId?: string,
): Promise<ReturnType<typeof buildDispatchError>> => {
  if (await isDeviceLiveOnAnotherInstance(executorUserId, targetDeviceId)) {
    return buildDispatchError(
      MAC_RECONNECTING_RETRY_ERROR,
      requestId,
      AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_RECONNECTING,
    );
  }

  const unavailability =
    await classifyAgentWitchDispatchUnavailability(targetDeviceId);

  if (unavailability === "reconnecting") {
    return buildDispatchError(
      MAC_RECONNECTING_RETRY_ERROR,
      requestId,
      AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_RECONNECTING,
    );
  }

  if (unavailability === "replaced") {
    return buildDispatchError(
      MAC_REPLACED_ERROR,
      requestId,
      AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_REPLACED,
    );
  }

  return buildDispatchError(
    MAC_OFFLINE_ERROR,
    requestId,
    AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_OFFLINE,
  );
};
