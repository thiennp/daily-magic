import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { DEFAULT_AGENT_CAPABILITY_NAME } from "@/lib/capabilities/defaultAgentCapability.constant";

interface DefaultAgentCapabilityShape {
  readonly type: string;
  readonly name: string;
}

const isDefaultAgentCapability = (
  capability: DefaultAgentCapabilityShape,
): boolean =>
  capability.type === CapabilityType.AGENT &&
  capability.name === DEFAULT_AGENT_CAPABILITY_NAME;

export default isDefaultAgentCapability;
