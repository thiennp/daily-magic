import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const JOB_APPLICATION_PACK_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "job-application-pack",
    "Career",
    "Job application pack",
    "Tailor resume bullets and a cover letter to a specific job using your real files — submit only after you approve every claim.",
    "Build a job application pack from the workflow inputs. Read resumeFolderPath and the job posting, map evidence to requirements, draft a cover letter, and wait for my approval before I submit.",
    [
      ["targetRole", "Target role title", "text"],
      ["companyName", "Company name", "text"],
      ["jobPostingUrl", "Job posting URL", "text"],
      ["jobDescription", "Job description (paste if no URL)", "textarea"],
      ["resumeFolderPath", "Resume and CV folder on your Mac", "project"],
      [
        "applicationHistoryPath",
        "Application log file (optional)",
        "text",
        false,
      ],
    ],
  );
