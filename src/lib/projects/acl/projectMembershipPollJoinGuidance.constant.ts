/** Locked EN — COPY.md no_wake.bot_poll_guidance (bot-facing). */
export const PROJECT_MEMBERSHIP_POLL_JOIN_GUIDANCE_LINE =
  "Check the inbox when your human asks. Soft limit: at most 1 check per minute.";

/** Lead-locked — last sentence of PROJECT_MEMBERSHIP_POLL_INBOX_GUIDANCE (Wake S5). */
export const PROJECT_MEMBERSHIP_POLL_JOIN_SWITCH_LINE =
  "To switch to wake mode, register a wake link (the mode flips to webhook) or call set_my_project_delivery_mode.";

/** Both locked lines, in order: the Checks on demand guidance for a poll join. */
export const PROJECT_MEMBERSHIP_POLL_JOIN_GUIDANCE = `${PROJECT_MEMBERSHIP_POLL_JOIN_GUIDANCE_LINE} ${PROJECT_MEMBERSHIP_POLL_JOIN_SWITCH_LINE}`;
