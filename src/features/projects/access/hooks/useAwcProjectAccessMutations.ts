import { postProjectAccessAction } from "@/features/projects/access/utils/projectAccessApi";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

export const createAwcProjectAccessMutations = (input: {
  readonly projectId: string;
  readonly reload: () => Promise<void>;
  readonly setFriendlyMessage: (value: string | null) => void;
}) => {
  const approve = async (requestId: string, projectDisplayName?: string) => {
    const result = await postProjectAccessAction(
      `/api/projects/${input.projectId}/access/requests/${requestId}/approve`,
      projectDisplayName ? { projectDisplayName } : {},
    );
    input.setFriendlyMessage(
      result.ok
        ? "Approved."
        : mapProjectAccessError(result.errorMessage, "Failed."),
    );
    await input.reload();
    return {
      ...result,
      errorMessage: result.ok
        ? result.errorMessage
        : mapProjectAccessError(result.errorMessage, "Failed."),
    };
  };

  const deny = async (requestId: string) => {
    const result = await postProjectAccessAction(
      `/api/projects/${input.projectId}/access/requests/${requestId}/deny`,
    );
    input.setFriendlyMessage(
      result.ok
        ? "Denied."
        : mapProjectAccessError(result.errorMessage, "Failed."),
    );
    await input.reload();
  };

  const revoke = async (membershipId: string) => {
    const result = await postProjectAccessAction(
      `/api/projects/${input.projectId}/access/members/${membershipId}/revoke`,
    );
    input.setFriendlyMessage(
      result.ok
        ? "Revoked."
        : mapProjectAccessError(result.errorMessage, "Failed."),
    );
    await input.reload();
  };

  return { approve, deny, revoke };
};
