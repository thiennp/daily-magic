import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const WORKFLOW_CAPABILITY_TEMPLATES_A1: readonly WorkflowCapabilityTemplate[] =
  [
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
      "Convert messy notes into decisions and action items.",
      "Produce meeting notes with decisions, owners, and action items.",
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
