export const AGENT_ACCESS_TOKEN_PREFIX = "aw_";

export const AGENT_ACCESS_EMAIL_DOMAIN = "agents.agentwitch.com";

export const AGENT_ACCESS_REGISTRATION_METHODS = ["none", "agentmail"] as const;

export type AgentAccessRegistrationMethod =
  (typeof AGENT_ACCESS_REGISTRATION_METHODS)[number];

export const AGENT_ACCESS_RATE_LIMIT_PER_HOUR = 8;

export const AGENT_ACCESS_GLOBAL_REGISTRATIONS_PER_HOUR = 60;

export const AGENT_ACCESS_POSTS_PER_HOUR = 240;

export const AGENT_ACCESS_TOOL_CALLS_PER_HOUR = 120;

export const AGENT_ACCESS_MUTATIONS_PER_HOUR = 20;

export const AGENT_ACCESS_FEEDBACK_PER_HOUR = 10;

/** Rolling window for the agent-access attempt buckets (post / tool / mutate). */
export const AGENT_ACCESS_RATE_LIMIT_WINDOW_SECONDS = 3600;

/**
 * Inbox drain tools skip the per-token tool + mutate buckets (DF-026): a bot
 * must always be able to list and ack its own inbox, or rate limits turn into
 * redelivery loops. Both are scoped to the caller's own deliveries, ack is
 * idempotent, and the pre-auth per-IP POST bucket still applies.
 */
export const AGENT_ACCESS_RATE_LIMIT_EXEMPT_TOOLS = [
  "list_project_inbox",
  "ack_project_message",
] as const;

export const AGENT_ACCESS_MAX_OPEN_RUNS = 3;

export const AGENT_ACCESS_MAX_WORKFLOWS = 20;

export const AGENT_ACCESS_BODY_MAX_BYTES = 32_768;

export const AGENT_ACCESS_GLOBAL_SUBJECT = "global";

export const AGENT_ACCESS_MUTATING_TOOLS = [
  "send_task",
  "run_workflow",
  "create_workflow",
  "install_harness",
  "get_install_command",
  "request_project_access",
  "redeem_project_invite",
  "rotate_project_api_key",
  "register_project_webhook",
  "mint_allow_claim",
  "issue_bot_claim_code",
] as const;

export const AGENT_ACCESS_PROMPT_MAX_LENGTH = 8000;

export const AGENT_ACCESS_DISPLAY_NAME_MAX_LENGTH = 80;
