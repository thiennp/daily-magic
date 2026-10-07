import { isCreatedInviteStillUsable } from "@/features/projects/access/invites/createdInvitePrompts";

/**
 * Keep the Copy-prompt banner while that invite is still in the usable list,
 * or was created moments ago (a stale in-flight poll can miss it — DF-014).
 */
export const shouldKeepCreatedInviteBanner = (input: {
  readonly createdInviteId: string | null;
  readonly invites: readonly { readonly inviteId: string }[];
  readonly createdAtMs?: number | null;
  readonly nowMs?: number;
}): boolean =>
  input.createdInviteId !== null &&
  isCreatedInviteStillUsable({
    inviteId: input.createdInviteId,
    createdAtMs: input.createdAtMs ?? null,
    invites: input.invites,
    nowMs: input.nowMs ?? Date.now(),
  });
