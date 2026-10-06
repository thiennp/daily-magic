export type AccessMembershipView = {
  readonly id: string;
  readonly userId: string;
  readonly teamLabel: string | null;
  readonly scopes: readonly string[];
  readonly createdAt: string;
  readonly projectDisplayName: string | null;
  readonly isAgent: boolean;
  readonly status?: string;
  readonly role?: string;
  /** S0 may omit; UI stubs !isAgent when absent. */
  readonly memberKind?: "human" | "bot" | "computer" | string;
  readonly email?: string | null;
  readonly displayName?: string | null;
  /** memberKind=computer only (Mac access contract); `id` is the membership id. */
  readonly deviceId?: string | null;
  readonly ownerUserId?: string;
  readonly ownerDisplayName?: string | null;
  readonly isOnline?: boolean;
  readonly isDispatchReady?: boolean;
  readonly installBundleVersion?: string | null;
  readonly connectVersionStatus?: "ok" | "too_old" | string;
  readonly assignable?: boolean;
  /** Owner snapshot, active member bots only: false = waiting for wake link. */
  readonly wakeLinkSet?: boolean;
  /** Invite id prefix when admitted via invite auto-approve; else null/absent. */
  readonly autoApprovedViaInviteLabel?: string | null;
};

export type AccessPendingView = {
  readonly id: string;
  readonly requesterUserId: string;
  readonly reason: string | null;
  readonly createdAt: string;
  readonly requesterIsAgent?: boolean;
  readonly requesterLabel?: string | null;
  readonly teamLabel?: string | null;
  readonly requestedScopes?: readonly string[];
  readonly expiresAt?: string | null;
  readonly suggestedProjectDisplayName?: string | null;
};

export type InviteListItem = {
  readonly inviteId: string;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly revokedAt: string | null;
  readonly maxUses: number;
  readonly usesRemaining: number;
  readonly teamLabel: string | null;
  readonly scopes: readonly string[];
  readonly autoApprove: boolean;
};
