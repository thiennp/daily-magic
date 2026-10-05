import { collectLiveAgentWitchDeviceIdsForUser } from "@/lib/agentWitch/collectLiveAgentWitchDeviceIdsForUser";
import { listFreshRegistryDeviceIdsOnOtherInstances } from "@/lib/agentWitch/agentWitchConnectionRegistry";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import type { MembershipView } from "@/lib/projects/acl/buildProjectAccessViews";

/** Live hub + remote registry device ids for computer seats on an access roster. */
export const resolveAccessComputerLiveDeviceIds = async (
  members: readonly MembershipView[],
): Promise<ReadonlySet<string>> => {
  const ownerIds = [
    ...new Set(
      members
        .filter((m) => m.memberKind === "computer")
        .map((m) => m.userId),
    ),
  ];
  if (ownerIds.length === 0) {
    return new Set();
  }
  const live = new Set<string>();
  try {
    const hub = getAgentWitchHub();
    for (const ownerId of ownerIds) {
      const local = await collectLiveAgentWitchDeviceIdsForUser(hub, ownerId);
      local.forEach((id) => live.add(id));
      const remote = await listFreshRegistryDeviceIdsOnOtherInstances(ownerId);
      remote.forEach((id) => live.add(id));
    }
  } catch {
    // Hub unavailable (tests / serverless) — presence falls back to last_seen.
  }
  return live;
};
