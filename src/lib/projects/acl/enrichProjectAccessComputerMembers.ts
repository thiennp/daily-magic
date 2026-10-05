import { isAgentWitchDeviceRecentlySeen } from "@/lib/agentWitch/agentWitchHeartbeat.constant";
import type { MembershipView } from "@/lib/projects/acl/buildProjectAccessViews";
import { isProjectComputerMemberAssignable } from "@/lib/projects/acl/isProjectComputerMemberAssignable";
import { loadUserProfilesByIds } from "@/lib/projects/acl/isAgentUser";
import { asRowArray, getSql } from "@/lib/db";

type DevicePresence = {
  readonly installBundleVersion: string | null;
  readonly lastSeenAt: string | null;
};

const loadDevicePresence = async (
  deviceIds: readonly string[],
): Promise<ReadonlyMap<string, DevicePresence>> => {
  const map = new Map<string, DevicePresence>();
  if (deviceIds.length === 0) {
    return map;
  }
  const rows = asRowArray(
    await getSql()`
      SELECT id, install_bundle_version, last_seen_at
      FROM agent_witch_devices
      WHERE id = ANY(${[...deviceIds]}::text[])
    `,
  );
  for (const row of rows) {
    map.set(String(row.id), {
      installBundleVersion: row.install_bundle_version
        ? String(row.install_bundle_version)
        : null,
      lastSeenAt: row.last_seen_at ? String(row.last_seen_at) : null,
    });
  }
  return map;
};

const enrichOne = (
  member: MembershipView,
  presence: DevicePresence | undefined,
  liveDeviceIds: ReadonlySet<string>,
  ownerDisplayName: string | null,
  nowMs: number,
): MembershipView => {
  const deviceId = member.deviceId ?? "";
  const isDispatchReady = liveDeviceIds.has(deviceId);
  const isOnline =
    isDispatchReady ||
    isAgentWitchDeviceRecentlySeen(presence?.lastSeenAt ?? null, nowMs);
  const installBundleVersion = presence?.installBundleVersion ?? null;
  const { connectVersionStatus, assignable } = isProjectComputerMemberAssignable(
    {
      status: member.status,
      isOnline: presence !== undefined && isOnline,
      installBundleVersion,
    },
  );
  return {
    ...member,
    ownerUserId: member.userId,
    ownerDisplayName,
    isOnline: presence !== undefined && isOnline,
    isDispatchReady,
    installBundleVersion,
    connectVersionStatus,
    assignable: presence !== undefined && assignable,
  };
};

/** Fill computer contract fields on access MembershipView rows. */
export const enrichProjectAccessComputerMembers = async (
  members: readonly MembershipView[],
  liveDeviceIds: ReadonlySet<string> = new Set(),
): Promise<readonly MembershipView[]> => {
  const computers = members.filter((m) => m.memberKind === "computer");
  if (computers.length === 0) {
    return members;
  }
  const deviceIds = computers
    .map((m) => m.deviceId)
    .filter((id): id is string => typeof id === "string" && id.length > 0);
  const [presenceByDevice, profiles] = await Promise.all([
    loadDevicePresence(deviceIds),
    loadUserProfilesByIds(computers.map((m) => m.userId)),
  ]);
  const nowMs = Date.now();
  return members.map((member) => {
    if (member.memberKind !== "computer" || member.deviceId == null) {
      return member;
    }
    return enrichOne(
      member,
      presenceByDevice.get(member.deviceId),
      liveDeviceIds,
      profiles.get(member.userId)?.name ?? null,
      nowMs,
    );
  });
};
