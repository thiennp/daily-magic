export const AGENT_ACCESS_TOKEN_PREFIX = "aw_";

export const AGENT_ACCESS_EMAIL_DOMAIN = "agents.agentwitch.com";

export const AGENT_ACCESS_REGISTRATION_METHODS = ["none", "agentmail"] as const;

export type AgentAccessRegistrationMethod =
  (typeof AGENT_ACCESS_REGISTRATION_METHODS)[number];

export const AGENT_ACCESS_RATE_LIMIT_PER_HOUR = 8;

export const AGENT_ACCESS_MCP_PROTOCOL_VERSION = "2025-03-26";

export const AGENT_ACCESS_PROMPT_MAX_LENGTH = 8000;

export const AGENT_ACCESS_DISPLAY_NAME_MAX_LENGTH = 80;
