/**
 * DF-023: addressee of a bot↔bot row shown to the project owner only.
 * Team-label sends carry toTeamLabel and no membership.
 */
export type ProjectMessengerPeerAddress = {
  readonly toMembershipId: string | null;
  readonly toDisplayName: string | null;
  readonly toTeamLabel: string | null;
};
