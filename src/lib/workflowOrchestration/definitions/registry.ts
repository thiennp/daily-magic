import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

import { OFFICIAL_WORKFLOW_DEFINITION as meetingNotesActions } from "@/lib/workflowOrchestration/definitions/meetingNotesActions.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as researchBrief } from "@/lib/workflowOrchestration/definitions/researchBrief.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as vibeCodingAppFeature } from "@/lib/workflowOrchestration/definitions/vibeCodingAppFeature.definition";

const CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS: Readonly<
  Record<string, OfficialWorkflowDefinition>
> = {
  "meeting-notes-actions": meetingNotesActions,
  "research-brief": researchBrief,
  "vibe-coding-app-feature": vibeCodingAppFeature,
};

export const findCustomOfficialWorkflowDefinitionByTemplateId = (
  templateId: string,
): OfficialWorkflowDefinition | undefined =>
  CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS[templateId];

export default CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS;
