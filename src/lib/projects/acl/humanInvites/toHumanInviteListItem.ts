import type HumanInviteRecord from "@/lib/projects/acl/humanInvites/types/HumanInviteRecord.type";

/** API list item — never includes raw token. */
export type HumanInviteListItem = {
  readonly inviteId: string;
  readonly role: string;
  readonly email: string | null;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly revokedAt: string | null;
  readonly maxUses: number;
  readonly usesRemaining: number;
};

export const toHumanInviteListItem = (
  invite: HumanInviteRecord,
): HumanInviteListItem => ({
  inviteId: invite.id,
  role: invite.role,
  email: invite.email,
  createdAt: invite.createdAt,
  expiresAt: invite.expiresAt,
  revokedAt: invite.revokedAt,
  maxUses: invite.maxUses,
  usesRemaining: invite.usesRemaining,
});
