import type { HumanInviteRole } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

/** POST /api/invite/h/{token}/accept body (same rules as bot redeem nickname). */
export type AcceptHumanInviteBody = {
  readonly suggestedProjectDisplayName?: string;
};

/** POST /api/invite/h/{token}/accept → 200 */
export type AcceptHumanInviteResponse = {
  readonly ok: true;
  readonly projectId: string;
  readonly membershipId: string;
  readonly role: HumanInviteRole | string;
  readonly status: string;
  readonly projectDisplayName: string;
  /** 108: accepted, waiting for owner Approve (membershipId empty). */
  readonly awaitingApproval?: boolean;
};

/**
 * Accept naming errors (invite NOT consumed — retry with a new nickname).
 * 409 TAKEN · 400 INVALID / REQUIRED · 422 RESERVED.
 * Body: { ok:false, code, errorMessage, suggestedProjectDisplayName }.
 */
export type AcceptHumanInviteNamingErrorCode =
  | "DISPLAY_NAME_TAKEN"
  | "INVALID_DISPLAY_NAME"
  | "DISPLAY_NAME_RESERVED"
  | "DISPLAY_NAME_REQUIRED";

/** Accept error codes from S0 (envelope: ok:false, code, errorMessage). */
export type AcceptHumanInviteEmailErrorCode =
  | "INVITE_EMAIL_MISMATCH"
  | "INVITE_EMAIL_UNVERIFIED"
  | "EMAIL_REQUIRED_FOR_LOCK";

export type AcceptHumanInviteErrorCode =
  | "already_owner"
  | "already_member"
  | "expired"
  | "revoked"
  | "already_redeemed"
  | "invalid_token"
  | AcceptHumanInviteNamingErrorCode
  | AcceptHumanInviteEmailErrorCode;

/** Non-2xx accept result from acceptHumanInviteApi. */
export type AcceptHumanInviteFailure = {
  readonly ok: false;
  readonly status: number;
  readonly code?: string;
  readonly errorMessage?: string;
  /** Present on naming errors; prefill the nickname input for retry. */
  readonly suggestedProjectDisplayName?: string | null;
  /** Present on INVITE_EMAIL_MISMATCH (invite stays usable). */
  readonly invitedEmailMasked?: string | null;
};
