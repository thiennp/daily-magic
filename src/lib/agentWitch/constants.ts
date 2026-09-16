export const AGENT_WITCH_DEFAULT_ORIGIN = "https://www.agentwitch.com";

/** Canonical Mac agent WebSocket for production installs (`~/.agent-witch`). */
export const AGENT_WITCH_PRODUCTION_WS_URL =
  "wss://www.agentwitch.com/api/agent-witch/ws";

export const AGENT_WITCH_SUPPORTED_HOSTS = [
  "agentwitch.com",
  "www.agentwitch.com",
] as const;
