import isAgentWitchDeviceOwnedByUser from "@/lib/agentWitch/isAgentWitchDeviceOwnedByUser";

export const validateMarketplaceInstallDeviceOwnership = async (
  actorUserId: string,
  deviceId: string,
): Promise<string | null> => {
  if (!(await isAgentWitchDeviceOwnedByUser(deviceId, actorUserId))) {
    return "The selected Mac is not connected to your account.";
  }

  return null;
};
