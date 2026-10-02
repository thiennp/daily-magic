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
};
