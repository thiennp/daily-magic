import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

interface WorkflowCapabilityShape {
  readonly type: string;
  readonly status: string;
}

const shouldSeedSampleWorkflow = (input: {
  readonly capabilities: ReadonlyArray<WorkflowCapabilityShape>;
  readonly archivedSampleExists: boolean;
}): boolean => {
  const hasActiveWorkflow = input.capabilities.some(
    (capability) =>
      capability.type === CapabilityType.WORKFLOW &&
      capability.status !== CapabilityStatus.ARCHIVED,
  );

  if (hasActiveWorkflow || input.archivedSampleExists) {
    return false;
  }

  return true;
};

export default shouldSeedSampleWorkflow;
