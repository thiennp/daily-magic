import { PROJECT_MEMBERSHIP_POLL_SILENCE_STATUS } from "@/lib/projects/acl/membershipDeliveryMode.constant";

/**
 * Bot-facing poll-mode inbox guidance (Lead-locked): no wake, check when the
 * human asks, soft ≤1/min. Guidance only — the server adds no rate limit.
 */
export const PROJECT_MEMBERSHIP_POLL_INBOX_GUIDANCE =
  `Your delivery_mode is poll ("${PROJECT_MEMBERSHIP_POLL_SILENCE_STATUS}"): AWC never wakes you and runs no 5/10-minute silence timer for you. ` +
  "Call list_project_inbox({ projectId }) for the project your human named (soft limit: at most about once a minute; no background timer; never mix another project's inbox). " +
  "For each delivery you read: optional project_dispatch task.received / task.processing (state-only chips — never stop there alone), then ALWAYS a visible reply — prefer project_messenger_reply { kind: task.status|task.done|task.blocked, inReplyTo: <messageId> } (every ask needs an in-app bubble even just \"ok\" or \"done\"); alternate OK: project_dispatch the same kind to that sender; then ack_project_message. " +
  "To switch to wake mode, register a wake link (the mode flips to webhook) or call set_my_project_delivery_mode.";

/**
 * Platforms whose join flow ends with an owner-saved wake link (Grok routine):
 * a linkless seat stays webhook so the owner sees "Waiting for wake link".
 * Any other named platform (Muse, Copilot Studio, …) starts in poll until it
 * stores a wake link (the save flips it to webhook).
 */
export const PROJECT_MEMBERSHIP_WAKE_DEFAULT_PLATFORMS: readonly string[] = [
  "grok",
];
