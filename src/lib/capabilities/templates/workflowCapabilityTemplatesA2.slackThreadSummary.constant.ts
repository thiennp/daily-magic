import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { SLACK_THREAD_SUMMARY_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.slackThreadSummary.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const SLACK_THREAD_SUMMARY_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "slack-thread-summary",
    "Communication",
    "Slack thread summary",
    "Turn a long Slack thread into a late-joiner summary — clarify ambiguities, then TL;DR, decisions, owners, and open questions you approve before posting.",
    SLACK_THREAD_SUMMARY_EXAMPLE_REQUEST,
    [
      ["thread", "Thread text", "textarea"],
      ["audience", "Audience (optional)", "text", false],
      ["goal", "What the reader needs", "text"],
    ],
  );
