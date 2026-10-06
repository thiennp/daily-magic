"use client";

import { postProjectAccessAction } from "@/features/projects/access/utils/projectAccessApi";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

export const useAwcProjectAccessMutations = (input: {
  readonly projectId: string;
  readonly reload: () => Promise<void>;
  readonly setMessage: (value: string | null) => void;
}) => {
  const { projectId, reload, setMessage } = input;

  const approve = async (requestId: string, projectDisplayName?: string) => {
    const result = await postProjectAccessAction(
      `/api/projects/${projectId}/access/requests/${requestId}/approve`,
      projectDisplayName ? { projectDisplayName } : {},
    );
    setMessage(
      result.ok
        ? "Approved."
        : mapProjectAccessError(result.errorMessage, "Failed."),
    );
    await reload();
    return {
      ...result,
      errorMessage: result.ok
        ? result.errorMessage
        : mapProjectAccessError(result.errorMessage, "Failed."),
    };
  };

  const deny = async (requestId: string) => {
    const result = await postProjectAccessAction(
      `/api/projects/${projectId}/access/requests/${requestId}/deny`,
    );
    setMessage(
      result.ok
        ? "Denied."
        : mapProjectAccessError(result.errorMessage, "Failed."),
    );
    await reload();
    return result.ok;
  };

  const revoke = async (membershipId: string) => {
    const result = await postProjectAccessAction(
      `/api/projects/${projectId}/access/members/${membershipId}/revoke`,
    );
    setMessage(
      result.ok
        ? "Revoked."
        : mapProjectAccessError(result.errorMessage, "Failed."),
    );
    await reload();
  };

  return { approve, deny, revoke };
};
