import { listFreshRegistryDeviceIdsForUser } from "@/lib/agentWitch/agentWitchConnectionRegistry";
import { collectLiveAgentWitchDeviceIdsForUser } from "@/lib/agentWitch/collectLiveAgentWitchDeviceIdsForUser";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

/**
 * True when the project's linked computer (user_projects.device_id) has a live
 * hub WebSocket on this instance or a fresh connection-registry presence.
 * Same live sources as computer dispatch assignability / Access roster.
 */
export const detectProjectMessengerLocalLive = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
}): Promise<boolean> => {
  const project = await getUserProjectById(input.projectId);
  const deviceId = project?.deviceId?.trim() ?? "";
  if (deviceId.length === 0) {
    return false;
  }
  try {
    const liveLocal = await collectLiveAgentWitchDeviceIdsForUser(
      getAgentWitchHub(),
      input.ownerUserId,
    );
    if (liveLocal.has(deviceId)) {
      return true;
    }
    const registryIds = await listFreshRegistryDeviceIdsForUser(
      input.ownerUserId,
    );
    return registryIds.has(deviceId);
  } catch {
    return false;
  }
};
