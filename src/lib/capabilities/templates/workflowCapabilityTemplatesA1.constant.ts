import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { DAILY_STANDUP_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.dailyStandup.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import { ONE_ON_ONE_PREP_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1Featured.oneOnOnePrep.constant";
import { WORKFLOW_CAPABILITY_TEMPLATES_A1_FEATURED } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1Featured.constant";

export const WORKFLOW_CAPABILITY_TEMPLATES_A1: readonly WorkflowCapabilityTemplate[] =
  [
    ...WORKFLOW_CAPABILITY_TEMPLATES_A1_FEATURED,
    buildWorkflowTemplate(
      "weekly-team-status",
      "Reporting",
      "Weekly team status",
      "Turn highlights and blockers into a polished team update.",
      "Write a concise team status update with bullets. Lead with outcomes and call out blockers clearly.",
      [
        ["weekOf", "Week of", "text"],
        ["highlights", "Highlights", "textarea"],
        ["blockers", "Blockers (optional)", "textarea", false],
      ],
    ),
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
      [
        "Write a sprint recap for stakeholders. Keep it factual and action-oriented.",
        "",
        "## Normalize inputs",
        "Align shipped to sprintName. Tag each deferral with scope, risk, or dependency. Ask only what is missing.",
        "",
        "## Draft recap",
        "Sections: Shipped (outcomes first) / Deferred (one line each, no blame) / Next focus (max three priorities).",
      ].join("\n"),
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
      "Convert messy notes into decisions and action items.",
      "Produce meeting notes with decisions, owners, and action items.",
      [
        ["meetingTitle", "Meeting title", "text"],
        ["attendees", "Attendees", "text", false],
        ["notes", "Raw notes", "textarea"],
      ],
    ),
    ONE_ON_ONE_PREP_WORKFLOW,
  ];
