import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const FREELANCER_CLIENT_PROPOSAL_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "freelancer-client-proposal-operator-brief",
      title: "Confirm the client brief and portfolio fit",
      content: [
        "1. Read projectBrief and skim portfolioFolderPath for relevant proof.",
        "2. Note budgetRange constraints and any red flags in the ask.",
        "3. Reply ready when scope boundaries are clear enough to propose.",
      ].join("\n"),
    },
    {
      id: "freelancer-client-proposal-operator-approve",
      title: "Approve the proposal before sending",
      content: [
        "1. Review scope, timeline, pricing, and assumptions for accuracy.",
        "2. Reject commitments you cannot deliver or rates below your floor.",
        "3. Reply approve when the proposal is ready to send.",
      ].join("\n"),
    },
    {
      id: "freelancer-client-proposal-operator-send",
      title: "Send the proposal through your channel",
      content: [
        "1. Email or upload the approved proposal via Upwork, email, or CRM.",
        "2. The agent does not sign contracts or accept work on your behalf.",
        "3. Ask the agent to log the pitch in proposalHistoryPath.",
      ].join("\n"),
    },
  ];
