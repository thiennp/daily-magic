import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { MEETING_NOTES_ACTIONS_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.meetingNotesActions.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import { WORKFLOW_CAPABILITY_TEMPLATES_A1_FEATURED } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1Featured.constant";
import { WEEKLY_TEAM_STATUS_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1Featured.weeklyTeamStatus.constant";

export const WORKFLOW_CAPABILITY_TEMPLATES_A1: readonly WorkflowCapabilityTemplate[] =
  [
    ...WORKFLOW_CAPABILITY_TEMPLATES_A1_FEATURED,
    WEEKLY_TEAM_STATUS_WORKFLOW,
    buildWorkflowTemplate(
      "daily-standup",
      "Reporting",
      "Daily standup",
      "Capture yesterday, today, and blockers in standup format.",
      "Format this as a short standup update I can paste into chat.",
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
      "Summarize what shipped, what slipped, and what is next.",
      "Write a sprint recap for stakeholders. Keep it factual and action-oriented.",
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
    buildWorkflowTemplate(
      "one-on-one-prep",
      "Communication",
      "1:1 talking points",
      "Prepare a focused 1:1 agenda and feedback.",
      "Draft 1:1 talking points with prompts, feedback, and follow-ups.",
      [
        ["person", "Person", "text"],
        ["sinceLast", "Since last 1:1", "textarea", false],
        ["topics", "Topics to cover", "textarea"],
        ["feedback", "Feedback to share", "textarea", false],
      ],
    ),
  ];
