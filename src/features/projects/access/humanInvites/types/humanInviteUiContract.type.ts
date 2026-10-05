/**
 * UI-facing types aligned to S0 API contract
 * (S0 live on main `c00a989b`; box:
 * `/workspace/awc-human-invites-s0-api-contract.md`).
 * Stub/stories only — do not invent fields beyond the contract.
 */

export type HumanInviteRole = "member" | "viewer";

/** Invite FSA states (decideHumanInviteTransition). */
export type HumanInviteState = "pending" | "accepted" | "revoked" | "expired";

/** Membership FSA states (decideHumanMembershipTransition). */
export type HumanMembershipState = "none" | "active" | "removed";

/** GET /api/projects/{projectId}/human-invites → invites[] item */
export type HumanInviteListItem = {
  readonly inviteId: string;
  readonly role: HumanInviteRole | string;
  readonly email: string | null;
  /** true = only the invited email may accept (open link when false). */
  readonly requireEmailMatch: boolean;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly revokedAt: string | null;
  readonly maxUses: number;
  readonly usesRemaining: number;
};

/** POST /api/projects/{projectId}/human-invites body */
export type CreateHumanInviteBody = {
  readonly role?: HumanInviteRole;
  readonly email?: string | null;
  /** When true, email is required (server 400 EMAIL_REQUIRED_FOR_LOCK). */
  readonly requireEmailMatch?: boolean;
  readonly expiresInDays?: number;
};

/** POST create → 201 */
export type CreateHumanInviteResponse = {
  readonly inviteId: string;
  readonly url: string;
  readonly token: string;
  readonly role: HumanInviteRole | string;
  readonly email: string | null;
  readonly requireEmailMatch?: boolean;
  readonly expiresAt: string;
  readonly maxUses: number;
  readonly usesRemaining: number;
};

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

/** POST .../human-members/{membershipId}/remove → 200 */
export type RemoveHumanMemberResponse = {
  readonly ok: true;
  readonly membershipId: string;
  readonly status: "revoked";
};

/** Joined human row for People list (access payload; memberKind=human). */
export type HumanJoinedMemberRow = {
  readonly membershipId: string;
  readonly userId: string;
  readonly email: string | null;
  readonly displayName: string | null;
  readonly role: "owner" | HumanInviteRole | string;
  readonly memberKind: "human";
  /** Membership FSA: active | removed (list shows active only). */
  readonly membershipState: Extract<HumanMembershipState, "active">;
  readonly joinedAt: string | null;
};
