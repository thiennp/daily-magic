import { isProjectMessageDeleteOnReadNoticeKind } from "@/lib/projects/acl/messaging/isProjectMessageDeleteOnReadNoticeKind";
import { PROJECT_B2B_DELETE_ON_READ_TERMINAL_STATES } from "@/lib/projects/acl/messaging/projectMessageDeleteOnRead.constants";

const TERMINAL = new Set<string>(PROJECT_B2B_DELETE_ON_READ_TERMINAL_STATES);

/**
 * True when a delivery is unwatched (null state) or in a terminal silence state.
 */
export const isDeliveryReadyForDeleteOnRead = (
  b2bState: string | null,
): boolean => b2bState === null || TERMINAL.has(b2bState);

/** True when every delivery is a terminal silence state (not merely unwatched). */
export const areDeliveriesTerminalForDeleteOnRead = (
  deliveryStates: readonly (string | null)[],
): boolean =>
  deliveryStates.length > 0 &&
  deliveryStates.every((s) => s !== null && TERMINAL.has(s));

/**
 * Delete-on-read eligibility once read_at is set.
 * Notices (peer.joined / peer.silent*): unwatched or terminal deliveries OK.
 * Actionable (task.*, owner/member): require terminal deliveries — listing alone
 * must not delete; explicit ack stays the path for unwatched actionable rows.
 */
export const isProjectMessageReadyForDeleteOnRead = (input: {
  readonly readAt: string | Date | null;
  readonly deliveryStates: readonly (string | null)[];
  readonly kind: string;
}): boolean => {
  if (input.readAt === null) {
    return false;
  }
  const unwatchedOrTerminal =
    input.deliveryStates.length === 0 ||
    input.deliveryStates.every(isDeliveryReadyForDeleteOnRead);
  if (!unwatchedOrTerminal) {
    return false;
  }
  if (isProjectMessageDeleteOnReadNoticeKind(input.kind)) {
    return true;
  }
  return areDeliveriesTerminalForDeleteOnRead(input.deliveryStates);
};
