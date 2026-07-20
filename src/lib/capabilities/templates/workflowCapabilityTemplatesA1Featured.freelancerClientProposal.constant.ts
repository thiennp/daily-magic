import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const FREELANCER_CLIENT_PROPOSAL_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "freelancer-client-proposal",
    "Freelance",
    "Freelancer client proposal",
    "Turn a client brief into a scoped proposal with timeline, pricing, and portfolio proof — send only after you approve.",
    "Draft a client proposal from projectBrief. Pull proof from portfolioFolderPath, respect budgetRange, avoid repeating pitches in proposalHistoryPath, and wait for my approval before I send.",
    [
      ["clientName", "Client or company name", "text"],
      ["projectBrief", "Project brief from the client", "textarea"],
      [
        "portfolioFolderPath",
        "Portfolio folder on your Mac (case studies, samples)",
        "project",
      ],
      ["budgetRange", "Budget range or rate target", "text"],
      [
        "proposalHistoryPath",
        "Proposal history file on your Mac (optional)",
        "text",
        false,
      ],
    ],
  );
