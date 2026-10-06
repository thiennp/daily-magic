import { upsertProjectComputerMembership } from "@/lib/projects/acl/upsertProjectComputerMembership";

type SeatFields = {
  readonly memberKind?: string;
  readonly deviceId?: string | null;
};

/**
 * Backfill: if user_projects.device_id is set but no active computer seat,
 * upsert one (pre-068 / unsynced owners). Returns true when a seat was written.
 */
export const ensureProjectLinkedComputerSeat = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly deviceId: string | null;
  readonly members: readonly SeatFields[];
}): Promise<boolean> => {
  const deviceId = input.deviceId?.trim() ?? "";
  if (!deviceId) return false;
  const hasSeat = input.members.some(
    (m) =>
      m.memberKind === "computer" && (m.deviceId?.trim() ?? "") === deviceId,
  );
  if (hasSeat) return false;
  const result = await upsertProjectComputerMembership({
    projectId: input.projectId,
    ownerUserId: input.ownerUserId,
    deviceId,
  });
  return result.ok;
};
