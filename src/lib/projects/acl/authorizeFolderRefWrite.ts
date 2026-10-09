import type { FolderRefDeviceAclResult } from "@/lib/projects/acl/checkFolderRefDeviceAcl";
import { isActorOwnedLiveDevice } from "@/lib/projects/acl/isActorOwnedLiveDevice";
import { resolveFolderRefActor } from "@/lib/projects/acl/resolveFolderRefActor";
import { resolveFolderRefDeviceTarget } from "@/lib/projects/acl/resolveFolderRefDeviceTarget";
import { checkFolderRefAclSeatingOwnerDevice } from "@/lib/projects/acl/seatOwnerPickedComputer";

export type FolderRefWriteAuth =
  | Extract<FolderRefDeviceAclResult, { readonly ok: true }>
  | {
      readonly ok: false;
      readonly code:
        | "not_found"
        | "forbidden"
        | "folder_ref_invalid_device"
        | "folder_ref_device_not_member";
    };

/**
 * Folder-ref write gate. Owner: every project computer (seated on first use).
 * Member: only a computer they registered themselves, so a project's folder
 * can differ per person.
 */
export const authorizeFolderRefWrite = async (
  input: Parameters<typeof checkFolderRefAclSeatingOwnerDevice>[0] & {
    readonly projectId: string;
    readonly actorUserId: string;
    readonly isActorDevice?: typeof isActorOwnedLiveDevice;
  },
): Promise<FolderRefWriteAuth> => {
  const actor = await resolveFolderRefActor(input);
  if (!actor.ok) return actor;
  if (actor.isOwner) return checkFolderRefAclSeatingOwnerDevice(input);
  const target = resolveFolderRefDeviceTarget(input);
  if (target.kind !== "device") {
    return { ok: false, code: "folder_ref_invalid_device" };
  }
  const own = await (input.isActorDevice ?? isActorOwnedLiveDevice)({
    userId: input.actorUserId,
    deviceId: target.deviceId,
  });
  return own
    ? { ok: true, ref: target.ref }
    : { ok: false, code: "folder_ref_device_not_member" };
};
