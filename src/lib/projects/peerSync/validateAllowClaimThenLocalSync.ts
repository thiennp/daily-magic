import { verifyProjectAllowClaim } from "@/lib/projects/acl/verifyProjectAllowClaim";
import { listProjectFolderRefs } from "@/lib/projects/acl/listProjectFolderRefs";

export type LocalPeerSyncPlan =
  | {
      readonly ok: true;
      readonly projectId: string;
      readonly userId: string;
      readonly folderRefs: readonly {
        readonly machineOrDeviceRef: string;
        readonly folderPath: string;
      }[];
      readonly guidance: string;
    }
  | {
      readonly ok: false;
      readonly code: string;
      readonly guidance: string;
    };

/**
 * Reference local peer-sync helper: validate allow-claim with AWC, then
 * point teams at git/local folders. Does not upload content to AWC.
 */
export const validateAllowClaimThenLocalSync = async (
  allowClaim: string,
): Promise<LocalPeerSyncPlan> => {
  const verified = await verifyProjectAllowClaim(allowClaim);
  if (!verified.ok) {
    return {
      ok: false,
      code: verified.code,
      guidance:
        "Membership denied or claim invalid. Stop peer sync. Re-request access if needed; never reuse a revoked claim.",
    };
  }

  const refs = await listProjectFolderRefs(verified.projectId);
  return {
    ok: true,
    projectId: verified.projectId,
    userId: verified.userId,
    folderRefs: refs.map((ref) => ({
      machineOrDeviceRef: ref.machineOrDeviceRef,
      folderPath: ref.folderPath,
    })),
    guidance:
      "ACL ok. Sync locally via shared folder (same machine), git/PR, or bot OOB channel. Do not POST handoffs to AWC.",
  };
};
