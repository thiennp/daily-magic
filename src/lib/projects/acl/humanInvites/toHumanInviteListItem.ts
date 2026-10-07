import type HumanInviteRecord from "@/lib/projects/acl/humanInvites/types/HumanInviteRecord.type";

/** API list item — never includes raw token. */
export type HumanInviteListItem = {
  readonly inviteId: string;
  readonly role: string;
  readonly email: string | null;
  readonly requireEmailMatch: boolean;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly revokedAt: string | null;
  readonly maxUses: number;
  readonly usesRemaining: number;
  /** 108: pending | accepted (wants to join — owner Approve/Deny). */
  readonly status: string;
  readonly delivery: string;
  readonly requiresApproval: boolean;
  readonly emailSentAt: string | null;
  readonly acceptedAt: string | null;
  readonly acceptedDisplayName: string | null;
  /** Accepter's verified account email (owner-only; who the owner approves). */
  readonly acceptedByEmail: string | null;
};

export const toHumanInviteListItem = (
  invite: HumanInviteRecord,
): HumanInviteListItem => ({
  inviteId: invite.id,
  role: invite.role,
  email: invite.email,
  requireEmailMatch: invite.requireEmailMatch,
  createdAt: invite.createdAt,
  expiresAt: invite.expiresAt,
  revokedAt: invite.revokedAt,
  maxUses: invite.maxUses,
  usesRemaining: invite.usesRemaining,
  status: invite.status,
  delivery: invite.delivery,
  requiresApproval: invite.requiresApproval,
  emailSentAt: invite.emailSentAt,
  acceptedAt: invite.acceptedAt,
  acceptedDisplayName: invite.acceptedDisplayName,
  acceptedByEmail: invite.acceptedByEmail ?? null,
});
