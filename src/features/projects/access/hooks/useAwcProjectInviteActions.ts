"use client";

import {
  createProjectInviteApi,
  renameMembershipDisplayNameApi,
  revokeProjectInviteApi,
} from "@/features/projects/access/utils/projectAccessApi";

export const useAwcProjectInviteActions = (input: {
  readonly projectId: string;
  readonly reload: () => Promise<void>;
  readonly setMessage: (message: string | null) => void;
  readonly setCreatedInviteUrl: (url: string | null) => void;
}) => {
  const createInvite = async () => {
    const result = await createProjectInviteApi(input.projectId, {});
    if (result.url) {
      input.setCreatedInviteUrl(result.url);
      input.setMessage("Invite created — copy the URL now.");
    } else {
      input.setMessage(result.errorMessage ?? "Failed to create invite.");
    }
    await input.reload();
  };

  const revokeInvite = async (inviteId: string) => {
    const result = await revokeProjectInviteApi(input.projectId, inviteId);
    input.setMessage(
      result.ok ? "Invite revoked." : (result.errorMessage ?? "Failed."),
    );
    await input.reload();
  };

  const renameMember = async (
    membershipId: string,
    projectDisplayName: string,
  ) => {
    const result = await renameMembershipDisplayNameApi(
      input.projectId,
      membershipId,
      projectDisplayName,
    );
    input.setMessage(
      result.ok ? "Renamed." : (result.errorMessage ?? "Failed."),
    );
    await input.reload();
    return result;
  };

  return { createInvite, revokeInvite, renameMember };
};
