import isDefaultAgentCapability from "@/lib/capabilities/isDefaultAgentCapability";
import isSampleWorkflowCapability from "@/lib/capabilities/isSampleWorkflowCapability";

interface UserCreatedCapabilityShape {
  readonly type: string;
  readonly name: string;
}

const isUserCreatedCapability = (
  capability: UserCreatedCapabilityShape,
): boolean =>
  !isSampleWorkflowCapability(capability) &&
  !isDefaultAgentCapability(capability);

export default isUserCreatedCapability;
