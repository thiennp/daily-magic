import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";

/** Create-time rejections (all 403 except not_found 404, rate_limited 429). */
export type BotProjectInviteCreateErrorCode =
  | "not_found"
  | "inviter_not_bot"
  | "inviter_not_member"
  | "inviter_not_same_owner"
  | "role_not_allowed"
  | "scope_exceeds_inviter"
  | "invalid";

/** Redeem-time rejections for a bot-made invite (no owner-Approve fallback). */
export type BotProjectInviteRedeemErrorCode =
  | "bot_invite_redeemer_not_bot"
  | "bot_invite_not_same_owner"
  | "bot_invite_inviter_inactive"
  | "bot_invite_owner_changed"
  | "bot_invite_scope_exceeds_inviter";

export type BotProjectInviteRateLimitScope = "inviter" | "project";

export type CreateBotProjectInviteResult =
  | {
      readonly ok: true;
      readonly invite: ProjectInviteRecord;
      readonly token: string;
      readonly url: string;
    }
  | { readonly ok: false; readonly code: BotProjectInviteCreateErrorCode }
  | {
      readonly ok: false;
      readonly code: "rate_limited";
      readonly scope: BotProjectInviteRateLimitScope;
      readonly retryAfterSeconds: number;
    };
