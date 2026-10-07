"use client";

import {
  createProjectInviteApi,
  renameMembershipDisplayNameApi,
  revokeProjectInviteApi,
  updateProjectInviteAutoApproveApi,
} from "@/features/projects/access/utils/projectAccessApi";
import { AWC_PROJECT_INVITE_AUTO_APPROVE_COPY } from "@/features/projects/access/invites/awcProjectInviteAutoApproveCopy.constant";
import { joinTypeIdForInvitePlatform } from "@/features/projects/access/invites/awcProjectInviteAddAssistantTypes";
import type { ProjectInvitePlatform } from "@/features/projects/access/invites/projectInvitePlatform.type";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

export const useAwcProjectInviteActions = (input: {
  readonly projectId: string;
  readonly reload: () => Promise<void>;
  readonly setMessage: (message: string | null) => void;
  readonly setCreatedInviteUrl: (url: string | null) => void;
  readonly setCreatedInviteToken: (token: string | null) => void;
  /** Writes inviteId and platform in one state update (success only). */
  readonly setCreatedInviteId: (
    inviteId: string | null,
    platform: ProjectInvitePlatform | null,
    joinTypeId?: string | null,
  ) => void;
  /** DF-014: keep the created prompt so the pending row can Copy again. */
  readonly rememberCreatedInvite?: (prompt: {
    readonly inviteId: string;
    readonly url: string;
    readonly token: string | null;
    readonly platform: ProjectInvitePlatform | null;
    readonly joinTypeId: string | null;
  }) => void;
  /** Drop a cancelled invite's prompt right away. */
  readonly forgetCreatedInvite?: (inviteId: string) => void;
}) => {
  /** platform null = any assistant: the invite stores no platform; the assistant names its type at join. */
  const createInvite = async (
    platform: ProjectInvitePlatform | null = "grok",
    autoApprove = false,
    joinTypeId: string | null = joinTypeIdForInvitePlatform(platform),
  ) => {
    const result = await createProjectInviteApi(input.projectId, {
      autoApprove: autoApprove === true,
      ...(platform === null ? {} : { platform }),
    });
    if (result.url) {
      const token =
        typeof result.token === "string" && result.token.length > 0
          ? result.token
          : null;
      const inviteId =
        typeof result.inviteId === "string" && result.inviteId.length > 0
          ? result.inviteId
          : null;
      input.setCreatedInviteUrl(result.url);
      input.setCreatedInviteToken(token);
      input.setCreatedInviteId(inviteId, platform, joinTypeId);
      if (inviteId !== null) {
        input.rememberCreatedInvite?.({
          inviteId,
          url: result.url,
          token,
          platform,
          joinTypeId,
        });
      }
      input.setMessage("Invite created — copy the link or prompt now.");
    } else {
      input.setMessage(
        mapProjectAccessError(result.errorMessage, "Failed to create invite."),
      );
    }
    await input.reload();
  };

  const revokeInvite = async (inviteId: string) => {
    const result = await revokeProjectInviteApi(input.projectId, inviteId);
    if (result.ok) {
      input.forgetCreatedInvite?.(inviteId);
    }
    input.setMessage(
      result.ok
        ? "Invite revoked."
        : mapProjectAccessError(result.errorMessage, "Failed."),
    );
    await input.reload();
  };

  const turnOffAutoApprove = async (inviteId: string) => {
    const result = await updateProjectInviteAutoApproveApi(
      input.projectId,
      inviteId,
      false,
    );
    input.setMessage(
      result.ok
        ? AWC_PROJECT_INVITE_AUTO_APPROVE_COPY.turnOffToast
        : mapProjectAccessError(result.errorMessage, "Failed."),
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
    const errorMessage = result.ok
      ? undefined
      : mapProjectAccessError(result.errorMessage, "Failed.");
    input.setMessage(result.ok ? "Renamed." : (errorMessage ?? "Failed."));
    await input.reload();
    return { ok: result.ok, errorMessage };
  };

  return { createInvite, revokeInvite, turnOffAutoApprove, renameMember };
};
