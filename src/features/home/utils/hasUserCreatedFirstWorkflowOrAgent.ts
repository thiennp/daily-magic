import { DEFAULT_AGENT_CAPABILITY_NAME } from "@/lib/capabilities/defaultAgentCapability.constant";
import isSampleWorkflowCapability from "@/lib/capabilities/isSampleWorkflowCapability";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

interface OnboardingCapabilityShape {
  readonly type: string;
  readonly name: string;
}

const hasUserCreatedFirstWorkflowOrAgent = (
  capabilities: ReadonlyArray<OnboardingCapabilityShape>,
): boolean =>
  capabilities.some(
    (capability) =>
      !isSampleWorkflowCapability(capability) &&
      (capability.type === CapabilityType.WORKFLOW ||
        (capability.type === CapabilityType.AGENT &&
          capability.name !== DEFAULT_AGENT_CAPABILITY_NAME)),
  );

export default hasUserCreatedFirstWorkflowOrAgent;
