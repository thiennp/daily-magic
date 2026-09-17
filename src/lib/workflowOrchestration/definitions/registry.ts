import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

import { OFFICIAL_WORKFLOW_DEFINITION as interviewDebrief } from "@/lib/workflowOrchestration/definitions/interviewDebrief.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as meetingNotesActions } from "@/lib/workflowOrchestration/definitions/meetingNotesActions.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as prSummary } from "@/lib/workflowOrchestration/definitions/prSummary.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as researchBrief } from "@/lib/workflowOrchestration/definitions/researchBrief.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as slackThreadSummary } from "@/lib/workflowOrchestration/definitions/slackThreadSummary.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as teamRepoStandup } from "@/lib/workflowOrchestration/definitions/teamRepoStandup.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as vibeCodingAppFeature } from "@/lib/workflowOrchestration/definitions/vibeCodingAppFeature.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as weeklyTeamStatus } from "@/lib/workflowOrchestration/definitions/weeklyTeamStatus.definition";

const CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS: Readonly<
  Record<string, OfficialWorkflowDefinition>
> = {
  "interview-debrief": interviewDebrief,
  "meeting-notes-actions": meetingNotesActions,
  "pr-summary": prSummary,
  "research-brief": researchBrief,
  "slack-thread-summary": slackThreadSummary,
  "team-repo-standup": teamRepoStandup,
  "vibe-coding-app-feature": vibeCodingAppFeature,
  "weekly-team-status": weeklyTeamStatus,
};

export const findCustomOfficialWorkflowDefinitionByTemplateId = (
  templateId: string,
): OfficialWorkflowDefinition | undefined =>
  CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS[templateId];

export default CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS;
