import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";

export type InviteListStatus = "active" | "used_up" | "expired" | "revoked";

export const resolveInviteListStatus = (
  invite: AwcProjectAccessInvite,
  nowMs: number = Date.now(),
): InviteListStatus => {
  if (invite.revokedAt) {
    return "revoked";
  }
  if (invite.usesRemaining <= 0) {
    return "used_up";
  }
  const expiresAt = Date.parse(invite.expiresAt);
  if (!Number.isNaN(expiresAt) && expiresAt <= nowMs) {
    return "expired";
  }
  return "active";
};

export const isInviteStillUsable = (
  invite: AwcProjectAccessInvite,
  nowMs?: number,
): boolean => resolveInviteListStatus(invite, nowMs) === "active";
