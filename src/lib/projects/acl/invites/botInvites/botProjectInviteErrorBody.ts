import type {
  BotProjectInviteCreateErrorCode,
  BotProjectInviteRateLimitScope,
  BotProjectInviteRedeemErrorCode,
} from "@/lib/projects/acl/invites/botInvites/botProjectInviteResult.type";

type BotInviteErrorCode =
  | BotProjectInviteCreateErrorCode
  | BotProjectInviteRedeemErrorCode;

const MESSAGES: Readonly<Record<BotInviteErrorCode, string>> = {
  not_found: "Project not found.",
  invalid: "Could not create the invite. Try again.",
  inviter_not_bot: "Only an assistant (bot) member can create a bot invite.",
  inviter_not_member: "You must be an active member of this project.",
  inviter_not_same_owner:
    "Your bot account is not claimed by this project's owner, so it cannot invite bots.",
  role_not_allowed: "Bot invites can only grant the member role.",
  scope_exceeds_inviter:
    "Requested scopes are outside your own member scopes. Bot invites never grant more.",
  bot_invite_redeemer_not_bot:
    "Only an assistant (bot) can redeem a bot-made invite.",
  bot_invite_not_same_owner:
    "This bot-made invite only works for bots claimed by the project owner. The code is now used up; ask the owner for an invite.",
  bot_invite_inviter_inactive:
    "The bot that made this invite is no longer an active member, so the invite is dead.",
  bot_invite_owner_changed:
    "This invite was made for a different project owner and is no longer valid.",
  bot_invite_scope_exceeds_inviter:
    "The inviting bot no longer holds the scopes this invite grants.",
};

export const isBotProjectInviteRedeemErrorCode = (
  code: string,
): code is BotProjectInviteRedeemErrorCode =>
  code.startsWith("bot_invite_") && code in MESSAGES;

export type BotProjectInviteErrorResponse = {
  readonly status: number;
  readonly body: Readonly<Record<string, unknown>>;
};

/**
 * Shared by the MCP tool and the REST route. `code` is the HTTP class the
 * invoke route already maps (forbidden → 403), `reason` the specific code.
 */
export const botProjectInviteErrorBody = (
  failure:
    | { readonly code: BotInviteErrorCode }
    | {
        readonly code: "rate_limited";
        readonly scope: BotProjectInviteRateLimitScope;
        readonly retryAfterSeconds: number;
      },
  nowMs: number = Date.now(),
): BotProjectInviteErrorResponse => {
  if ("scope" in failure) {
    const seconds = failure.retryAfterSeconds;
    return {
      status: 429,
      body: {
        ok: false,
        code: "rate_limited",
        reason: `bot_invite_rate_limited_${failure.scope}`,
        error: `Too many bot invites for this ${failure.scope === "inviter" ? "bot" : "project"}. Wait ${seconds}s before trying again.`,
        retryAfterSeconds: seconds,
        retryAfterAt: new Date(nowMs + seconds * 1000).toISOString(),
      },
    };
  }
  const code = failure.code;
  const httpCode =
    code === "not_found" ? "not_found" : code === "invalid" ? "invalid" : "forbidden";
  const status = code === "not_found" ? 404 : code === "invalid" ? 400 : 403;
  return {
    status,
    body: { ok: false, code: httpCode, reason: code, error: MESSAGES[code] },
  };
};
