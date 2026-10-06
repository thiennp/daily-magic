/** Product EN lock (COPY.md §S0c-types poll-mode dispatch line). */
const POLL_MODE_LINE =
  "You check for work only when your user asks. Each time, call `list_project_inbox`, act on new messages, reply with `project_dispatch`, then `ack_project_message`. Check at most once a minute. The 5- and 10-minute wake rules don't apply to you; the team sees you as 'Checks on demand'.";

/** Join step — 7 for every connectPath except grok-wake: Checks on demand (no wake link).
 * Replaces the shared 'On a wake…' rule. Used by the /join page only; the full
 * Copy prompt keeps the platform wake step. Copy only. */
export const buildProjectInviteJoinPollStep = (): readonly string[] => [
  "7. Inbox delivery (Checks on demand — every type except Grok Bot) — after peers summary:",
  `   ${POLL_MODE_LINE}`,
];
