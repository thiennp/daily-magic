import { findFreshHubInstanceIdForDevice } from "@/lib/agentWitch/agentWitchConnectionRegistryQueries";
import { getAgentWitchHubInstanceId } from "@/lib/agentWitch/getAgentWitchHubInstanceId";

/**
 * Picks the hub `instance_id` browsers should stick to for writer dispatch:
 * local live sockets on this process first, otherwise the registry owner of a remote live Mac.
 */
export const resolveAgentWitchDispatchAffinityInstanceId = async (input: {
  readonly userId: string;
  readonly localLiveDeviceIds: ReadonlySet<string>;
  readonly remoteLiveDeviceIds: ReadonlySet<string>;
}): Promise<string | null> => {
  if (input.localLiveDeviceIds.size > 0) {
    return getAgentWitchHubInstanceId();
  }

  const remoteDeviceId = [...input.remoteLiveDeviceIds][0];
  if (remoteDeviceId === undefined) {
    return null;
  }

  return findFreshHubInstanceIdForDevice(input.userId, remoteDeviceId);
};
