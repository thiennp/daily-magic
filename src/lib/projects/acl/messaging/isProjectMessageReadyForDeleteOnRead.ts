import { PROJECT_B2B_DELETE_ON_READ_TERMINAL_STATES } from "@/lib/projects/acl/messaging/projectMessageDeleteOnRead.constants";

const TERMINAL = new Set<string>(PROJECT_B2B_DELETE_ON_READ_TERMINAL_STATES);

/**
 * True when a delivery is unwatched (null state) or in a terminal silence state.
 */
export const isDeliveryReadyForDeleteOnRead = (
  b2bState: string | null,
): boolean => b2bState === null || TERMINAL.has(b2bState);

/**
 * Delete-on-read eligibility: already read, and every delivery is terminal or
 * unwatched. No deliveries counts as unwatched.
 */
export const isProjectMessageReadyForDeleteOnRead = (input: {
  readonly readAt: string | Date | null;
  readonly deliveryStates: readonly (string | null)[];
}): boolean => {
  if (input.readAt === null) {
    return false;
  }
  if (input.deliveryStates.length === 0) {
    return true;
  }
  return input.deliveryStates.every(isDeliveryReadyForDeleteOnRead);
};
