/** Keep the Copy-prompt banner only while that invite is still in the usable list. */
export const shouldKeepCreatedInviteBanner = (input: {
  readonly createdInviteId: string | null;
  readonly invites: readonly { readonly inviteId: string }[];
}): boolean =>
  input.createdInviteId !== null &&
  input.invites.some((invite) => invite.inviteId === input.createdInviteId);
