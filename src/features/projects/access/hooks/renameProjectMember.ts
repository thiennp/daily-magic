import { renameMembershipDisplayNameApi } from "@/features/projects/access/utils/projectAccessApi";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

/** Owner renames a member's project nickname; toasts the result and reloads. */
export const renameProjectMember =
  (input: {
    readonly projectId: string;
    readonly reload: () => Promise<void>;
    readonly setMessage: (message: string | null) => void;
  }) =>
  async (membershipId: string, projectDisplayName: string) => {
    const result = await renameMembershipDisplayNameApi(
      input.projectId,
      membershipId,
      projectDisplayName,
    );
    const errorMessage = result.ok
      ? undefined
      : mapProjectAccessError(result.errorMessage, "Failed.");
    input.setMessage(result.ok ? "Renamed." : (errorMessage ?? "Failed."));
    await input.reload();
    return { ok: result.ok, errorMessage };
  };
