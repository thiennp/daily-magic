import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { DAILY_STANDUP_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.dailyStandup.exampleRequest";
import { MEETING_NOTES_ACTIONS_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.meetingNotesActions.exampleRequest";
import { SPRINT_RECAP_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.sprintRecap.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import { ONE_ON_ONE_PREP_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1Featured.oneOnOnePrep.constant";
import { WEEKLY_TEAM_STATUS_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1Featured.weeklyTeamStatus.constant";
import { WORKFLOW_CAPABILITY_TEMPLATES_A1_FEATURED } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1Featured.constant";

export const WORKFLOW_CAPABILITY_TEMPLATES_A1: readonly WorkflowCapabilityTemplate[] =
  [
    ...WORKFLOW_CAPABILITY_TEMPLATES_A1_FEATURED,
    WEEKLY_TEAM_STATUS_WORKFLOW,
    buildWorkflowTemplate(
      "daily-standup",
      "Reporting",
      "Daily standup",
      "Turn rough notes into a crisp Yesterday / Today / Blockers post you can paste into async chat.",
      DAILY_STANDUP_EXAMPLE_REQUEST,
      [
        ["yesterday", "Yesterday", "textarea"],
        ["today", "Today", "textarea"],
        ["blockers", "Blockers", "textarea", false],
      ],
    ),
    buildWorkflowTemplate(
      "sprint-recap",
      "Reporting",
      "Sprint recap",
      "Turn sprint notes into a stakeholder-ready recap — shipped outcomes, deferrals with reasons, and up to three next-sprint priorities.",
      SPRINT_RECAP_EXAMPLE_REQUEST,
      [
        ["sprintName", "Sprint name", "text"],
        ["shipped", "Shipped", "textarea"],
        ["missed", "Missed or deferred", "textarea", false],
        ["nextFocus", "Next sprint focus", "textarea"],
      ],
    ),
    buildWorkflowTemplate(
      "meeting-notes-actions",
      "Communication",
      "Meeting notes → actions",
      "Turn messy notes into decisions and an action table with owners — clarify gaps, correct the draft, then share.",
      MEETING_NOTES_ACTIONS_EXAMPLE_REQUEST,
      [
        ["meetingTitle", "Meeting title", "text"],
        ["attendees", "Attendees", "text", false],
        ["notes", "Raw notes", "textarea"],
      ],
    ),
    ONE_ON_ONE_PREP_WORKFLOW,
  ];
