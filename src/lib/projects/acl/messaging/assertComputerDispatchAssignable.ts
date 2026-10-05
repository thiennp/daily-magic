import { isAgentWitchDeviceRecentlySeen } from "@/lib/agentWitch/agentWitchHeartbeat.constant";
import { listFreshRegistryDeviceIdsForUser } from "@/lib/agentWitch/agentWitchConnectionRegistry";
import { collectLiveAgentWitchDeviceIdsForUser } from "@/lib/agentWitch/collectLiveAgentWitchDeviceIdsForUser";
import { findAgentWitchDeviceById } from "@/lib/agentWitch/findAgentWitchDeviceById";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { isProjectComputerMemberAssignable } from "@/lib/projects/acl/isProjectComputerMemberAssignable";

export type ComputerNotAssignableCause = "offline" | "too_old";

export type AssertComputerDispatchAssignableResult =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly code: "computer_not_assignable";
      readonly cause: ComputerNotAssignableCause;
    };

/**
 * Server-side assignability re-check for memberKind=computer.
 * Does not trust the client picker. Uses Mac helper
 * (`isProjectComputerMemberAssignable`) when present on this branch / Mac tip.
 */
export const assertComputerDispatchAssignable = async (input: {
  readonly deviceId: string;
  readonly ownerUserId: string;
  readonly membershipStatus?: string;
}): Promise<AssertComputerDispatchAssignableResult> => {
  const device = await findAgentWitchDeviceById(input.deviceId);
  if (device === null || device.revokedAt !== null) {
    return { ok: false, code: "computer_not_assignable", cause: "offline" };
  }

  const registryIds = await listFreshRegistryDeviceIdsForUser(input.ownerUserId);
  let liveLocal: ReadonlySet<string> = new Set<string>();
  try {
    liveLocal = await collectLiveAgentWitchDeviceIdsForUser(
      getAgentWitchHub(),
      input.ownerUserId,
    );
  } catch {
    liveLocal = new Set();
  }
  const isLive = liveLocal.has(input.deviceId) || registryIds.has(input.deviceId);
  const isOnline =
    isLive || isAgentWitchDeviceRecentlySeen(device.lastSeenAt, Date.now());

  const { assignable, connectVersionStatus } = isProjectComputerMemberAssignable({
    status: input.membershipStatus ?? "active",
    isOnline,
    installBundleVersion: device.installBundleVersion ?? null,
  });

  if (assignable) {
    return { ok: true };
  }
  if (!isOnline) {
    return { ok: false, code: "computer_not_assignable", cause: "offline" };
  }
  void connectVersionStatus;
  return { ok: false, code: "computer_not_assignable", cause: "too_old" };
};
