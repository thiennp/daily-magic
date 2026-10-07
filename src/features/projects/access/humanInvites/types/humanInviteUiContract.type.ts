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
  /** 108: pending | accepted (Wants to join — owner Approve/Deny). */
  readonly status?: "pending" | "accepted" | string;
  readonly delivery?: "link" | "email" | string;
  readonly requiresApproval?: boolean;
  readonly emailSentAt?: string | null;
  readonly acceptedAt?: string | null;
  readonly acceptedDisplayName?: string | null;
  /** Accepter's verified account email — the identity the owner approves. */
  readonly acceptedByEmail?: string | null;
};

/** POST /api/projects/{projectId}/human-invites/email body (DF-025). */
export type SendHumanInviteEmailBody = {
  readonly email: string;
  readonly role?: HumanInviteRole;
  readonly requireEmailMatch?: boolean;
  /** Default true server-side: invitee waits for owner Approve. */
  readonly requiresApproval?: boolean;
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

export type {
  AcceptHumanInviteBody,
  AcceptHumanInviteResponse,
  AcceptHumanInviteNamingErrorCode,
  AcceptHumanInviteEmailErrorCode,
  AcceptHumanInviteErrorCode,
  AcceptHumanInviteFailure,
} from "@/features/projects/access/humanInvites/types/humanInviteAcceptContract.type";

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
