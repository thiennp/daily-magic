import type {
  GroupItem,
  MemberItem,
} from "@/features/admin/types/groupManagement.types";
import type { DispatchTargetGroup } from "@/features/dispatch/hooks/useDispatchTargets";
import type ConnectedClient from "@/features/home/types/ConnectedClient.type";
import type { OnboardingStep } from "@/features/home/loadOnboardingSteps";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import type { CapabilityFeedbackInboxItem } from "@/lib/feedback/types/CapabilityFeedbackRecord.type";
import type { CapabilityImprovementInboxItem } from "@/lib/improvements/types/CapabilityImprovementRecord.type";
import type { GlobalRoleValue } from "@/lib/auth/roles";

export interface DemoAgentComposerPreview {
  readonly groupId: string;
  readonly targetUserId: string;
  readonly capabilityId: string;
  readonly prompt: string;
}

export default interface DemoPreviewSnapshot {
  readonly user: {
    readonly email: string;
    readonly name: string;
    readonly globalRole: GlobalRoleValue;
  };
  readonly capabilities: readonly PublishedCapabilityRecord[];
  readonly dispatchGroups: readonly DispatchTargetGroup[];
  readonly feedbackItems: readonly CapabilityFeedbackInboxItem[];
  readonly improvementItems: readonly CapabilityImprovementInboxItem[];
  readonly agentRuns: readonly EnrichedAgentRunRecord[];
  readonly groups: readonly GroupItem[];
  readonly membersByGroupId: Readonly<Record<string, readonly MemberItem[]>>;
  readonly onboardingSteps: readonly OnboardingStep[];
  readonly connectedClients: readonly ConnectedClient[];
  readonly dispatchPolicyByGroupId: Readonly<
    Record<string, DispatchPolicyValue>
  >;
  readonly agentComposer: DemoAgentComposerPreview;
}
