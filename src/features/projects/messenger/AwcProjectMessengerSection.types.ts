export type AwcProjectMessengerSectionProps = {
  readonly projectId: string;
  /** False → browser chat copy is long-term (no trim) + (i) hint. */
  readonly hasOwnerComputer: boolean;
  /** Overview attention / hash deep-link into a bot thread (membershipId or "whole"). */
  readonly initialThreadKey?: string | null;
  /** Parent tab badge: refresh after open/send marks read or changes unread. */
  readonly onUnreadMaybeChanged?: () => void;
  /** Owner-only Clear all bar; non-owners fetch nothing. */
  readonly isOwner?: boolean;
  /** P1-S4a: the opening feed's unread count before it is marked read (New marker). */
  readonly initialUnreadCount?: number;
};
