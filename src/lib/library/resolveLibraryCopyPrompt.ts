import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { buildWorkflowPrompt } from "@/lib/workflows/buildWorkflowPrompt";

export function resolveLibraryCopyPrompt(
  capability: PublishedCapabilityRecord,
): string {
  if (
    capability.type === CapabilityType.AGENT &&
    capability.exampleRequest.length > 0
  ) {
    return capability.exampleRequest;
  }

  if (capability.type === CapabilityType.WORKFLOW) {
    return buildWorkflowPrompt(
      capability.name,
      capability.workflowFields,
      {},
      capability.exampleRequest,
    );
  }

  return capability.description;
}
