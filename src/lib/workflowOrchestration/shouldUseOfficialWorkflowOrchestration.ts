import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { resolveTemplateIdFromHarnessSetSlug } from "@/lib/workflowOrchestration/resolveTemplateIdFromHarnessSetSlug";

export interface OfficialWorkflowOrchestrationCapabilityContext {
  readonly type: string;
  readonly harnessSetSlug?: string | null;
}

export const shouldUseOfficialWorkflowOrchestration = (
  capability: OfficialWorkflowOrchestrationCapabilityContext | null,
): boolean =>
  capability !== null &&
  capability.type === CapabilityType.WORKFLOW &&
  resolveTemplateIdFromHarnessSetSlug(capability.harnessSetSlug) !== null;
