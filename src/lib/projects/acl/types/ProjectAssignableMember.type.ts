import type { AgentWitchLocalConnectVersionStatus } from "@/lib/agentWitch/types/AgentWitchLocalConnectVersionStatus.type";

/** Contract: bot or computer assignee / Team roster entry. */
export type ProjectAssignableMember =
  | {
      readonly memberKind: "bot";
      readonly membershipId: string;
      readonly projectDisplayName: string;
      readonly teamLabel: string | null;
      readonly isOwner: false;
      readonly assignable: true;
    }
  | {
      readonly memberKind: "computer";
      readonly membershipId: string;
      readonly projectDisplayName: string;
      readonly teamLabel: null;
      readonly isOwner: false;
      readonly deviceId: string;
      readonly ownerUserId: string;
      readonly ownerDisplayName: string | null;
      readonly isOnline: boolean;
      readonly isDispatchReady: boolean;
      readonly installBundleVersion: string | null;
      readonly connectVersionStatus: AgentWitchLocalConnectVersionStatus;
      readonly assignable: boolean;
    };
