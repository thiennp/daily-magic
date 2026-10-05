/**
 * UI-facing types aligned to S0 API contract
 * (`feat/awc-human-member-invites-s0`, tip 68761257…; box:
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
  readonly expiresInDays?: number;
};

/** POST create → 201 */
export type CreateHumanInviteResponse = {
  readonly inviteId: string;
  readonly url: string;
  readonly token: string;
  readonly role: HumanInviteRole | string;
  readonly email: string | null;
  readonly expiresAt: string;
  readonly maxUses: number;
  readonly usesRemaining: number;
};

/** POST /api/invite/h/{token}/accept → 200 */
export type AcceptHumanInviteResponse = {
  readonly ok: true;
  readonly projectId: string;
  readonly membershipId: string;
  readonly role: HumanInviteRole | string;
  readonly status: string;
};

/** Accept error codes from S0 (envelope: ok:false, code, errorMessage). */
export type AcceptHumanInviteErrorCode =
  | "already_owner"
  | "already_member"
  | "expired"
  | "revoked"
  | "already_redeemed"
  | "invalid_token";

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
