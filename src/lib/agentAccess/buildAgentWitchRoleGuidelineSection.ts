import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

/** First-connect framing: every bot that opens the guideline learns the product role. */
export const buildAgentWitchRoleGuidelineSection = (): {
  readonly heading: string;
  readonly body: readonly string[];
} => ({
  heading: `What ${AGENT_WITCH_PRODUCT_NAME} is`,
  body: [
    `${AGENT_WITCH_PRODUCT_NAME} is an agent-support playground: harness setup, memory and playbooks, and Prompt Optimizer tooling for token efficiency and reliability.`,
    `It is not a concrete ops executor. Do not treat it as Slack, Outlook, ticket queues, or day-to-day business workflow automation.`,
    "Use it to install and shape how agents work on a Mac (harness, playbooks, reuse). Keep chat, mail, and ticket execution in those products.",
  ],
});

export const AGENT_WITCH_ROLE_LIVE_GUIDE = {
  role: "agent_support_playground",
  includes: [
    "harness_setup",
    "memory_and_playbooks",
    "prompt_optimizer_token_efficiency_reliability",
  ],
  excludes: [
    "slack_ops_execution",
    "outlook_ops_execution",
    "ticket_queue_execution",
  ],
  summary:
    "Agent Witch is an agent-support playground (harness, memory/playbooks, Prompt Optimizer) — not Slack/Outlook/ticket ops execution.",
} as const;
