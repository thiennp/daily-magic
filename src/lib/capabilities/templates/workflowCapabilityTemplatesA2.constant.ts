import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { SLACK_THREAD_SUMMARY_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA2.slackThreadSummary.constant";
import { RESEARCH_BRIEF_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.researchBrief.exampleRequest";
import { TEAM_REPO_STANDUP_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.teamRepoStandup.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const WORKFLOW_CAPABILITY_TEMPLATES_A2: readonly WorkflowCapabilityTemplate[] =
  [
    SLACK_THREAD_SUMMARY_WORKFLOW,

    buildWorkflowTemplate(
      "document-summary",
      "Research",
      "Document summary",
      "Summarize pasted content with the focus you choose.",
      "Summarize the source. Highlight decisions, risks, and recommended actions.",
      [
        ["source", "Source text", "textarea"],
        ["length", "Length", "text"],
        ["focus", "Focus", "text"],
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
      "Ask a colleague's Mac to summarize git activity on a local repo branch — ideal for team delegation demos.",
      TEAM_REPO_STANDUP_EXAMPLE_REQUEST,
      [
        ["repoPath", "Project folder on their Mac", "project"],
        ["branch", "Branch name", "text"],
        ["since", "Since (optional)", "text", false],
      ],
    ),
  ];
