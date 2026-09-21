import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

import { OFFICIAL_WORKFLOW_DEFINITION as bugReportWriter } from "@/lib/workflowOrchestration/definitions/bugReportWriter.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as compareOptions } from "@/lib/workflowOrchestration/definitions/compareOptions.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as competitorSnapshot } from "@/lib/workflowOrchestration/definitions/competitorSnapshot.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as dailyStandup } from "@/lib/workflowOrchestration/definitions/dailyStandup.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as documentSummary } from "@/lib/workflowOrchestration/definitions/documentSummary.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as contractSummarizer } from "@/lib/workflowOrchestration/definitions/contractSummarizer.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as freelancerClientProposal } from "@/lib/workflowOrchestration/definitions/freelancerClientProposal.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as incidentPostmortem } from "@/lib/workflowOrchestration/definitions/incidentPostmortem.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as interviewDebrief } from "@/lib/workflowOrchestration/definitions/interviewDebrief.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as jobApplicationPack } from "@/lib/workflowOrchestration/definitions/jobApplicationPack.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as localBusinessGooglePost } from "@/lib/workflowOrchestration/definitions/localBusinessGooglePost.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as meetingNotesActions } from "@/lib/workflowOrchestration/definitions/meetingNotesActions.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as oneOnOnePrep } from "@/lib/workflowOrchestration/definitions/oneOnOnePrep.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as personalWeeklyReview } from "@/lib/workflowOrchestration/definitions/personalWeeklyReview.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as prSummary } from "@/lib/workflowOrchestration/definitions/prSummary.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as releaseNotesDraft } from "@/lib/workflowOrchestration/definitions/releaseNotesDraft.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as researchBrief } from "@/lib/workflowOrchestration/definitions/researchBrief.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as shopOrderSupport } from "@/lib/workflowOrchestration/definitions/shopOrderSupport.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as slackThreadSummary } from "@/lib/workflowOrchestration/definitions/slackThreadSummary.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as sprintRecap } from "@/lib/workflowOrchestration/definitions/sprintRecap.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as teacherLessonPlan } from "@/lib/workflowOrchestration/definitions/teacherLessonPlan.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as teamRepoStandup } from "@/lib/workflowOrchestration/definitions/teamRepoStandup.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as tenantSupportReply } from "@/lib/workflowOrchestration/definitions/tenantSupportReply.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as tiktokSeriesEpisode } from "@/lib/workflowOrchestration/definitions/tiktokSeriesEpisode.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as travelPlanner } from "@/lib/workflowOrchestration/definitions/travelPlanner.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as vibeCodingAppFeature } from "@/lib/workflowOrchestration/definitions/vibeCodingAppFeature.definition";
import { OFFICIAL_WORKFLOW_DEFINITION as weeklyTeamStatus } from "@/lib/workflowOrchestration/definitions/weeklyTeamStatus.definition";

const CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS: Readonly<
  Record<string, OfficialWorkflowDefinition>
> = {
  "bug-report-writer": bugReportWriter,
  "compare-options": compareOptions,
  "competitor-snapshot": competitorSnapshot,
  "daily-standup": dailyStandup,
  "document-summary": documentSummary,
  "contract-summarizer": contractSummarizer,
  "freelancer-client-proposal": freelancerClientProposal,
  "incident-postmortem": incidentPostmortem,
  "interview-debrief": interviewDebrief,
  "job-application-pack": jobApplicationPack,
  "local-business-google-post": localBusinessGooglePost,
  "meeting-notes-actions": meetingNotesActions,
  "one-on-one-prep": oneOnOnePrep,
  "personal-weekly-review": personalWeeklyReview,
  "pr-summary": prSummary,
  "release-notes-draft": releaseNotesDraft,
  "research-brief": researchBrief,
  "shop-order-support": shopOrderSupport,
  "slack-thread-summary": slackThreadSummary,
  "sprint-recap": sprintRecap,
  "teacher-lesson-plan": teacherLessonPlan,
  "team-repo-standup": teamRepoStandup,
  "tenant-support-reply": tenantSupportReply,
  "tiktok-series-episode": tiktokSeriesEpisode,
  "travel-planner": travelPlanner,
  "vibe-coding-app-feature": vibeCodingAppFeature,
  "weekly-team-status": weeklyTeamStatus,
};

export const findCustomOfficialWorkflowDefinitionByTemplateId = (
  templateId: string,
): OfficialWorkflowDefinition | undefined =>
  CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS[templateId];

export default CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS;
