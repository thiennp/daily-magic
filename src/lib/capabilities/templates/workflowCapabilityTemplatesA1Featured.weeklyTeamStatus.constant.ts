import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { WEEKLY_TEAM_STATUS_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.weeklyTeamStatus.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const WEEKLY_TEAM_STATUS_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "weekly-team-status",
    "Reporting",
    "Weekly team status",
    "Turn highlights and blockers into a polished team update leaders can scan in under a minute — you share it after you approve the draft.",
    WEEKLY_TEAM_STATUS_EXAMPLE_REQUEST,
    [
      ["weekOf", "Week of", "text"],
      ["highlights", "Highlights", "textarea"],
      ["blockers", "Blockers (optional)", "textarea", false],
    ],
  );
