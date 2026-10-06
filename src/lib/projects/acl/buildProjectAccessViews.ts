import { loadUserProfilesByIds } from "@/lib/projects/acl/isAgentUser";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import type { AgentWitchLocalConnectVersionStatus } from "@/lib/agentWitch/types/AgentWitchLocalConnectVersionStatus.type";

/** UI-contract MembershipView (computer fields filled by enrich). */
export type MembershipView = {
  readonly id: string;
  readonly userId: string;
  readonly role: "owner" | "member" | "viewer";
  readonly memberKind: "human" | "bot" | "computer";
  readonly status: "active" | "revoked" | "naming_required";
  readonly teamLabel: string | null;
  readonly scopes: readonly string[];
  readonly projectDisplayName: string | null;
  readonly isAgent: boolean;
  readonly displayName: string | null;
  readonly email: string | null;
  readonly image: string | null;
  readonly createdAt: string;
  readonly revokedAt: string | null;
  readonly deviceId?: string | null;
  readonly ownerUserId?: string;
  readonly ownerDisplayName?: string | null;
  readonly isOnline?: boolean;
  readonly isDispatchReady?: boolean;
  readonly installBundleVersion?: string | null;
  readonly connectVersionStatus?: AgentWitchLocalConnectVersionStatus;
  readonly assignable?: boolean;
  /** Owner snapshot, active member bots only: false = waiting for wake link. */
  readonly wakeLinkSet?: boolean;
  /** Invite id prefix when admitted via invite auto-approve; else null/absent. */
  readonly autoApprovedViaInviteLabel?: string | null;
};

/** UI-contract PendingRequestView */
export type PendingRequestView = {
  readonly id: string;
  readonly requesterUserId: string;
  readonly requesterIsAgent: boolean;
  readonly requesterLabel: string | null;
  readonly requestedScopes: readonly string[];
  readonly teamLabel: string | null;
  readonly reason: string | null;
  readonly createdAt: string;
  readonly expiresAt: string | null;
  readonly suggestedProjectDisplayName: string | null;
};

export const buildMembershipViews = async (
  members: readonly ProjectMembershipRecord[],
): Promise<readonly MembershipView[]> => {
  const profiles = await loadUserProfilesByIds(members.map((m) => m.userId));
  return members.map((m) => {
    const profile = profiles.get(m.userId);
    return {
      id: m.id,
      userId: m.userId,
      role: m.role,
      memberKind: m.memberKind ?? "bot",
      status: m.status,
      teamLabel: m.teamLabel,
      scopes: [...m.scopes],
      projectDisplayName: m.projectDisplayName,
      isAgent: profile?.isAgent ?? false,
      displayName: profile?.name ?? null,
      email: profile?.email ?? null,
      image: profile?.image ?? null,
      createdAt: m.createdAt,
      revokedAt: m.revokedAt,
      deviceId: m.deviceId ?? null,
      autoApprovedViaInviteLabel: m.autoApprovedViaInviteLabel ?? null,
    };
  });
};

export const buildPendingRequestViews = async (
  pending: readonly ProjectAccessRequestRecord[],
): Promise<readonly PendingRequestView[]> => {
  const profiles = await loadUserProfilesByIds(
    pending.map((p) => p.requesterUserId),
  );
  return pending.map((p) => {
    const profile = profiles.get(p.requesterUserId);
    return {
      id: p.id,
      requesterUserId: p.requesterUserId,
      requesterIsAgent: profile?.isAgent ?? false,
      requesterLabel: profile?.name ?? null,
      requestedScopes: [...p.requestedScopes],
      teamLabel: p.teamLabel,
      reason: p.reason,
      createdAt: p.createdAt,
      expiresAt: p.expiresAt,
      suggestedProjectDisplayName: p.suggestedProjectDisplayName,
    };
  });
};
