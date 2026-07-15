import { findEnrichedAgentClientForUser } from "@/lib/agentWitch/findEnrichedAgentClientForUser";
import isAgentWitchDeviceOwnedByUser from "@/lib/agentWitch/isAgentWitchDeviceOwnedByUser";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";

export const validateMarketplaceInstallTarget = async (
  actorUserId: string,
  deviceId: string,
): Promise<string | null> => {
  if (!(await isAgentWitchDeviceOwnedByUser(deviceId, actorUserId))) {
    return "The selected Mac is not connected to your account.";
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
