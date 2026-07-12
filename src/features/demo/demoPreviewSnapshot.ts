import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";

import type DemoPreviewSnapshot from "@/features/demo/types/DemoPreviewSnapshot.type";
import { demoAgentRuns } from "@/features/demo/mock/demoAgentRuns";
import { demoCapabilities } from "@/features/demo/mock/demoCapabilities";
import { demoDispatchGroups } from "@/features/demo/mock/demoDispatchGroups";
import { demoFeedbackItems } from "@/features/demo/mock/demoFeedbackItems";
import {
  demoGroups,
  demoMembers,
} from "@/features/demo/mock/demoGroupsAndMembers";
import {
  demoConnectedClients,
  demoOnboardingSteps,
} from "@/features/demo/mock/demoHomeExtras";
import { demoImprovementItems } from "@/features/demo/mock/demoImprovementItems";
import { demoUser } from "@/features/demo/mock/demoUser";

const demoGroup = demoDispatchGroups[0];
const demoMember = demoGroup.members[0];
const demoCapability = demoMember.capabilities[0];

export const demoPreviewSnapshot: DemoPreviewSnapshot = {
  user: demoUser,
  capabilities: demoCapabilities,
  dispatchGroups: demoDispatchGroups,
  feedbackItems: demoFeedbackItems,
  improvementItems: demoImprovementItems,
  agentRuns: demoAgentRuns,
  groups: [...demoGroups],
  membersByGroupId: {
    "group-demo-product": demoMembers,
    "group-demo-ops": [],
  },
  onboardingSteps: [...demoOnboardingSteps],
  connectedClients: [...demoConnectedClients],
  dispatchPolicyByGroupId: {
    "group-demo-product": DispatchPolicy.APPROVAL,
    "group-demo-ops": DispatchPolicy.OPEN,
  },
  agentComposer: {
    groupId: demoGroup.groupId,
    targetUserId: demoMember.userId,
    capabilityId: demoCapability.id,
    prompt:
      "Research competitors for our onboarding flow and list three differentiators.",
  },
};
