/**
 * DF-023: addressee of an owner-view bot↔bot row (compact feed line). Sent as
 * the additive `peer` field on a timeline entry; absent on every other row.
 */
export type AwcMessengerPeerAddress = {
  readonly toMembershipId: string | null;
  readonly toDisplayName: string | null;
  readonly toTeamLabel: string | null;
};
