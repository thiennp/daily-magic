import type { PendingApprovalCardMeta } from "@/lib/projects/acl/approvalCard/PendingApprovalCardMeta.type";

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
  /** Coding tools on this computer; all offline when the computer is. */
  readonly agents?: readonly {
    readonly writerAgent: string;
    readonly label: string;
    readonly isOnline: boolean;
  }[];
  readonly installBundleVersion?: string | null;
  readonly connectVersionStatus?: "ok" | "too_old" | string;
  readonly assignable?: boolean;
  /** Owner snapshot, active member bots only: false = waiting for wake link. */
  readonly wakeLinkSet?: boolean;
  /** Invite id prefix when admitted via invite auto-approve; else null/absent. */
  readonly autoApprovedViaInviteLabel?: string | null;
  /** webhook = wakes up on its own; poll = Checks on demand. Absent → webhook. */
  readonly deliveryMode?: "webhook" | "poll" | string;
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
  /** Pending assistants only: a wake link is pre-registered and carries over on Approve. */
  readonly wakeLinkSet?: boolean;
  /** Non-Grok S3 owner card (assistants only); absent on older servers. */
  readonly approvalCard?: PendingApprovalCardMeta | null;
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
  /** 107: Copy can fetch the prompt from the server (any device). */
  readonly copyAvailable?: boolean;
};
