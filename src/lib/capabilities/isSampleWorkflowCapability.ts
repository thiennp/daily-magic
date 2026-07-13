import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { SAMPLE_WORKFLOW_CAPABILITY_NAME } from "@/lib/capabilities/sampleWorkflowCapability.constant";

interface SampleWorkflowCapabilityShape {
  readonly type: string;
  readonly name: string;
}

const isSampleWorkflowCapability = (
  capability: SampleWorkflowCapabilityShape,
): boolean =>
  capability.type === CapabilityType.WORKFLOW &&
  capability.name === SAMPLE_WORKFLOW_CAPABILITY_NAME;

export default isSampleWorkflowCapability;
