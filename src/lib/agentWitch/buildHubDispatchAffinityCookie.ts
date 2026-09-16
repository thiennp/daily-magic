import { findLiveRegistryInstanceIdForDevice } from "@/lib/agentWitch/agentWitchConnectionRegistry";
import { getAgentWitchHubInstanceId } from "@/lib/agentWitch/getAgentWitchHubInstanceId";
import type AgentWitchPresenceTier from "@/lib/agentWitch/types/AgentWitchPresenceTier.type";

const HUB_DISPATCH_AFFINITY_COOKIE = "aw_hub_instance";

export const resolveHubDispatchAffinityInstanceId = async (input: {
  readonly userId: string;
  readonly devices: ReadonlyArray<{
    readonly id: string;
    readonly presenceTier: AgentWitchPresenceTier;
  }>;
}): Promise<string | null> => {
  const localInstanceId = getAgentWitchHubInstanceId();
  const liveOnThisHub = input.devices.find(
    (device) => device.presenceTier === "live",
  );

  if (liveOnThisHub !== undefined) {
    return localInstanceId;
  }

  for (const device of input.devices) {
    if (device.presenceTier !== "live_other_instance") {
      continue;
    }

    const registryInstanceId = await findLiveRegistryInstanceIdForDevice(
      input.userId,
      device.id,
    );

    if (registryInstanceId !== null) {
      return registryInstanceId;
    }
  }

  return null;
};

export const buildHubDispatchAffinitySetCookie = (instanceId: string): string =>
  `${HUB_DISPATCH_AFFINITY_COOKIE}=${encodeURIComponent(instanceId)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`;

export const HUB_DISPATCH_AFFINITY_COOKIE_NAME = HUB_DISPATCH_AFFINITY_COOKIE;
