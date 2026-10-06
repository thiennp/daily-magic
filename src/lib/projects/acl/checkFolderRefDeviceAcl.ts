import { isActiveProjectComputerMemberDevice } from "@/lib/projects/acl/isActiveProjectComputerMemberDevice";
import { isLiveProjectOwnerDevice } from "@/lib/projects/acl/isLiveProjectOwnerDevice";
import { resolveFolderRefDeviceTarget } from "@/lib/projects/acl/resolveFolderRefDeviceTarget";
import type { ProjectComputerMemberLookup } from "@/lib/projects/acl/types/ProjectComputerMemberLookup.type";
import type { ProjectOwnerDeviceLookup } from "@/lib/projects/acl/types/ProjectOwnerDeviceLookup.type";

export type FolderRefDeviceAclResult =
  | { readonly ok: true; readonly ref: string }
  | {
      readonly ok: false;
      readonly code: "invalid" | "folder_ref_device_not_member";
    };

/**
 * Use-case guard for folder-ref writes only (reads never call this).
 * deviceId targets must be (a) an active computer member of `projectId`, or
 * (b) the project's own non-revoked linked device (pre-068 owners);
 * legacy free-text labels pass through unchanged.
 */
export const checkFolderRefDeviceAcl = async (input: {
  readonly projectId: string;
  readonly machineOrDeviceRef: string;
  readonly deviceId?: string | null;
  readonly isComputerMember?: ProjectComputerMemberLookup;
  readonly isOwnerDevice?: ProjectOwnerDeviceLookup;
}): Promise<FolderRefDeviceAclResult> => {
  const target = resolveFolderRefDeviceTarget(input);
  if (target.kind === "invalid") {
    return { ok: false, code: "invalid" };
  }
  if (target.kind === "label") {
    return { ok: true, ref: target.ref };
  }
  const isComputerMember =
    input.isComputerMember ?? isActiveProjectComputerMemberDevice;
  const isOwnerDevice = input.isOwnerDevice ?? isLiveProjectOwnerDevice;
  const lookup = { projectId: input.projectId, deviceId: target.deviceId };
  const allowed =
    (await isComputerMember(lookup)) || (await isOwnerDevice(lookup));
  if (!allowed) {
    return { ok: false, code: "folder_ref_device_not_member" };
  }
  return { ok: true, ref: target.ref };
};
