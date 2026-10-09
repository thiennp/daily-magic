import { AWC_LOCAL_WAKE_RECEIVER_CLAUSE } from "@/lib/agentAccess/awcLocalWakeReceiverCopy.constant";

/** Poll-mode dispatch line (COPY.md §S0c-types). Thien 2026-10-09: no wake link → auto-poll every 60s, not only on user request. */
const POLL_MODE_LINE =
  "You have no wake link, so poll automatically: right after you are approved, then every 60 seconds (use your host's loop or scheduler; if it has none, check at the start of every user turn). Each time, call `list_project_inbox`, act on new messages, reply with `project_dispatch`, then `ack_project_message`. Check at most once a minute. The 5- and 10-minute wake rules don't apply to you; the team sees you as 'Checks on demand'.";

/** Join step — 7 for every connectPath except grok-wake: Checks on demand (no wake link).
 * Replaces the shared 'On a wake…' rule. Used by the /join page only; the full
 * Copy prompt keeps the platform wake step. Copy only. */
export const buildProjectInviteJoinPollStep = (): readonly string[] => [
  "7. Inbox delivery (Checks on demand — every type except Grok Bot) — after peers summary:",
  `   ${POLL_MODE_LINE}`,
  `   ${AWC_LOCAL_WAKE_RECEIVER_CLAUSE} Keep polling until the receiver is running.`,
];
