import { PROJECT_MEMBERSHIP_POLL_SILENCE_STATUS } from "@/lib/projects/acl/membershipDeliveryMode.constant";

/**
 * Owner Access "How it gets messages" control (Product EN, S5).
 * webhook = "Wakes up on its own"; poll = "Checks on demand". `{name}` = nickname.
 */
export const AWC_DELIVERY_MODE_COPY = {
  label: "How it gets messages",
  optionWebhook: "Wakes up on its own",
  optionPoll: PROJECT_MEMBERSHIP_POLL_SILENCE_STATUS,
  webhookNeedsLink: "Needs a wake link. Add one to switch.",
  addWakeLink: "Add wake link",
  toastPoll:
    "{name} now checks on demand. It reads messages when its person asks.",
  toastWebhook: "{name} now wakes up on its own.",
  /** Appended to the wake-link saved toast when the save flipped poll → webhook. */
  toastSavedAutoFlipSuffix: " It now wakes up on its own.",
  error: "Could not switch how it gets messages. Try again.",
} as const;
