import { AGENT_WITCH_DISPATCH_ERROR_CODES } from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { isDeviceLiveOnAnotherInstance } from "@/lib/agentWitch/agentWitchConnectionRegistryQueries";
import { findAgentWitchDeviceById } from "@/lib/agentWitch/findAgentWitchDeviceById";
import { isAgentWitchDeviceRecentlySeen } from "@/lib/agentWitch/agentWitchHeartbeat.constant";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";

export const buildTargetMacOfflineDispatchError = async (
  targetDeviceId: string,
  executorUserId: string,
  requestId?: string,
): Promise<ReturnType<typeof buildDispatchError>> => {
  if (await isDeviceLiveOnAnotherInstance(executorUserId, targetDeviceId)) {
    return buildDispatchError(
      "The selected Mac is reconnecting. Try again in a few seconds.",
      requestId,
      AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_RECONNECTING,
    );
  }

  const device = await findAgentWitchDeviceById(targetDeviceId);
  const recentlySeen =
    device !== null &&
    isAgentWitchDeviceRecentlySeen(device.lastSeenAt, Date.now());

  if (recentlySeen) {
    return buildDispatchError(
      "The selected Mac is reconnecting. Try again in a few seconds.",
      requestId,
      AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_RECONNECTING,
    );
  }

  return buildDispatchError(
    "The selected Mac is not online right now.",
    requestId,
    AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_OFFLINE,
  );
};
