import { checkFolderRefDeviceAcl } from "@/lib/projects/acl/checkFolderRefDeviceAcl";
import type { ProjectComputerMemberLookup } from "@/lib/projects/acl/types/ProjectComputerMemberLookup.type";
import type { ProjectOwnerDeviceLookup } from "@/lib/projects/acl/types/ProjectOwnerDeviceLookup.type";

/** Shared in-memory seats + owner devices for checkFolderRefDeviceAcl tests. */
export const MEMBER_MAC = "11111111-1111-4111-8111-111111111111";
export const OWNER_AGENT_MAC = "22222222-2222-4222-8222-222222222222";
export const REVOKED_MAC = "33333333-3333-4333-8333-333333333333";
export const HUMAN_MEMBERSHIP_ID = "44444444-4444-4444-8444-444444444444";
export const OTHER_PROJECT_MAC = "55555555-5555-4555-8555-555555555555";

type Seat = {
  readonly projectId: string;
  readonly memberKind: "human" | "bot" | "computer";
  readonly status: "active" | "revoked";
  readonly id: string;
  readonly deviceId: string | null;
};

/** In-memory project_memberships; mirrors the DB adapter's WHERE clause. */
const seats: readonly Seat[] = [
  { projectId: "p1", memberKind: "computer", status: "active", id: "m1", deviceId: MEMBER_MAC },
  // Owner computer-as-agent: user_projects.device_id synced into a seat.
  { projectId: "p1", memberKind: "computer", status: "active", id: "m2", deviceId: OWNER_AGENT_MAC },
  { projectId: "p1", memberKind: "computer", status: "revoked", id: "m3", deviceId: REVOKED_MAC },
  { projectId: "p1", memberKind: "human", status: "active", id: HUMAN_MEMBERSHIP_ID, deviceId: null },
  { projectId: "p2", memberKind: "computer", status: "active", id: "m5", deviceId: OTHER_PROJECT_MAC },
];

export const fakeLookup: ProjectComputerMemberLookup = async ({ projectId, deviceId }) =>
  seats.some(
    (s) =>
      s.projectId === projectId &&
      s.deviceId === deviceId &&
      s.memberKind === "computer" &&
      s.status === "active",
  );

export const LEGACY_OWNER_MAC = "66666666-6666-4666-8666-666666666666";
export const REVOKED_OWNER_MAC = "77777777-7777-4777-8777-777777777777";
export const OTHER_USER_MAC = "88888888-8888-4888-8888-888888888888";

/** In-memory user_projects.device_id ⋈ agent_witch_devices.revoked_at. */
const projects: Readonly<Record<string, { deviceId: string; revoked: boolean }>> = {
  // Linked before mig 068: no owner computer seat row in `seats`.
  p1: { deviceId: LEGACY_OWNER_MAC, revoked: false },
  p3: { deviceId: REVOKED_OWNER_MAC, revoked: true },
};

export const fakeOwnerDevice: ProjectOwnerDeviceLookup = async ({ projectId, deviceId }) => {
  const project = projects[projectId];
  return project !== undefined && project.deviceId === deviceId && !project.revoked;
};

export const check = (machineOrDeviceRef: string, deviceId?: string, projectId = "p1") =>
  checkFolderRefDeviceAcl({
    projectId,
    machineOrDeviceRef,
    deviceId,
    isComputerMember: fakeLookup,
    isOwnerDevice: fakeOwnerDevice,
  });

export const NOT_MEMBER = { ok: false, code: "folder_ref_device_not_member" };
