import { PROJECT_MEMBERSHIP_POLL_SILENCE_STATUS } from "@/lib/projects/acl/membershipDeliveryMode.constant";

/**
 * Bot-facing poll-mode inbox guidance (Lead-locked): no wake, check when the
 * human asks, soft ≤1/min. Guidance only — the server adds no rate limit.
 */
export const PROJECT_MEMBERSHIP_POLL_INBOX_GUIDANCE =
  `Your delivery_mode is poll ("${PROJECT_MEMBERSHIP_POLL_SILENCE_STATUS}"): AWC never wakes you and runs no 5/10-minute silence timer for you. ` +
  "Call list_project_inbox to check when your human asks (soft limit: at most about once a minute; no background timer). " +
  "For each delivery you read: project_dispatch task.received, then task.done or task.blocked to that sender, then ack_project_message. " +
  "To switch to wake mode, register a wake link (the mode flips to webhook) or call set_my_project_delivery_mode.";

/** Copilot Studio wake support is unknown → start in poll (Lead S5). */
export const PROJECT_MEMBERSHIP_POLL_DEFAULT_PLATFORMS: readonly string[] = [
  "copilot_studio",
];
