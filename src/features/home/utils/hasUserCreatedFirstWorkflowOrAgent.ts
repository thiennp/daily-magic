import isUserCreatedCapability from "@/lib/capabilities/isUserCreatedCapability";
import { readOnboardingWorkflowCreated } from "@/features/home/utils/onboardingWorkflowCreatedStore";

interface OnboardingCapabilityShape {
  readonly type: string;
  readonly name: string;
}

const hasUserCreatedFirstWorkflowOrAgent = (
  capabilities: ReadonlyArray<OnboardingCapabilityShape>,
  dbWorkflowCreated = false,
): boolean =>
  dbWorkflowCreated ||
  readOnboardingWorkflowCreated() ||
  capabilities.some(isUserCreatedCapability);

export default hasUserCreatedFirstWorkflowOrAgent;
