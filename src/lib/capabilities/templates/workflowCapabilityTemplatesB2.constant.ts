import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { CONTRACT_SUMMARIZER_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.contractSummarizer.exampleRequest";
import { INCIDENT_POSTMORTEM_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.incidentPostmortem.exampleRequest";
import { TRAVEL_PLANNER_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.travelPlanner.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const WORKFLOW_CAPABILITY_TEMPLATES_B2: readonly WorkflowCapabilityTemplate[] =
  [
    buildWorkflowTemplate(
      "incident-postmortem",
      "Engineering",
      "Incident postmortem draft",
      "Turn rough incident notes into a blameless postmortem with timeline, impact, root cause, and owned follow-ups.",
      INCIDENT_POSTMORTEM_EXAMPLE_REQUEST,
      [
        ["timeline", "Timeline", "textarea"],
        ["impact", "Impact", "textarea"],
        ["rootCause", "Root cause hypothesis", "textarea"],
        ["followUps", "Follow-ups", "textarea"],
      ],
    ),
    buildWorkflowTemplate(
      "interview-debrief",
      "HR",
      "Interview debrief",
      "Capture signal and a hire/no-hire lean after interviews.",
      "Write an interview debrief with strengths, concerns, and recommendation.",
      [
        ["candidate", "Candidate", "text"],
        ["role", "Role", "text"],
        ["strengths", "Strengths", "textarea"],
        ["concerns", "Concerns", "textarea", false],
      ],
    ),
    buildWorkflowTemplate(
      "personal-weekly-review",
      "Personal",
      "Personal weekly review",
      "Reflect on wins, lessons, and priorities for next week.",
      "Write a personal weekly review that is honest, brief, and forward-looking.",
      [
        ["weekOf", "Week of", "text"],
        ["wins", "Wins", "textarea"],
        ["lessons", "Lessons", "textarea", false],
        ["priorities", "Priorities next week", "textarea"],
      ],
    ),
    buildWorkflowTemplate(
      "contract-summarizer",
      "Legal & Ops",
      "Contract summarizer",
      "Summarize pasted agreements with obligations, dates, and risks — with review before you share.",
      CONTRACT_SUMMARIZER_EXAMPLE_REQUEST,
      [
        ["contractText", "Contract text", "textarea"],
        ["focusAreas", "Focus areas (optional)", "textarea", false],
        ["signingDeadline", "Signing deadline (optional)", "text", false],
      ],
    ),
    buildWorkflowTemplate(
      "travel-planner",
      "Personal",
      "Travel planner",
      "Build a day-by-day itinerary from your dates, budget, and preferences.",
      TRAVEL_PLANNER_EXAMPLE_REQUEST,
      [
        ["destination", "Destination", "text"],
        ["travelDates", "Travel dates", "text"],
        ["budget", "Budget", "text"],
        ["preferences", "Preferences (optional)", "textarea", false],
      ],
    ),
  ];
