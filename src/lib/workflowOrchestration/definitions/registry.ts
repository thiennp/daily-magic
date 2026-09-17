import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

import { OFFICIAL_WORKFLOW_DEFINITION as incidentPostmortem } from "@/lib/workflowOrchestration/definitions/incidentPostmortem.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as meetingNotesActions } from "@/lib/workflowOrchestration/definitions/meetingNotesActions.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as researchBrief } from "@/lib/workflowOrchestration/definitions/researchBrief.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as teamRepoStandup } from "@/lib/workflowOrchestration/definitions/teamRepoStandup.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as vibeCodingAppFeature } from "@/lib/workflowOrchestration/definitions/vibeCodingAppFeature.definition";

const CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS: Readonly<
  Record<string, OfficialWorkflowDefinition>
> = {
  "incident-postmortem": incidentPostmortem,
  "meeting-notes-actions": meetingNotesActions,
  "research-brief": researchBrief,
  "team-repo-standup": teamRepoStandup,
  "vibe-coding-app-feature": vibeCodingAppFeature,
};

export const findCustomOfficialWorkflowDefinitionByTemplateId = (
  templateId: string,
): OfficialWorkflowDefinition | undefined =>
  CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS[templateId];

export default CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS;
