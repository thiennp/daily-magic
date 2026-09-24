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
] as const;

export const AGENT_ACCESS_MCP_PROTOCOL_VERSION = "2025-03-26";

export const AGENT_ACCESS_PROMPT_MAX_LENGTH = 8000;

export const AGENT_ACCESS_DISPLAY_NAME_MAX_LENGTH = 80;
