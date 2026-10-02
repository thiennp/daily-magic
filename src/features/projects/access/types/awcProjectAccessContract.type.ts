/** Locked Product binding — see docs/project-bot-invite-hooks-ui-contract.md */

export type AwcInviteCreateRequest = {
  readonly teamLabel?: string | null;
  readonly scopes?: readonly string[];
  readonly maxUses?: number;
  readonly expiresInDays?: number;
};

export type AwcInviteCreateResponse = {
  readonly inviteId: string;
  readonly url: string;
  readonly expiresAt: string;
  readonly maxUses: number;
  readonly usesRemaining: number;
  readonly teamLabel: string | null;
  readonly scopes: readonly string[];
};

export type AwcInviteListItem = {
  readonly inviteId: string;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly revokedAt: string | null;
  readonly maxUses: number;
  readonly usesRemaining: number;
  readonly teamLabel: string | null;
  readonly scopes: readonly string[];
};

export type AwcDisplayNamePresetsResponse = {
  readonly presets: readonly string[];
  readonly available: readonly string[];
  readonly suggested: string;
};

export type AwcMembershipView = {
  readonly id: string;
  readonly userId: string;
  readonly role: "owner" | "member";
  readonly status: "active" | "revoked" | "naming_required";
  readonly teamLabel: string | null;
  readonly scopes: readonly string[];
  readonly projectDisplayName: string | null;
  readonly isAgent: boolean;
  readonly displayName?: string | null;
  readonly email?: string | null;
  readonly image?: string | null;
  readonly createdAt: string;
  readonly revokedAt: string | null;
};

export type AwcPendingRequestView = {
  readonly id: string;
  readonly requesterUserId: string;
  readonly requesterIsAgent: boolean;
  readonly requesterLabel?: string | null;
  readonly requestedScopes: readonly string[];
  readonly teamLabel: string | null;
  readonly reason: string | null;
  readonly createdAt: string;
  readonly expiresAt: string | null;
};

export type AwcAccessAction = "approve" | "deny" | "revoke";

export type AwcPatchAccessBody = {
  readonly requestId: string;
  readonly action: AwcAccessAction;
  readonly projectDisplayName?: string;
  readonly teamLabel?: string | null;
  readonly scopes?: readonly string[];
};

export type AwcAccessActionResult =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly status: number;
      readonly errorMessage: string;
      readonly code?: "name_taken" | "name_invalid" | "name_reserved" | "other";
    };
