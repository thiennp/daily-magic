/** How the assistant first connects. device-code (S1) slots in later by editing a type module. */
export type ProjectInviteJoinConnectPath =
  "grok-wake" | "mcp-bearer" | "rest-register" | "device-code" | "poll";

/** How the assistant gets project messages: wake link (webhook) or Checks on demand (poll). */
export type ProjectInviteJoinDeliveryMode = "webhook" | "poll";

/**
 * One bot type on the public /join page. One module per type under joinTypes/.
 * `steps` holds only this type's own lines; the page appends the shared join
 * steps (connect, redeem, inbox delivery) from buildProjectInviteJoinSections.
 */
export type ProjectInviteJoinType = {
  readonly id: string;
  readonly label: string;
  /** How an assistant recognises itself: product names, runtime hints. */
  readonly match: readonly string[];
  readonly deliveryMode: ProjectInviteJoinDeliveryMode;
  readonly connectPath: ProjectInviteJoinConnectPath;
  readonly steps: readonly string[];
  readonly note?: string;
};
