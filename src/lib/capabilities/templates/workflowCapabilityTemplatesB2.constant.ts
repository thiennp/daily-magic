import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const WORKFLOW_CAPABILITY_TEMPLATES_B2: readonly WorkflowCapabilityTemplate[] =
  [
    buildWorkflowTemplate(
      "customer-reply-draft",
      "Sales & CS",
      "Customer reply draft",
      "Draft a support reply grounded in context and policy.",
      "Draft a helpful customer reply. Be empathetic, accurate, and actionable.",
      [
        ["customerMessage", "Customer message", "textarea"],
        ["policyContext", "Policy / context", "textarea", false],
        ["tone", "Tone", "text", false],
      ],
    ),
    buildWorkflowTemplate(
      "incident-postmortem",
      "Engineering",
      "Incident postmortem draft",
      "Structure timeline, impact, and follow-ups after an incident.",
      "Draft an incident postmortem with timeline, impact, root cause, and action items.",
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
      "proposal-outline",
      "Consulting",
      "Proposal / scope outline",
      "Turn client goals into a scoped proposal outline.",
      "Draft a proposal outline with goals, deliverables, assumptions, and timeline.",
      [
        ["client", "Client", "text"],
        ["goal", "Goal", "textarea"],
        ["constraints", "Constraints", "textarea", false],
        ["deliverables", "Deliverables", "textarea"],
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
  ];
