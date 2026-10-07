/**
 * Wake Non-Grok S4 contract (field name locked): project_memberships.delivery_mode.
 * - webhook: wake-link / existing 5m silence notify + 10m blocked delivery
 * - poll: no-wake / on-demand inbox — S5 skips silence timers; senders see
 *   "Checks in only when asked" (DF-036 Product EN; was "Checks on demand")
 * Restack S5 onto Wake S4 tip before Arch when S4 lands writers/flip-on-link.
 */
export const PROJECT_MEMBERSHIP_DELIVERY_MODES = ["webhook", "poll"] as const;

export type ProjectMembershipDeliveryMode =
  (typeof PROJECT_MEMBERSHIP_DELIVERY_MODES)[number];

export const PROJECT_MEMBERSHIP_DELIVERY_MODE_WEBHOOK = "webhook" as const;
export const PROJECT_MEMBERSHIP_DELIVERY_MODE_POLL = "poll" as const;
export const PROJECT_MEMBERSHIP_DELIVERY_MODE_DEFAULT =
  PROJECT_MEMBERSHIP_DELIVERY_MODE_WEBHOOK;

/** Lead-locked sender-facing silence/messenger honesty for poll-mode peers. */
export const PROJECT_MEMBERSHIP_POLL_SILENCE_STATUS = "Checks in only when asked";

export const isProjectMembershipPollDeliveryMode = (
  value: unknown,
): boolean => value === PROJECT_MEMBERSHIP_DELIVERY_MODE_POLL;

export const parseProjectMembershipDeliveryMode = (
  value: unknown,
): ProjectMembershipDeliveryMode =>
  value === PROJECT_MEMBERSHIP_DELIVERY_MODE_POLL
    ? PROJECT_MEMBERSHIP_DELIVERY_MODE_POLL
    : PROJECT_MEMBERSHIP_DELIVERY_MODE_WEBHOOK;
