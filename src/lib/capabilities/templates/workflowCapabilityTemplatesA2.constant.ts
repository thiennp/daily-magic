import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
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
      "Structure a research question into a brief with sources.",
      "Write a research brief with key findings, open questions, and suggested next steps.",
      [
        ["topic", "Topic", "text"],
        ["audience", "Audience", "text"],
        ["questions", "Questions to answer", "textarea"],
        ["sources", "Sources (optional)", "textarea", false],
      ],
    ),
  ];
