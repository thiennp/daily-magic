import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

import { OFFICIAL_WORKFLOW_DEFINITION as tenantSupportReply } from "@/lib/workflowOrchestration/definitions/tenantSupportReply.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as vibeCodingAppFeature } from "@/lib/workflowOrchestration/definitions/vibeCodingAppFeature.definition";

const CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS: Readonly<
  Record<string, OfficialWorkflowDefinition>
> = {
  "tenant-support-reply": tenantSupportReply,
  "vibe-coding-app-feature": vibeCodingAppFeature,
};

export const findCustomOfficialWorkflowDefinitionByTemplateId = (
  templateId: string,
): OfficialWorkflowDefinition | undefined =>
  CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS[templateId];

export default CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS;
