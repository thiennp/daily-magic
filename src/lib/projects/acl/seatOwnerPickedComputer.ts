import {
  checkFolderRefDeviceAcl,
  type FolderRefDeviceAclResult,
} from "@/lib/projects/acl/checkFolderRefDeviceAcl";
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

/** Folder-ref ACL; when the owner's own computer has no seat yet, seat it once and re-check. */
export const checkFolderRefAclSeatingOwnerDevice = async (
  input: Parameters<typeof checkFolderRefDeviceAcl>[0] & {
    readonly ownerUserId: string;
  },
): Promise<FolderRefDeviceAclResult> => {
  const acl = await checkFolderRefDeviceAcl(input);
  if (
    acl.ok ||
    acl.code !== "folder_ref_device_not_member" ||
    input.isComputerMember !== undefined
  ) {
    return acl;
  }
  await seatOwnerPickedComputer(input);
  return checkFolderRefDeviceAcl(input);
};
