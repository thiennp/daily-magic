import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const TENANT_SUPPORT_REPLY_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "tenant-support-reply-operator-context",
      title: "Read the tenant message and lease notes",
      content: [
        "1. Open the tenant thread described in tenantMessage.",
        "2. Read leaseNotesPath for policies, deposits, and repair responsibilities.",
        "3. Reply ready when issueType and facts are clear.",
      ].join("\n"),
    },
    {
      id: "tenant-support-reply-operator-approve",
      title: "Approve the reply before sending",
      content: [
        "1. Review tone, legal boundaries, and next steps for the tenant.",
        "2. Reject admissions of liability or promises outside your policy.",
        "3. Reply approve when the reply is ready to send.",
      ].join("\n"),
    },
    {
      id: "tenant-support-reply-operator-send",
      title: "Send through your property portal",
      content: [
        "1. Paste the approved reply into email, AppFolio, or your tenant portal.",
        "2. The agent does not access building keys or schedule vendors alone.",
        "3. Ask the agent to log the thread in tenantLogPath.",
      ].join("\n"),
    },
  ];
