export default interface HumanInviteEmailContent {
  readonly inviterName: string;
  readonly projectName: string;
  readonly roleLabel: string;
  /** Accept-page link carrying the one-time token. Never log it. */
  readonly url: string;
  readonly expiresInDays: number;
  readonly requiresApproval: boolean;
}
