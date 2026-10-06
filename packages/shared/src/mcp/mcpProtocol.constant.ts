/** Single MCP protocol version answered by every AgentWitch MCP server. */
export const MCP_PROTOCOL_VERSION = "2025-03-26";

/** `serverInfo` reported on `initialize` by AgentWitch MCP servers. */
export const AGENT_WITCH_MCP_SERVER_INFO = {
  name: "agent-witch",
  version: "1.0.0",
} as const;
