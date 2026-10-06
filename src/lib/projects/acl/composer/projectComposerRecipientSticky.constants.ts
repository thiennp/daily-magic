/**
 * Server sticky for the one-window composer recipient chip.
 * Persist only while checked; DELETE when unchecked / one-shot / leave.
 * Leave/clear notice kind lives in projectMessage.constants
 * (PROJECT_MESSAGE_KIND_COMPOSER_RECIPIENT_STICKY_CLEARED).
 */

export const PROJECT_COMPOSER_RECIPIENT_STICKY_MODES = ["all", "membership"] as const;

export type ProjectComposerRecipientStickyMode =
  (typeof PROJECT_COMPOSER_RECIPIENT_STICKY_MODES)[number];

/** Active assignee kinds sticky mode=membership may target. */
export const PROJECT_COMPOSER_RECIPIENT_STICKY_MEMBER_KINDS = [
  "bot",
  "computer",
] as const;
