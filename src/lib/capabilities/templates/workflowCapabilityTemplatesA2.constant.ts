import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { DOCUMENT_SUMMARY_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.documentSummary.exampleRequest";
import { RESEARCH_BRIEF_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.researchBrief.exampleRequest";
import { SLACK_THREAD_SUMMARY_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA2.slackThreadSummary.constant";
import { TEAM_REPO_STANDUP_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.teamRepoStandup.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const WORKFLOW_CAPABILITY_TEMPLATES_A2: readonly WorkflowCapabilityTemplate[] =
  [
    SLACK_THREAD_SUMMARY_WORKFLOW,
    buildWorkflowTemplate(
      "document-summary",
      "Research",
      "Document summary",
      "Summarize pasted content with the length and focus you choose — clarify gaps, then get decisions, risks, and actions.",
      DOCUMENT_SUMMARY_EXAMPLE_REQUEST,
      [
        ["source", "Source text", "textarea"],
        ["length", "Length (short, medium, or long)", "text"],
        ["focus", "Focus (what matters most to the reader)", "text"],
      ],
    ),
    buildWorkflowTemplate(
      "research-brief",
      "Research",
      "Research brief",
      "Turn a research question into a structured brief — clarify scope, triangulate sources, then review before you share.",
      RESEARCH_BRIEF_EXAMPLE_REQUEST,
      [
        ["topic", "Topic", "text"],
        ["audience", "Audience", "text"],
        ["questions", "Questions to answer", "textarea"],
        ["sources", "Sources (optional)", "textarea", false],
      ],
    ),
    buildWorkflowTemplate(
      "team-repo-standup",
      "Team dispatch",
      "Repo branch standup (teammate Mac)",
      "Ask a colleague's Mac to summarize git activity on a local repo branch when you need a standup update without cloning locally.",
      TEAM_REPO_STANDUP_EXAMPLE_REQUEST,
      [
        ["repoPath", "Project folder on their Mac", "project"],
        ["branch", "Branch name", "text"],
        ["since", "Since (optional)", "text", false],
      ],
    ),
  ];
