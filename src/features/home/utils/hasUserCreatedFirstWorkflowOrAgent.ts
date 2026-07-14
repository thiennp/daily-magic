import isUserCreatedCapability from "@/lib/capabilities/isUserCreatedCapability";

interface OnboardingCapabilityShape {
  readonly type: string;
  readonly name: string;
}

const hasUserCreatedFirstWorkflowOrAgent = (
  capabilities: ReadonlyArray<OnboardingCapabilityShape>,
): boolean => capabilities.some(isUserCreatedCapability);

export default hasUserCreatedFirstWorkflowOrAgent;
