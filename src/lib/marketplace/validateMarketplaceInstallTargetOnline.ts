import { findEnrichedAgentClientForUser } from "@/lib/agentWitch/findEnrichedAgentClientForUser";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";

import { validateMarketplaceInstallDeviceOwnership } from "./validateMarketplaceInstallTarget";

export const validateMarketplaceInstallTarget = async (
  actorUserId: string,
  deviceId: string,
): Promise<string | null> => {
  const ownershipError = await validateMarketplaceInstallDeviceOwnership(
    actorUserId,
    deviceId,
  );

  if (ownershipError !== null) {
    return ownershipError;
  }

  const hub = getAgentWitchHub();
  const agentClient = await findEnrichedAgentClientForUser(
    hub,
    actorUserId,
    deviceId,
  );

  if (agentClient === undefined) {
    return "The selected Mac is not online right now.";
  }

  return null;
};
