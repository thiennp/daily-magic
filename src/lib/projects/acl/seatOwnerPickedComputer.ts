import { upsertProjectComputerMembership } from "@/lib/projects/acl/upsertProjectComputerMembership";

/** Owner's own live computer picked for a folder ref: seat it (idempotent). */
export const seatOwnerPickedComputer = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly deviceId?: string | null;
}): Promise<void> => {
  const deviceId = input.deviceId?.trim() ?? "";
  if (!deviceId) return;
  await upsertProjectComputerMembership({
    projectId: input.projectId,
    ownerUserId: input.ownerUserId,
    deviceId,
  });
};
