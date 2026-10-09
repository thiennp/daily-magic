import type { ProjectMembershipDeliveryMode } from "@/lib/projects/acl/membershipDeliveryMode.constant";
import type { ComputerAgentView } from "@/lib/agentWitch/deviceWriters";
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
  /** Coding tools on this computer; offline whenever the computer is. */
  readonly agents?: readonly ComputerAgentView[];
  readonly installBundleVersion?: string | null;
  readonly connectVersionStatus?: AgentWitchLocalConnectVersionStatus;
  readonly assignable?: boolean;
  /** Owner snapshot, active member bots only: false = waiting for wake link. */
  readonly wakeLinkSet?: boolean;
  /** Invite id prefix when admitted via invite auto-approve; else null/absent. */
  readonly autoApprovedViaInviteLabel?: string | null;
  /** webhook = wakes up on its own; poll = Checks on demand (no wake). */
  readonly deliveryMode?: ProjectMembershipDeliveryMode;
  readonly invitedByUserId?: string | null;
  readonly isolatedFromOtherBots?: boolean;
  readonly closedToOthers?: boolean;
  readonly guidanceSeenVersion?: number | null;
  /** Assistants only: the viewer may block/unblock it and send it new guidance. */
  readonly canManageBot?: boolean;
  /** Assistants only: it has not fetched the newest guidance yet. */
  readonly guidanceOutdated?: boolean;
  /** Claim feature (assistants only; see decorateBotClaim). */
  readonly canClaimBot?: boolean;
  readonly canChangeInviter?: boolean;
  readonly inviterChoices?: readonly {
    readonly userId: string;
    readonly label: string;
    readonly isYou: boolean;
  }[];
};
