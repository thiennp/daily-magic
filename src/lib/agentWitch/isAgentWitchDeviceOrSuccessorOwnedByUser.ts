import isAgentWitchDeviceOwnedByUser from "@/lib/agentWitch/isAgentWitchDeviceOwnedByUser";
import { resolveCurrentAgentWitchDeviceId } from "@/lib/agentWitch/resolveCurrentAgentWitchDeviceId";

/**
 * Ownership checks ignore revoked rows, so a device id that survived a re-pair
 * only passes when it is followed to the row that replaced it.
 */
export const isAgentWitchDeviceOrSuccessorOwnedByUser = async (
  deviceId: string,
  userId: string,
): Promise<boolean> => {
  if (await isAgentWitchDeviceOwnedByUser(deviceId, userId)) {
    return true;
  }

  const currentDeviceId = await resolveCurrentAgentWitchDeviceId(deviceId);

  return (
    currentDeviceId !== deviceId &&
    (await isAgentWitchDeviceOwnedByUser(currentDeviceId, userId))
  );
};
