import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

/** First-connect framing: every bot that opens the guideline learns the product role. */
export const buildAgentWitchRoleGuidelineSection = (): {
  readonly heading: string;
  readonly body: readonly string[];
} => ({
  heading: `What ${AGENT_WITCH_PRODUCT_NAME} is`,
  body: [
    `${AGENT_WITCH_PRODUCT_NAME} is an agent-support playground: harness setup, memory and playbooks, Project Access ACL, and Prompt Optimizer tooling for scored, reusable prompts.`,
    `It is not a concrete ops executor. Do not treat it as Slack, Outlook, ticket queues, or day-to-day business workflow automation. Specialist bots keep those jobs.`,
    "Use it to install and shape how agents work on a Mac (harness, playbooks, reuse). Keep chat, mail, and ticket execution in those products.",
    "Agent Witch Cloud stays an ACL + registry (project name, folder refs, members, approve/revoke audit) — not a content bus for handoffs, run dumps, or skill bodies.",
  ],
});

export const AGENT_WITCH_ROLE_LIVE_GUIDE = {
  role: "agent_support_playground",
  includes: [
    "harness_setup",
    "memory_and_playbooks",
    "project_access_acl",
    "prompt_optimizer_token_efficiency_reliability",
  ],
  excludes: [
    "slack_ops_execution",
    "outlook_ops_execution",
    "ticket_queue_execution",
    "cloud_content_bus",
  ],
  summary:
    "Agent Witch is an agent-support playground (harness, memory/playbooks, Project Access ACL, Prompt Optimizer) — not Slack/Outlook/ticket ops execution, and not a cloud content bus.",
} as const;
