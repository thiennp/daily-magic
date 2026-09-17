import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

import { OFFICIAL_WORKFLOW_DEFINITION as freelancerClientProposal } from "@/lib/workflowOrchestration/definitions/freelancerClientProposal.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as vibeCodingAppFeature } from "@/lib/workflowOrchestration/definitions/vibeCodingAppFeature.definition";

const CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS: Readonly<
  Record<string, OfficialWorkflowDefinition>
> = {
  "freelancer-client-proposal": freelancerClientProposal,
  "vibe-coding-app-feature": vibeCodingAppFeature,
};

export const findCustomOfficialWorkflowDefinitionByTemplateId = (
  templateId: string,
): OfficialWorkflowDefinition | undefined =>
  CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS[templateId];

export default CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS;
