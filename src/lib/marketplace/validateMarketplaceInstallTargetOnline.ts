import { listFreshRegistryDeviceIdsOnOtherInstances } from "@/lib/agentWitch/agentWitchConnectionRegistry";
import {
  MAC_RECONNECTING_RETRY_ERROR,
  MAC_REPLACED_ERROR,
} from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { classifyAgentWitchDispatchUnavailability } from "@/lib/agentWitch/classifyAgentWitchDispatchUnavailability";
import { collectLiveAgentWitchDeviceIdsForUser } from "@/lib/agentWitch/collectLiveAgentWitchDeviceIdsForUser";
import { ensureAgentWitchDeviceSchema } from "@/lib/agentWitch/ensureAgentWitchDeviceSchema";
import { findAgentWitchDeviceById } from "@/lib/agentWitch/findAgentWitchDeviceById";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { isAgentWitchDeviceOrSuccessorOwnedByUser } from "@/lib/agentWitch/isAgentWitchDeviceOrSuccessorOwnedByUser";
import { resolveAgentWitchDevicePresenceTier } from "@/lib/agentWitch/resolveAgentWitchDevicePresenceTier";
import { resolveCurrentAgentWitchDeviceId } from "@/lib/agentWitch/resolveCurrentAgentWitchDeviceId";
import { resolveDispatchTargetAgentClient } from "@/lib/agentWitch/resolveDispatchTargetAgentClient";

import {
  MARKETPLACE_INSTALL_MAC_NOT_LIVE_ERROR,
  MARKETPLACE_INSTALL_MAC_RECENT_NOT_LIVE_ERROR,
} from "./marketplaceInstallMacErrors.constant";
import { validateMarketplaceInstallDeviceOwnership } from "./validateMarketplaceInstallTarget";

const resolveOwnedDevicePresenceTier = async (
  actorUserId: string,
  deviceId: string,
): Promise<"recent" | "offline" | "replaced"> => {
  await ensureAgentWitchDeviceSchema();
  const currentDeviceId = await resolveCurrentAgentWitchDeviceId(deviceId);
  const device = await findAgentWitchDeviceById(currentDeviceId);

  if (device === null || device.revokedAt !== null) {
    return "replaced";
  }

  const localLiveDeviceIds = await collectLiveAgentWitchDeviceIdsForUser(
    getAgentWitchHub(),
    actorUserId,
  );
  const remoteLiveDeviceIds =
    await listFreshRegistryDeviceIdsOnOtherInstances(actorUserId);
  const presenceTier = resolveAgentWitchDevicePresenceTier({
    deviceId: currentDeviceId,
    lastSeenAt: device.lastSeenAt,
    localLiveDeviceIds,
    remoteLiveDeviceIds,
  });

  if (presenceTier === "recent") {
    return "recent";
  }

  return "offline";
};

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

  const unavailability =
    await classifyAgentWitchDispatchUnavailability(deviceId);

  if (unavailability === "replaced") {
    return MAC_REPLACED_ERROR;
  }

  if (unavailability === "reconnecting") {
    return MAC_RECONNECTING_RETRY_ERROR;
  }

  const presence = await resolveOwnedDevicePresenceTier(actorUserId, deviceId);

  if (presence === "replaced") {
    return MAC_REPLACED_ERROR;
  }

  if (presence === "recent") {
    return MARKETPLACE_INSTALL_MAC_RECENT_NOT_LIVE_ERROR;
  }

  return MARKETPLACE_INSTALL_MAC_NOT_LIVE_ERROR;
};
