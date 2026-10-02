import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";

/** UI-contract InviteListItem — never includes raw token. */
export type InviteListItem = {
  readonly inviteId: string;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly revokedAt: string | null;
  readonly maxUses: number;
  readonly usesRemaining: number;
  readonly teamLabel: string | null;
  readonly scopes: readonly string[];
};

export const toInviteListItem = (invite: ProjectInviteRecord): InviteListItem => ({
  inviteId: invite.id,
  createdAt: invite.createdAt,
  expiresAt: invite.expiresAt,
  revokedAt: invite.revokedAt,
  maxUses: invite.maxUses,
  usesRemaining: invite.usesRemaining,
  teamLabel: invite.teamLabel,
  scopes: [...invite.scopes],
});
