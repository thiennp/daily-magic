/**
 * DF-038 bot-made (member bot → same-owner bot) invite guardrails.
 *
 * Expiry 30 min: the inviting bot hands the code to a sibling bot on the same
 * owner account right away (seconds to minutes), so 30 min covers a slow
 * hand-off or a retry while keeping a leaked code's window small (claim codes
 * are 10 min, owner invites default to 7 days).
 */
export const BOT_PROJECT_INVITE_EXPIRES_MINUTES = 30;
/** Single-use, always (also pinned by the migration 112 CHECK). */
export const BOT_PROJECT_INVITE_MAX_USES = 1;
/** Rolling 1 h window (agent-access bucket helper). */
export const BOT_PROJECT_INVITE_PER_INVITER_PER_HOUR = 5;
export const BOT_PROJECT_INVITE_PER_PROJECT_PER_HOUR = 20;
export const BOT_PROJECT_INVITE_RATE_BUCKET = "bot_project_invite";
/** The only role a bot-made invite can grant. */
export const BOT_PROJECT_INVITE_ROLE = "member" as const;
export const CREATE_PROJECT_ASSISTANT_INVITE_TOOL_NAME =
  "create_project_assistant_invite" as const;
