import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { DOCUMENT_SUMMARY_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.documentSummary.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const WORKFLOW_CAPABILITY_TEMPLATES_A2: readonly WorkflowCapabilityTemplate[] =
  [
    buildWorkflowTemplate(
      "slack-thread-summary",
      "Communication",
      "Slack thread summary",
      "Summarize a long thread into decisions and next steps.",
      "Summarize the thread for someone who missed it. Include decisions and owners.",
      [
        ["thread", "Thread text", "textarea"],
        ["audience", "Audience", "text", false],
        ["goal", "What you need", "text"],
      ],
    ),
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
      "Structure a research question into a brief with sources.",
      "Write a research brief with key findings, open questions, and suggested next steps.",
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
      "Summarize commits on the branch for a standup update. Use plain English bullets for someone who did not read the diffs.",
      [
        ["repoPath", "Project folder on their Mac", "project"],
        ["branch", "Branch name", "text"],
        ["since", "Since (optional)", "text", false],
      ],
    ),
  ];
