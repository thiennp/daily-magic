import { loadAgentWitchDeviceWriters } from "@/lib/agentWitch/loadAgentWitchDeviceWriters";
import { isAgentWitchDeviceRecentlySeen } from "@/lib/agentWitch/agentWitchHeartbeat.constant";
import { listFreshRegistryDeviceIdsForUser } from "@/lib/agentWitch/agentWitchConnectionRegistry";
import { collectLiveAgentWitchDeviceIdsForUser } from "@/lib/agentWitch/collectLiveAgentWitchDeviceIdsForUser";
import { findAgentWitchDeviceById } from "@/lib/agentWitch/findAgentWitchDeviceById";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { isProjectComputerMemberAssignable } from "@/lib/projects/acl/isProjectComputerMemberAssignable";

export type ComputerNotAssignableCause =
  "offline" | "too_old" | "writer_not_ready";

export type AssertComputerDispatchAssignableResult =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly code: "computer_not_assignable";
      readonly cause: ComputerNotAssignableCause;
    };

const collectLiveLocalDeviceIdsSafely = async (
  ownerUserId: string,
): Promise<ReadonlySet<string>> => {
  try {
    return await collectLiveAgentWitchDeviceIdsForUser(
      getAgentWitchHub(),
      ownerUserId,
    );
  } catch {
    return new Set<string>();
  }
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
  /** Coding tool the task will run with; checked against the heartbeat. */
  readonly writerAgent?: string;
}): Promise<AssertComputerDispatchAssignableResult> => {
  const device = await findAgentWitchDeviceById(input.deviceId);
  if (device === null || device.revokedAt !== null) {
    return { ok: false, code: "computer_not_assignable", cause: "offline" };
  }

  const registryIds = await listFreshRegistryDeviceIdsForUser(
    input.ownerUserId,
  );
  const liveLocal = await collectLiveLocalDeviceIdsSafely(input.ownerUserId);
  const isLive =
    liveLocal.has(input.deviceId) || registryIds.has(input.deviceId);
  const isOnline =
    isLive || isAgentWitchDeviceRecentlySeen(device.lastSeenAt, Date.now());

  const { assignable, connectVersionStatus } =
    isProjectComputerMemberAssignable({
      status: input.membershipStatus ?? "active",
      isOnline,
      installBundleVersion: device.installBundleVersion ?? null,
    });

  if (assignable) {
    if (input.writerAgent !== undefined) {
      const writers = await loadAgentWitchDeviceWriters(input.deviceId);
      const known = writers.length > 0;
      const ready = writers.some(
        (writer) => writer.writerAgent === input.writerAgent && writer.ready,
      );
      if (known && !ready) {
        return {
          ok: false,
          code: "computer_not_assignable",
          cause: "writer_not_ready",
        };
      }
    }
    return { ok: true };
  }
  if (!isOnline) {
    return { ok: false, code: "computer_not_assignable", cause: "offline" };
  }
  void connectVersionStatus;
  return { ok: false, code: "computer_not_assignable", cause: "too_old" };
};
