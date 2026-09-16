import {
  MAC_OFFLINE_ERROR,
  MAC_REPLACED_ERROR,
} from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { classifyAgentWitchDispatchUnavailability } from "@/lib/agentWitch/classifyAgentWitchDispatchUnavailability";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { isAgentWitchDeviceOrSuccessorOwnedByUser } from "@/lib/agentWitch/isAgentWitchDeviceOrSuccessorOwnedByUser";
import { resolveDispatchTargetAgentClient } from "@/lib/agentWitch/resolveDispatchTargetAgentClient";

import { validateMarketplaceInstallDeviceOwnership } from "./validateMarketplaceInstallTarget";

export const validateMarketplaceInstallTarget = async (
  actorUserId: string,
  deviceId: string,
): Promise<string | null> => {
  const resolved = await resolveDispatchTargetAgentClient({
    runtime: getAgentWitchHub(),
    userId: actorUserId,
    deviceId,
  });

  if (resolved !== undefined) {
    return null;
  }

  if (
    !(await isAgentWitchDeviceOrSuccessorOwnedByUser(deviceId, actorUserId))
  ) {
    return (await classifyAgentWitchDispatchUnavailability(deviceId)) ===
      "replaced"
      ? MAC_REPLACED_ERROR
      : await validateMarketplaceInstallDeviceOwnership(actorUserId, deviceId);
  }

  return MAC_OFFLINE_ERROR;
};
