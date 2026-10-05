import { isProjectMessageReadyForDeleteOnRead } from "@/lib/projects/acl/messaging/isProjectMessageReadyForDeleteOnRead";

type ReadAt = string | Date | null;

/** READ state predicate: read_at is set (row may still exist). */
export const isProjectMessageRead = (input: {
  readonly readAt: ReadAt;
}): boolean => input.readAt !== null;

/** Unread inbox filter: only rows not yet in READ are visible. */
export const isProjectMessageVisibleInUnreadInbox = (input: {
  readonly readAt: ReadAt;
}): boolean => !isProjectMessageRead(input);

/**
 * DOR readiness to leave READ toward cloud delete. Thin wrapper; the rules
 * stay in isProjectMessageReadyForDeleteOnRead (notices vs actionable).
 */
export const isProjectMessageReadyToLeaveRead = (input: {
  readonly readAt: ReadAt;
  readonly deliveryStates: readonly (string | null)[];
  readonly kind: string;
}): boolean =>
  isProjectMessageRead(input) && isProjectMessageReadyForDeleteOnRead(input);
