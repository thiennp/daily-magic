import { isActiveProjectComputerMemberDevice } from "@/lib/projects/acl/isActiveProjectComputerMemberDevice";
import { resolveFolderRefDeviceTarget } from "@/lib/projects/acl/resolveFolderRefDeviceTarget";
import type { ProjectComputerMemberLookup } from "@/lib/projects/acl/types/ProjectComputerMemberLookup.type";

export type FolderRefDeviceAclResult =
  | { readonly ok: true; readonly ref: string }
  | {
      readonly ok: false;
      readonly code: "invalid" | "folder_ref_device_not_member";
    };

/**
 * Use-case guard for folder-ref writes only (reads never call this).
 * deviceId targets must be an active computer member of `projectId`;
 * legacy free-text labels pass through unchanged.
 */
export const checkFolderRefDeviceAcl = async (input: {
  readonly projectId: string;
  readonly machineOrDeviceRef: string;
  readonly deviceId?: string | null;
  readonly isComputerMember?: ProjectComputerMemberLookup;
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
  const member = await isComputerMember({
    projectId: input.projectId,
    deviceId: target.deviceId,
  });
  if (!member) {
    return { ok: false, code: "folder_ref_device_not_member" };
  }
  return { ok: true, ref: target.ref };
};
